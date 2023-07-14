const t=require("./app");

t.once("account",()=>{
    console.log("account opened");
});

module.exports=t;