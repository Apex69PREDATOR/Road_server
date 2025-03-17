const multer=require("multer")

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"../public/images")
    },
    filename:function(req,file,cb){
        const uniqueSyntax=new Date().toISOString() + '-'
        cb(null,file.originalname + uniqueSyntax)
    }
})

const upload=multer({storage:storage})

