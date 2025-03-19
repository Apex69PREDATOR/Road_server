const Router=require("express").Router()
const multer=require("multer")
const UserSchema=require("./Account/UserSchema")
const BlogModel=require("./BlogPostsSchema")
Router.use("/addBlog", async (req, res, next) => {
    const token=req.headers.authorization.split(' ')[1]
    
    if(token){
      const res=await fetch("http://localhost:5000/verify/verifyLogin",{method:"POST",headers:
        {
         'Authorization': `Bearer ${token}`
        }
      })
      if(res.ok){
        
        const r=await res.json()
        req.user_id=r.id
        
      }
      else{
        console.log('faileddd');
        
        return res.status(404).json({message:"not loggedin"})
      }
    } 
    
    // Example way to get ID (adjust as needed)
    next();
  });

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./public/images")
    },
    filename:async function(req,file,cb){
        const uniqueSyntax=Date.now() + '_' + req.user_id + '_'
        cb(null,uniqueSyntax + file.originalname)
        
        
    }
})

const upload=multer({storage:storage})

Router.post('/addBlog',upload.single("img_construction"),async(req,res)=>{
  try{
    const user=await UserSchema.findById(req.user_id)
        
    const blog=await new BlogModel({name:user.fname+user.lname,user_id:req.user_id,type:req.body.type,location:req.body.location,image_path:req.file.filename,description:req.body.description,date:new Date()})
    await blog.save()

    if(blog)
      return res.status(200).json({success:true,message:"Blog Posted!"})
    
    return res.status(404).json({message:"cant post blog with that details"})
}
catch(err){
  return res.status(500).json({message:"server responded with an error"})
}
    
})

module.exports=Router