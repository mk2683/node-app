require('./config/config');

var express    = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");
var _          = require("lodash");
var bcrypt     = require("bcryptjs");
var cors       = require("cors");

var {mongoose} = require("./db/mongoose");
var indexRoute  = require("./routes/index");

var app = express();
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", indexRoute);

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});

module.exports = {app};
