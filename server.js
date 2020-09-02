const http = require('http');
const fs = require('fs');
const url = require('url');
const port=process.env.PORT||8081;
const cors = require('cors');

// http.createServer(function (request, response) {
//     var pathname = "/html/upload_to_ipfs.html";

//     console.log("Request for " + pathname + " received.");

//     fs.readFile(pathname.substr(1), function (err, data) {
//         if (err) {
//             console.log(err);
//             response.writeHead(404, {'Content-Type': 'text/html'});
//         } else {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(data.toString());
//         }
//         response.end();
//     });
// }).listen(port);

// console.log(`Server running at http://127.0.0.1:${port}`);

const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const route=require('./index');

app.use(cors());
app.use(bodyParser.json());

app.use('/api',route);
app.listen(port,()=>{
    // const pathName="/html/upload_to_ipfs.html";
    // console.log("Request for " + pathName + " received.");

    // fs.readFile(pathName.substr(1), function (err, data) {
    //     if (err) {
    //         console.log(err);
            
    //     } else {
    //         console.log(data.toString());
    //         console.log(response);
    //     }
        
    // });
    
    console.log(`express is running on ${port}`);
})
