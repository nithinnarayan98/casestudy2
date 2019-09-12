var mongoose = require('mongoose')
var schema = mongoose.Schema;
var bookschema = new schema(
    {
    image:String,
    title:String,
    genre:String,
    author:String,
    id:String,
    dis:String
    
    }
)
var booksmodel = mongoose.model("book",bookschema,"book");
module.exports = booksmodel;