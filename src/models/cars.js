const mongoose=require('../dao');

const db=mongoose.connection;

const Schema=mongoose.Schema;

const Car=new Schema({
    //_id:mongoose.ObjectId,
    name:{type: String, required: true, unique: true, dropDups: true },
    type:{type: String, required: true },
    price:{type:Number, required:true}
},{collection:"suzuki"});

module.exports=mongoose.model("model",Car);