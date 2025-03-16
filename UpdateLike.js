const Router=require("express").Router()
const BlogModel=require("./BlogPostsSchema")
const userModel=require("./Account/UserSchema")
Router.post('/giveLike',async (req,res)=>{
    try{
      const {uid,bid}=req.body
      const blog=await BlogModel.findById(bid)
      if(!blog)
      return res.status(404).json({message:'Blog not found'})

      const user=await userModel.findById(uid)
      if(!user)
       return res.status(404).json({message:'Please login again'})

      if(blog.likedBy.includes(uid)){
        return res.status(400).json({message:"user already liked"})
      }

      const updatedDoc=await BlogModel.findByIdAndUpdate(bid,{
         $inc: {likes: 1},
         $push: {likedBy:uid}
      },
        { new:true }
    )
    
    if(updatedDoc)
        return res.status(200).json({liked:true,message:"Liked was successfull"})
}
catch(err){
    console.log(err);
    
    return res.status(500).json({message:"Can't like due to server failure"})
}
      
})
module.exports=Router