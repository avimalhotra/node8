const t=require("./app");

t.on("login",()=>{
    console.log("login process starts");
});
t.on("login",()=>{
    console.log("login process complete");
});

module.exports=t;