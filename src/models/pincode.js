const mongoose=require('../dao');

const db=mongoose.connection;

const Schema=mongoose.Schema;

const Pin=new Schema({
    //_id:mongoose.ObjectId,
    officeName:{type: String, required: true, unique: true, dropDups: true },
    pincode:{type: Number, required: true },
    taluk:{type:String, required:true},
    districtName:{type:String, required:true},
    stateName:{type:String, required:true},
},{collection:"pincode"});

module.exports=mongoose.model("pin",Pin);