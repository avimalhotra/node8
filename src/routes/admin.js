const express=require("express");
let router=express.Router();

router.use((req,res,next)=>{
    console.log(`admin login at ${new Date().toLocaleString()}`);
    next();
});

router.get('/',(req,res)=>{
    res.status(200).send("Admin Page");
});
router.get('/login',(req,res)=>{
    res.status(200).send("Admin Login Page");
});
router.get('/logout',(req,res)=>{
    res.status(200).send("Admin Logout Page");
});

module.exports=router;