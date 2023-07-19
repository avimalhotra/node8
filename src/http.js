const http=require("http");
require('dotenv').config();
const ip='127.0.0.1';

/* http.createServer((req,res)=>{
    res.write(`Hello World`);
    res.end();
}).listen(3030);
 */

const data=["sun","mon","tues"];

const server=http.createServer((req,res)=>{
    //res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
  /* 
    res.write(`<h1>`);
    res.write(process.version);
    res.write(`</h1>`); 
    */

    if( req.url=="/" && req.method=="GET"){
        res.writeHead(200,'Content-Type','text/html')
        res.write(`<h1>${process.version}</h1>`);
        res.write(` <a href="/">Home</a> `);
        res.write(` <a href="/api">API</a> `);
        res.write(`<p>${ "2" + 3 }</p>`);
        res.write(`<p>${ data.sort() }</p>`);
        res.write(`<p>${ req.url }</p>`);
        res.write(`<p>${ req.method }</p>`);
        res.write(`<p>${ req.headers.host }</p>`);
        res.end();
    }
    else if( req.url=="/api" && req.method=="GET"){
        return res.end(JSON.stringify([{name:"a",id:1},{name:"b",id:2}]));
    }
    else{
        res.writeHead(404,'Content-Type','text/html')
        res.write(`<h1>Page not found</h1>`);
        res.end();
    }
});

server.listen(process.env.PORT,ip,()=>{
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
});