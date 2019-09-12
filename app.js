var express=require('express')
const path=require("path")
var app=express();
var bookrouter=require('./routes/bookrouter')

var userrouter = require('./routes/userrouter')




app.use("/user",userrouter);
app.get("/",function(req,res){
 res.render("index",{pagetitle:"Library",nav:[{link:"/user/",title:"login"}]})  
})
 app.use("/books",bookrouter)

app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views","./src/views")


app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000'))