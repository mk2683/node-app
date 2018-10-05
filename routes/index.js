var express = require("express");
var router = express.Router();
var _          = require("lodash");

var {User}     = require("../models/user");
var {authenticate} = require("../middlewares/authenticate");

router.get("/", (req, res) => {
  res.send("Mediedge");
})


router.post("/signup", (req, res) => {
  console.log(req.body.email);
  var body = _.pick(req.body, ["email", "password"]);

  var newUser = new User(body);

  newUser.save().then(() => {
    return newUser.generateAuthToken();
  }).then((tok) => {
    //res.header("x-auth", token).send("success");
    res.status(200).send({token : tok});
  }).catch((e) => {
    console.log(e);
    res.status(400).send(e);
  })
});


router.post('/signin', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((tok) => {
      //res.header('x-auth', token).send("success");
      res.status(200).send({token : tok});
    });
  }).catch((e) => {
    console.log(e);
    res.status(401).send("One of the credentials is wrong!!");
  });
});


router.get("/me", authenticate, (req, res) => {
  res.send(req.user);
})


router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send("Succefully logged out");
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;