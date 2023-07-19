const express=require("express");
require("dotenv").config();
const port=process.env.PORT;

const app=express();

app.use((req,res, next)=>{
    console.log(`Login at ${new Date().toLocaleString()}`);
    next();
});

app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send("Homepage");
});


app.get("/app",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send("Hello App");
});



/* wild card handler */
app.get("/**",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send("Page Not Found");
});

app.listen(port,()=>{
    console.log(`server running at http://127.0.0.1:${port}`);
})