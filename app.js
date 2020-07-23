//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Tree hole is a place where you are free to share your secret anonymously. Registration is not required. You just compose it and cast it into the hole. It's that simple.";
const aboutContent = "Discover outrageous confessions. Share yourself anonymously. No personal information required. Share secrets, post secrets online, post anonymously.";
const contactContent = "- .... . .... --- ..- ... . .-- .... .. - . .--.-. --. -- .- .. .-.. .-.-.- -.-. --- --";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];


app.get('/', (req,res)=>{
  res.render("home", {homeStartingContent:homeStartingContent, posts:posts.reverse()});
});


app.get('/about', (req,res)=>{
    res.render("about", {aboutContent:aboutContent});
});


app.get('/contact', (req,res)=>{
    res.render("contact", {contactContent:contactContent});
});

app.get('/compose', (req,res)=>{
    res.render("compose");
});

app.post('/compose', (req,res)=>{
    const post = {postTitle: req.body.postTitle, postText: req.body.postText};
    posts.push(post);
    res.redirect('/');
});

app.get('/post/:postName', (req,res) => {
    let postExisted = false;
    for (let i = 0; i < posts.length;i++){
        if (_.lowerCase(req.params.postName) === _.lowerCase(posts[i].postTitle)){
            postExisted = true;
            res.render("post", {postTitle: posts[i].postTitle, postText: posts[i].postText})
        }
    }
    if (!postExisted){
        res.redirect('/');
    }
});


app.listen(process.env.PORT ||3000, function() {
  console.log("Server started on port 3000");
});
