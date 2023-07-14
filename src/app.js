const path=require("path");

//console.log( path.normalize("./src") );
//console.log( path.normalize("./src//img") );

//console.log( path.basename('app/src/') );
//console.log( path.basename('app/src/demo.txt','.txt') );
//console.log( path.win32.basename("src/app") );

//console.log( path.dirname("src/app/demo/") );
//console.log( path.dirname("src/app/demo.txt") );
//console.log( path.extname("src/app/demo.txt") );

//console.log( path.resolve(__dirname) );
//console.log( path.resolve("src/app") );
//console.log( path.resolve("src","app") );
//console.log( path.join("src","app") );


const event=require("events").EventEmitter;
const emitter=new event();
module.exports=emitter;

// register listener or subscribe
emitter.on("done",(res)=>{
     console.log(` emitted`);
     res.handles=true;
});
emitter.on("done",(res)=>{
     if(res.handles==true){console.log(` emit again with ${res.handles}`);}
});

emitter.once("open",(x)=>{console.log(`open once only`);})


function emitOnce(){
     console.log(`handled`);
     emitter.removeListener("once",emitOnce);
}
emitter.on("once",emitOnce);
//emitter.on("error",(err)=>{ console.log(err); })


// Raise, emit or trigger event
//emitter.emit("done");
//emitter.emit("done",2);
//emitter.emit("done",{id:1});
//emitter.emit("open");
//emitter.emit("open");
//emitter.emit("error");

const login=require("./login");
const account=require("./account");


emitter.emit("login");
emitter.emit("account");