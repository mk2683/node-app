require('./config/config');

var express    = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");
var _          = require("lodash");
var bcrypt     = require("bcryptjs");
var cors       = require("cors");
var flash      = require('express-flash');

var {mongoose} = require("./db/mongoose");
var indexRoute  = require("./routes/index");
var profileRoute = require("./routes/profile")

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());


// app.use(function(req, res, next){
// 	res.locals.currentUser = req.user;
// 	next();
// })

//app.use("/profile", profileRoute);
app.use("/", indexRoute);

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});

module.exports = {app};
