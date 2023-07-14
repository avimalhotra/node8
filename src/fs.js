//const math=require("./math");
//import {a} from "./math.js";

const os=require("os");
const fs=require("fs");
const path=require("path");

//console.log(os.cpus().length );
//console.log(os.arch() );
//console.log(os.freemem()/1024/1024/1024, os.totalmem()/1024/1024/1024  );
//console.log( os.networkInterfaces() );
//console.log( os.platform() );
//console.log( os.type() );
//console.log( os.uptime()/60/60 );
//console.log( os.userInfo() );

//let data=fs.readFileSync('src/data.txt',{encoding:'utf-8'});
fs.readFile("src/data.txt",{encoding:"utf-8"},(err,data)=>{
     if( err){  console.log(err) }
     else{ console.log(data); }
});

/* fs.stat("src/data.txt",(err,data)=>{
     if( err){  console.log(err) }
     else{
           //console.log(data.isFile());
           //console.log(data.isDirectory());
           console.log(data.size );
          }
}); */

/* fs.writeFile("src/data.txt","Hola Amigo",(err,res)=>{
     if( err){ console.log(err)}
     else{  console.log(res);}
}); */
/* fs.appendFile("src/data.txt","\nHola Amigo",(err,res)=>{
     if( err){ console.log(err)}
     else{  console.log(res);}
});  */

/* fs.unlink("src/data.txt",(err,res)=>{
     if( err){ console.log(err)}
     else{  console.log("file deleted");}
}); */
/* 
fs.readFile("src/data.txt",{encoding:"utf-8"},(err,data)=>{
     if( err){ console.log(err) }
     else{
          console.log(data );
     }
}); */

// fs.readFile(path.resolve("src/data.json"),{encoding:"utf-8"},(err,data)=>{
//      if( err){ console.log(err) }
//      else{
//           data=JSON.parse(data);
//           console.log( data );
//      }
// });


console.log("App running");