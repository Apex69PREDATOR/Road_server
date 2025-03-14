const Router=require("express").Router()
const UserStructure=require("./UserSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const SECRET='chudirvai'


function create_token(id){
    const token=jwt.sign({id:id},SECRET,{expiresIn:'2d'})
    return token
 }

Router.post('/login',async(req,res)=>{
    try{
    const {uniqueid,password}=req.body
    let user,key=''
    if(uniqueid.includes("@")){
         user=await UserStructure.findOne({email:uniqueid})
         key='mail'
    }
    else{
        user=await UserStructure.findOne({phoneno:uniqueid})
        key='number'
    }

    if(user!==null){

        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
          const token = create_token(user._id.toString())
        res.status(200).json({success:true,token:token,message:"login successfull"})
          
        }
        else{
            res.status(404).json({message:"Invalid password for this account"})
        }
    }
    else
    res.status(404).json({message:`This ${key} dosen't exists`})
    }
    catch(err){
        res.status(500).json({message:"Can't authenticate to your account this time"})
        console.log(err);
    }

})

module.exports=Router