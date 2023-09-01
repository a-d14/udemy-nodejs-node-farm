const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replace-template');

/* FILES */

// Blocking synchronous way
// console.log('Reading file...');
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `This is what I know about avocados: ${textIn}.\nCreated on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking asynchronous way

// const readFile = function(filePath) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, 'utf-8', (err, data1) => {
//             if(err) reject(err);
//             resolve(data1);
//         });
//     });
// };

// const writeFile = function(filePath, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, data, 'utf-8', (err) => {
//             if(err) reject(err);
//             resolve('Writing to file successful!');
//         })
//     });
// };

// (async function() {
//     try {
//         // read start.txt
//         const text1 = await readFile('./txt/start.txt');
//         console.log(text1);

//         // read the file with the name inside start.txt
//         const text2 = await readFile(`./txt/${text1}.txt`);
//         console.log(text2);

//         // read data from append.txt
//         const text3 = await readFile(`./txt/append.txt`);
//         console.log(text3);

           // combine the two texts and write into final.txt
//         const success = await writeFile('./txt/final.txt', `${text2}\n${text3}`);
//         console.log(success);

//     } catch(err) {
//         console.log(err);
//     }
// })();

/* SERVER */

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);

// const replaceTemplate = function(temp, product) {
//     let output = temp.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

//     return output;
    
// }

const server = http.createServer((req, res) => {
    // const pathName = req.url;

    const {pathname, query} = url.parse(req.url, true);

    // Overview page
    if(pathname === '/' || pathname === '/overview') {

        let output = dataObj.map(el => replaceTemplate(tempCard, el));
        output = tempOverview.replace('{%PRODUCT_CARDS%}', output);
        
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(output);

    // Product page
    } else if(pathname === '/product') {
        console.log(query.id);
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(output);
    // API
    } else if(pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'custom-header': 'hello-world'
        });
        res.end('<h1>Page not found</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening on port 8000');
})