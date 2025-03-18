const Router=require("express").Router()
const jwt=require("jsonwebtoken")
const userData=require("./UserSchema")
const SECRET=process.env.JWT_SECRET
Router.post('/verifyLogin',(req,res)=>{
    
    const [bearer,token] = req.headers.authorization.split(' ')
    jwt.verify(token,SECRET,async (error,decoded)=>{
        if(error){
            res.status(404).json({message:"session might have expired"})
        }
        else if(decoded){
            const user=await userData.findById(decoded.id)
            res.status(200).json({name:user.fname + ' ' + user.lname,id:decoded.id})
        }
    })
    
})


module.exports=Router