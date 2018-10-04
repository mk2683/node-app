require('./config/config');
//require('./middlewares/auth/auth');

var express    = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");
var _          = require("lodash");
var bcrypt     = require("bcryptjs");
var cors       = require("cors");
//var methodOverride = require("method-override");

var {mongoose} = require("./db/mongoose");
var indexRoute  = require("./routes/index");
var profileRoute = require("./routes/profile");

var app = express();
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
//app.use(methodOverride("_method"));

app.use("/", indexRoute);
app.use("/", profileRoute);

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});

module.exports = {app};
