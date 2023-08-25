const express=require("express");
require("dotenv").config();
const port=process.env.PORT;
const bp=require('body-parser');
const cp=require("cookie-parser");
const session=require('express-session');
const app=express();
const path=require('path');
const parseurl=require("parseurl");

const nunjucks=require("nunjucks");

const cars=require("./models/cars");
const user=require("./models/user");

const multer=require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) 
    }
  })
const upload=multer({storage:storage});



/* routes */
const admin=require('./routes/admin');
const product=require('./routes/product');
const { default: mongoose } = require("mongoose");


/* body parse */
app.use(bp.text());
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

/* cookie parse */
app.set('trust proxy',1);
app.use(cp());

/* express session */

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
  });


/* express static path */
app.use(express.static('src/public'));
app.use(express.static('node_modules/bootstrap/dist'));


// configure
nunjucks.configure(path.resolve('src/public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 


const days=["sun","mon","tues","wed","thurs","fri","sat"]; 

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
    //res.status(200).send(`Session Id: ${req.sessionID}, Session Views: ${req.session.views['/']}`);

    res.status(200).render('index.html',{ title:"Nunjucks", data:{name:"aaa", id:22} ,days: days}); });

app.get("/about",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    cars.find({},{_id:0,__v:0}).then(i=>{
        res.status(200).render('about.html',{ title:"About Us" , data:i });
    });
    
});
app.get("/contact",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('contact.html',{ title:"Contact Us" });
})


/* app.post("/upload",upload.single("pic"),(req,res)=>{
    console.log(req.file);
    //console.log(req.body.pic);
    res.status(200).send(req.file);
}); */
/* app.post("/upload",upload.array("pic",4),(req,res)=>{
    res.status(200).send(req.files);
}); */

const cpUpload=upload.fields([
    { name: 'pic', maxCount: 1 },
    { name: 'gallery', maxCount: 4 }
]);

app.post("/upload",cpUpload,(req,res)=>{
    //console.log(req.body.username);
    res.status(200).send("files uploaded");
});


app.get("/api",(req,res)=>{
    //enable CORS 
    res.header("Access-Control-Allow-Origin","*");
    cars.find({},{_id:0,__v:0}).then(i=>{
        return res.status(200).json(i);
    });
});

app.post('/search',(req,res)=>{
    let day=req.body;              // receive data through ajax
    res.header('Access-Control-Allow-Origin',"*");

    day=(JSON.parse(req.body).query);

    let resp=days.filter(i=>i==day);

    return res.status(200).send(resp);

});

app.get("/savecar",(req,res)=>{
    let name=req.query.name, type=req.query.type, price=req.query.price;

    const car =new cars({
        _id:new mongoose.Types.ObjectId(),
        name:name,
        type:type,
        price:price
    });

    car.save().then(i=>res.status(200).send("data saved")).catch(i=>res.status(200).send("data not saved"));

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
    const car=req.query.car;

    cars.find({name:car},{_id:0,__v:0}).then(i=>{
        
        if( i.length==0){
            res.status(200).send("no car found");
        }
        else{
            res.status(200).send(i);
        }
         
    });
    
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