var express=require('express');
const router=express.Router();
var mongoose = require('mongoose')
const path = require('path')

var multer = require('multer');
var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('image');

  var url = "mongodb+srv://Nithin:nithinnarayan@cluster0-mlapr.mongodb.net/libdb?retryWrites=true&w=majority";
  var books = require("../model/lib"); 
  mongoose.connect(url,function(err){
      if(err) 
      throw err;
      else
      console.log("database connected")
  });
  router.use(express.static(path.join(__dirname,"/public")))



  router.get("/",function(req,res){
   books.find({},function(err,result){
        res.render("books",{pagetitle:"Library",nav:[{link:"/",title:"Home"},{link:"/books/addbook",title:"Add book"},{link:"/books/updatebook/",title:"Update books"}],books:result});
    });
   

})
router.get("/view/:img",function(req,res){    
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})


router.get("/addbook",function(req,res){
    res.render("add",{nav:[{link:"/",title:"Home"},{link:"/books",title:" books"}]});
})

router.post("/addbook",upload,function(req,res){
var p = new books();
p.title = req.body.title;
p.id = req.body.id;
p.genre = req.body.genre;
p.image = req.file.filename;
p.author = req.body.author;
p.dis = req.body.dis;
p.save(function(err){
   if (err) throw err;
   else{
       console.log("Added");
       res.redirect("/");
   }
})
})

router.get("/updatebook",function(req,res){
   books.find({},function(err,result){
        
        res.render("update",{pagetitle:"Library",nav:[{link:"/",title:"Home"},{link:"/books",title:" books"},{link:"/books/addbook",title:"Add book"}],books:result});
    });
})



router.get("/edit/:id",function(req,res){
    books.find({id:req.params.id},function(err,result){
        if (err) throw err;
        res.render("edit",{nav:[{link:"/",title:"Home"},{link:"/books",title:"books"},{link:"/books/addbook",title:"Add book"},{link:"/books/updatebook",title:"Update books"}],books:result});
    })
})
    
router.post("/edit", upload, function(req,res){
    books.updateOne({id:req.body.id} ,{$set:{
        title:req.body.title,
        id : req.body.id,
        genre : req.body.genre,
        author : req.body.author,
        dis : req.body.dis,
        image : req.file.filename
    }}, function(err,result){
        if (err) throw err;
        else{
            books.find({},(err,result)=>{
                if (err) throw err;
                else
                    res.redirect("/books/updatebook")
            })
        }
    }) 
})


router.get("/deletebook/:pid",function(req,res){
    books.deleteOne({id:req.params.pid},function(err,result){
        if (err) throw err;
        else
        {
            books.find({},(err,result)=>{
                if(err) throw err;
                else
                    res.redirect("/books/updatebook")
            })
        }
    })
})




router.get("/single/:id",function(req,res){

    books.find({id:req.params.id},function(err,result){
        res.render("singlebook",{pagetitle:"Library",nav:[{link:"/",title:"Home"},{link:"/books",title:" books"},{link:"/books/updatebook",title:"Update book"}],books:result});  
      })
        
    })
module.exports=router;