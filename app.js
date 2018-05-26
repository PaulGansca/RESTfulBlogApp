var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose schema config:title, image, body, date created
var blogSchema = new mongoose.Schema ({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

app.get("/", function(req, res) {
    res.redirect("/blogs");
})
//INDEX route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});
//CREATE route
app.post("/blogs", function(req, res) {
   //create blog
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       } else {
            //then, redirect to index
           res.redirect("/blogs")
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog is running");
});
