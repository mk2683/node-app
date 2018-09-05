require('./server/config/config');

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    cors	    = require("cors")

var port = process.env.PORT;
var {mongoose} = require("./server/db/mongoose");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Helo Mohit");
})

app.get("/user", (req, res) => {
  res.send({express: "Hello Mohit Welcome here again and again Hope this Works. finally it worked !!"});
})

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});