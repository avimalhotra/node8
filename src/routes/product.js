const express=require("express");
let router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).send("Product Page");
});
router.get("/:brand/",(req,res)=>{
    res.status(200).send(req.params);
});
router.get("/:brand/:product",(req,res)=>{
    res.status(200).send(req.params);
});

module.exports=router;