const Router=require("express").Router()
const UserStructure=require("./UserSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const SECRET='chudirvai'

function create_token(id){
   const token=jwt.sign({id:id},SECRET,{expiresIn:'2d'})
   return token
}

Router.post('/signup',async(req,res)=>{
      try{
           if(req.body.password!==req.body.confirm_password){
            res.status(404).json({message:"password's didn't match"})
            return;
           }

           const user_data=req.body
           const hashed_password=await bcrypt.hash(user_data.password,10)
           delete user_data.confirm_password
           user_data.password=hashed_password
           const user=await new UserStructure(user_data)
           await user.save()
           const token=create_token(user._id.toString())
        res.status(200).json({success:true,token:token,message:"account creattion successfull"})
      }
      catch(err){
        res.status(500).json({message:"Cant create your account this time"})
        console.log(err);
      }
})

module.exports=Router