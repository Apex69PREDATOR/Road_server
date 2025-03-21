const mongoose=require("mongoose")

const BlogStructure=mongoose.Schema({
    name:String,
    user_id:String,
    type:String,
    location:String,
    image_path:String,
    description:String,
    date:Date,
    pin:Number,
    likes:{type: Number, default: 0},
    likedBy:{type:Array,default:[]}
},{timestamps:true})

const model=mongoose.model('BlogData',BlogStructure)

module.exports=model