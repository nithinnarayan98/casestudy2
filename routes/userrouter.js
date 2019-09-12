var express = require('express')
var mongoose=require('mongoose')
var users = require("../model/user"); 

var url="mongodb+srv://Nithin:nithinnarayan@cluster0-mlapr.mongodb.net/libdb?retryWrites=true&w=majority";
mongoose.connect(url,function(err){
    if(err) throw err
    else{
        console.log("db connected")
    }
})



const router = express.Router();
const path = require('path')
var bodyparser = require('body-parser')

router.use(bodyparser.urlencoded({extended:true}))
router.use(express.static(path.join(__dirname,"/public")))







module.exports = router;


router.get("/",function(req,res){
    
    res.render("login",{nav:[{link:"/",title:"Home"}]});
})



router.get("/reg",function(req,res){
    
    res.render("reg",{nav:[{link:"/",title:"Home"}]});
})

router.post("/reg",function(req,res){
    
    var u1 = new users();
    u1.username = req.body.unr;
    u1.name = req.body.nr;
    u1.password=req.body.pwr;
    u1.mobile=req.body.mr;
    u1.email=req.body.er;
    u1.role=req.body.role;
    u1.save(function(err){
        if(err) throw err;
        else
        res.redirect('/')
    })
});


router.post("/login",function(req,res){
    users.find({username:req.body.uname,password:req.body.pwd,role:"user"},function(err,result){
        if(err) 
        throw err;
        else if(result.length == 0)
        {
            users.find({username:req.body.uname,password:req.body.pwd,role:"admin"},function(err,result){
                if(err)
                throw err;
               else if(result.length == 0){
            
            res.redirect('/user');
        }
        else
        {
            res.redirect('/books');
        }
    })
        }
        else{
            res.redirect("/books")
        }
    })

   

   

    });









