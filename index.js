const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const BlogModel=require("./BlogPostsSchema")
const PORT=5000
require("dotenv").config()

const db_password=encodeURIComponent(process.env.MONGODB_ATLAS_PASSWORD)
const database='ConstructionBlog'
const uri = `mongodb+srv://arpana036:${db_password}@apex.2k0me.mongodb.net/${database}?retryWrites=true&w=majority&appName=${process.env.MONGODB_ATLAS_CLUSTER}`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err) {
    
      console.log('error',err);    
  }
}
run();


app.use(express.json())
app.use(cors({
  origin:`${process.env.HTTP_ORIGIN_C}`,
  methods:["GET","POST","DELETE","PUT"]
}
))
app.use(express.urlencoded({extended:true}))
app.use('/images',(req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  next();
},express.static('public/images'))

function find_time(time_ms){
   
   let year=(time_ms)/(1000*60*60*24*30*12)
   let year_f=Math.floor(year)
   let month=(year-year_f)*12
   let month_f=Math.floor(month)
   let day=(month-month_f)*30
   let day_f=Math.floor(day)
   let hour=(day-day_f)*24
   let hour_f=Math.floor(hour)
   let min=(hour-hour_f)*60
   let min_f=Math.floor(min)
   
   
 return {year:year_f,month:month_f,day:day_f,hour:hour_f,min:min_f}
 

}
app.get('/',(req,res)=>{
  res.send("<h1>You are not allowed here</h1>")
})
app.post('/get-blogs',async(req,res)=>{
  try{
    const type=req.headers.blogtype
    
    
    const blog= type==='null'? await BlogModel.find({}).sort({date: -1}): await BlogModel.find({type:type}).sort({date: -1})
    const blogImages=blog.map(val=>({
      ...val._doc,
      image_url:`${process.env.HTTP_ORIGIN_S}/images/${val.image_path}`,
      timePassed: find_time(Date.now() - new Date(val.date).getTime())
    }))
    
    res.status(200).json({allBlogs:blogImages,message:'List of all constructions'})
    
  }
  catch(err){
      res.status(500).json({message:"can't get blogs due to server error"})
  }
})

app.use('/account',require("./Account/signup"))
app.use('/verify',require("./Account/verify"))
app.use('/authenticate',require("./Account/login"))
app.use('/like',require("./UpdateLike"))
app.use('/post',require("./BlogPost"))
app.use('/comment',require("./UpdateComment"))



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})


