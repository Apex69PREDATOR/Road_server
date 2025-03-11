const mongoose=require("mongoose")

const BlogStructure=mongoose.Schema({
    name:String,
    type:String,
    location:String,
    image:String,
    decription:String,
    date:Date
})

const model=mongoose.model('BlogData',BlogStructure)

module.exports=model