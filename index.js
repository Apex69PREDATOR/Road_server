const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const BlogModel=require("./BlogPostsSchema")
const PORT=5000

const db_password=encodeURIComponent("wdDAhKq4LM55Exis")
const database='ConstructionBlog'
const uri = `mongodb+srv://arpana036:${db_password}@apex.2k0me.mongodb.net/${database}?retryWrites=true&w=majority&appName=apex`;

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
app.use(cors())
app.use('/images',express.static('public/images'))
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
app.get('/get-blogs',async(req,res)=>{
  try{
    const blog=await BlogModel.find({}).sort({date: -1})
    const blogImages=blog.map(val=>({
      ...val._doc,
      image_url:`http://localhost:5000/images/${val.image_path}`,
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



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

async function put_blog() {
  const data=await new BlogModel({name:"rimpa",type:'hotel',location:'universe milkey way hjbh iuikhuk',image_path:'i3.jpg',description:'jvhgvv huvyug ufyuf utyfuiyf uiytyfty iuguy oguiy jkhkkk kuklkn',date:new Date(),likes:0})
  await data.save()
  console.log(data);
  
}
// put_blog()
