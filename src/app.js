const express=require("express");
require("dotenv").config();
const port=process.env.PORT;

const app=express();
//app.use(express.static('src/public'));
//app.use(express.static('node_modules/bootstrap/dist'));

/* app.use((req,res, next)=>{
    console.log(`Login at ${new Date().toLocaleString()}`);
    next();
}); */

/* app.use('/user',(req,res, next)=>{
    console.log(`User Login at ${new Date().toLocaleString()}`);
    next();
}); */


app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html');
   res.status(200).send("<h1>Home Page</h1>");
    //res.status(200).send(req.url);
    //res.status(200).send(req.query);
    //res.status(200).json({"key":req.query});
});

app.get("/product/",(req,res)=>{
    res.status(200).send("Product page");
});
app.get("/product/:brand/",(req,res)=>{
    res.status(200).send(req.params);
});
app.get("/product/:brand/:product",(req,res)=>{
    res.status(200).send(req.params);
});

app.post("/submit",(req,res)=>{
    console.log("data submitted");
    res.status(200).send("submitted");
});




/* wild card handler */
app.get("/**",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send("Page Not Found");
});

app.listen(port,()=>{
    console.log(`server running at http://127.0.0.1:${port}`);
});