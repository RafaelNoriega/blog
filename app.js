let express = require("express"),
	app 	= express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

//Ubuntu start mongo client
//$ sudo sevice mongodb start
//$ mongo
mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let blogSchema = new mongoose.Schema({
	title: String,
	image: {type:String, default:"https://images.unsplash.com/photo-1534941946572-23438b26af30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a39cbef202ec33200977e0d25e9f5e8&auto=format&fit=crop&w=1050&q=80"} ,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Test",
// 	body: "Skeeeeeeeeeeeeeee"
// });

app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR");
		} else{
			res.render("index", {blogs:blogs});
		}
	});
});

app.post("/blogs", function(req, res){
	let data = req.body.blog;
	console.log(data);
	
	Blog.create(data, function(err, newBlog){
			if(err){
				console.log("ERROR");
			} else{
				res.redirect("/blogs");
			}
		
	});
});

app.get("/blogs/new", function(req, res){
	res.render("new");
});

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog:foundBlog})
		}
	});
});

app.listen(3000, function(){
	console.log("server running");
});