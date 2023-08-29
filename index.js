const fs = require('fs');
const http = require('http');

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


