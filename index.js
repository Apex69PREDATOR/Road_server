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

app.get('/get-blogs',async(req,res)=>{
  try{
    const blog=await BlogModel.find({})
    console.log(blog.length);
    res.status(200).json({allBlogs:blog,message:'List of all constructions'})
  }
  catch(err){
      res.status(404).json({message:"can't get blogs due to server error"})
  }
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
