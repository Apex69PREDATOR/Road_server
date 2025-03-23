const Router=require("express").Router()
const BlogModel=require("./BlogPostsSchema")
const userModel=require("./Account/UserSchema")

Router.post('/giveComment',async(req,res)=>{
    try{
    const {uid,bid,uname,comment}=req.body
    const Comment={uid:uid,name:uname,comment:comment}
    console.log(uid);
    const upddatedDoc=await BlogModel.findByIdAndUpdate(bid,{
        $push:{CommentedBy:Comment},
    },{new:true})

    if(upddatedDoc){
      return res.status(200).json({success:true,message:"commented successfully"})
    }
    
    return res.status(404).json({message:"try again letter"})
}
catch(err){
    return res.status(500).json({err:err,message:"server is facing some issue try again letter"})
}    
})

module.exports=Router