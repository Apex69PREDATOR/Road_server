const mongoose=require("mongoose")

const UserStructure=mongoose.Schema({
    fname:String,
    lname:String,
    phoneno:String,
    email:String,
    password:String,
    address:String,
},{timestamps:true})

const model=mongoose.model('userData',UserStructure)

module.exports=model