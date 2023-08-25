            /*dao.js*/
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/node', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

module.exports=mongoose;



/*  const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.Schema.ObjectId,
    name:{type: String, required: true, unique: true, dropDups: true },
    type:{type: String, required: true },
    price:{type:Number, required:true}
},{collection:"suzuki"}); */

/* const cars=mongoose.model("cars",Car);

let car=new cars({ _id: new mongoose.Types.ObjectId(),  name:"alto", type:"hatchback", price:400000}); */
 
 
// db.on('error',  (err)=> { throw err }); 

 /* 
 db.once('open',  (err,data)=> {
    console.log('connected!');

    //cars.find({name:"baleno"}).then((data,err)=>{
       // if(err){
          //  console.log(err);
       // }
       // else{
        //    console.log(data);
        //}
   // });


   //car.save().then(()=>{
     //       console.log("data saved"); db.close()
    //}).catch(err=>console.log(err)); 

});
    
 */