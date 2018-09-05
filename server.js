require('./server/config/config');

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser")

var port = process.env.PORT;
var {mongoose} = require("./server/db/mongoose");

app.get("/", (req, res) => {
  res.send({express: "Hello"});
})

app.get("/user", (req, res) => {
  res.send({express: "Hello Mohit Welcome here again!!"});
})

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});