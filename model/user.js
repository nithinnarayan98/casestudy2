var mongoose = require('mongoose')
var schema = mongoose.Schema;
var userschema = new schema(
    {
    username:String,
    password:String,
    name:String,
    mobile:Number,
    email:String,
    role:String
    }
)
var usersmodel = mongoose.model("User",userschema,"User");
module.exports = usersmodel;