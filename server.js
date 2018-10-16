require('./config/config');

const express    = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
const _          = require("lodash");
const bcrypt     = require("bcryptjs");
const cors       = require("cors");
const flash      = require('express-flash');

const {mongoose}   = require("./db/mongoose");
const indexRoute   = require("./routes/index");
const profileRoute = require("./routes/profile");
const postRoute    = require("./routes/post");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

app.use("/", indexRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});

module.exports = {app};
