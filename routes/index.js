var express = require("express");
var router = express.Router();
var _          = require("lodash");
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

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



router.post('/forgotpassword', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          console.log('No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 1800000; // 30 min

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'hobbyaccount89',
          pass: '123456789hello'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'mediedge@gmail.com',
        subject: 'Mediedge Password Reset',
        text: 'You are receiving this because someone (hopefully you) has requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetpassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };


      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
        res.send(err);
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
});

router.get('/resetpassword/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      console.log('Password reset token is invalid or has expired.');
      return res.redirect('/forgotpassword');
    }
    // res.render('reset', {
    //   user: req.user
    // });
    var url = `https://mediedge1.herokuapp.com/resetpassword/${req.params.token}`;
    res.redirect(url);
  });
});

router.post('/resetpassword/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          console.log('Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        console.log(user.password);
        user.save(function(err) {
            done(err, user);
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'hackintoreality',
          pass: 'potatohacker83'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'mediedge@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('Success! Your password has been changed.');
        done(err);
      });
      console.log("success");
      res.status(200).send("success");
    }
  ], function(err) {
    res.redirect('/');
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