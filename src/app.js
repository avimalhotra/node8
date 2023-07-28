const express=require("express");
require("dotenv").config();
const port=process.env.PORT;
const bp=require('body-parser');
const cp=require("cookie-parser");
const session=require('express-session');
const app=express();
const parseurl=require("parseurl");



/* routes */
const admin=require('./routes/admin');
const product=require('./routes/product');


/* body parse */
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

/* cookie parse */
app.set('trust proxy',1);
app.use(cp());
//app.use(cp("secret"));                    // secure cookie

/* expression session */

app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,maxAge:60000}
}));

app.use( (req, res, next)=> {
    if (!req.session.views) {
      req.session.views = {}
    }
  
    // get the url pathname
    const pathname = parseurl(req).pathname
  
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
    next()
  })


/* express static path */
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
    //res.cookie("pin","201301");
    //res.cookie("pin","201301",{signed:true});
    res.setHeader('Content-Type','text/html');
    //res.status(200).send("<h1>Home Page</h1>");
    //res.status(200).send(req.url);
    //res.status(200).send(req.query);
    //res.status(200).json({"key":req.query});
    
    //res.status(200).send(req.signedCookies);
    /* if( Object.keys(req.cookies).length==0 ){
        res.status(200).send("No Cookie Found");
    }
    else{
        res.status(200).send(req.cookies);
    } */

    //res.status(200).send(req.sessionID);
    res.status(200).send(`Session Id: ${req.sessionID}, Session Views: ${req.session.views['/']}`);
});

app.get("/signout",(req,res)=>{
    res.status(200).send(req.session.destroy());
});

app.get("/addcookie",(req,res)=>{
    res.cookie("id","200",{maxAge:300000});
    res.status(200).send("cookie saved");
});
app.get("/readcookie",(req,res)=>{
    res.status(200).send(req.cookies);
});


app.get("/search",(req,res)=>{
    const q=req.query;
    res.status(200).send(q);
});

app.post("/send",(req,res)=>{
    const name=req.body.username;
    const pass=req.body.userpass;

    console.log( name, pass );

    if( name=="admin" && pass==123456 ){
        res.status(200).send(`username is ${name}`);
        //res.status(200).redirect("about.html")
    }
    else{
        res.status(200).send(`invalid username`);
    }
    
});


/* router */
app.use("/admin",admin);
app.use("/product",product);


/* wild card handler */
app.get("/**",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send("Page Not Found");
});

app.listen(port,()=>{
    console.log(`server running at http://127.0.0.1:${port}`);
});