require('./server/config/config');

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

var port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello");
})

app.get("/user", (req, res) => {
  res.send("Hello Mohit Welcome here");
})

app.listen(port, () => {
	console.log(`Server has Started at port ${port}`);
});