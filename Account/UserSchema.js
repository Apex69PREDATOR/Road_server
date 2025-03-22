const mongoose=require("mongoose")

const UserStructure=mongoose.Schema({
    fname:String,
    lname:String,
    phoneno:{type:String,unique:true},
    email:{type:String,unique:true},
    password:String,
    address:String,
},{timestamps:true})

const model=mongoose.model('userData',UserStructure)

module.exports=model