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

app.get('/get-blogs',async(req,res)=>{
  try{
    const blog=await BlogModel.find({}).sort({date: -1})
    const blogImages=blog.map(val=>({
      ...val._doc,
      image_url:`http://localhost:5000/images/${val.image_path}`
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



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

async function put_blog() {
  const data=await new BlogModel({name:"lingangguulli",type:'industry',location:'universe milkey way kelpler 22b',image_path:'i4.jpg',description:'hjervbrhcj krbd ihwr',date:new Date(),likes:0})
  await data.save()
  console.log(data);
  
}
// put_blog()
