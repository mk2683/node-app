const express = require("express");
const router = express.Router();
const _          = require("lodash");
const multer = require("multer");

const {Profile}     = require("../models/profile");
const {authenticate} = require("../middlewares/authenticate");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + ".png");
    }
});

var upload = multer({
 storage: storage
});


router.get("/", authenticate, (req, res) => {
      console.log(req.user);

  Profile.find({
    user : req.user._id

  }).then((data) => {
    console.log(data);
    res.send({data});
  },(err) => {
    res.status(400).send(err);
  })
});


router.post("/", [authenticate, upload.single('avatar')], function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var designation = req.body.designation;
    var hospitalName = req.body.hospitalName;
    var city = req.body.city;
    var country = req.body.country;
    var user = req.user._id;
    // var avatarPath = req.file.path;
    // var avatarName = req.file.filename;

    var avatarPath = "uploads/1539691455295.png";
    var avatarName = "1539691455295.png";


    var newProfile = {firstName: firstName, lastName: lastName, designation: designation, hospitalName: hospitalName, city: city, country: country, avatarPath:avatarPath, avatarName: avatarName, user:user};

    Profile.create(newProfile, function(err, newlyCreated){
        if(err){
            console.log(err);
            //req.flash("error","Something went wrong!");
            res.status(400).send("Something went wrong!");
        } else {
            //req.flash("success","Profile successfully added");
            res.status(200).send("success");
        }
    });
});

module.exports = router;