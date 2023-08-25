const mongoose=require('../dao');

const db=mongoose.connection;

const Schema=mongoose.Schema;

const User=new Schema({
    _id:mongoose.ObjectId,
    username:{type: String, required: true, unique: true, dropDups: true },
    password:{type: String, required: true },
},{collection:"user"});

module.exports=mongoose.model("user",User);