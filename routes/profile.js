const express = require("express");
const router = express.Router();
const _          = require("lodash");
const multer = require("multer");

const {Profile}     = require("../models/profile");
const {User}     = require("../models/user");
const {Follower}     = require("../models/followers");
const {Following}     = require("../models/following");
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
    //console.log(req.user);
    Profile.find({
        user : req.user._id
    }).then((data) => {
        //console.log(data);
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

    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            user.userName = firstName + " " + lastName;
            user.designation = designation;
            user.avatarPath = avatarPath;
            user.save();
            var newProfile = {firstName: firstName, lastName: lastName, designation: designation, hospitalName: hospitalName, city: city, country: country, avatarPath:avatarPath, avatarName: avatarName, user:user};
            Profile.create(newProfile, function(err, newlyCreated){
                if(err){
                    console.log(err);
                    //req.flash("error","Something went wrong!");
                    res.status(400).send("Something went wrong!");
                } else {
                    //req.flash("success","Profile successfully added");
                    // user.profile = newlyCreated;
                    // user.save();
                    res.status(200).send("success");
                }
            });
        }
    })
});


router.post("/follow/:userid", authenticate, function(req, res){
    var userId = req.params.userid;
    var {followerUserName} = req.user;
    var {followerDesignation} = req.user;
    var {followerAvatarPath} = req.user;
    var followingUserName;
    var followingDesignation;
    var followingAvatarPath;
    Profile.find({user: req.params.userid}, function(err, profile){
        console.log(profile[0]);
        if(err){
           //req.flash("error","Something went wrong!");
           console.log(err);
        } else {
            followingUserName = profile[0].firstName + " " + profile[0].lastName;
            followingDesignation = profile[0].designation;
            followingAvatarPath = profile[0].avatarPath;
            Follower.create(req.body, function(error, newfollower){
                if(error){
                    //req.flash("error","Something went wrong!");
                    console.log(error);
                    res.status(400).send("Something went wrong!");
                } else {
                    newfollower.user.id = req.user._id;
                    newfollower.user.name = followerUserName;
                    newfollower.user.designation = followerDesignation;
                    newfollower.user.avatarPath = followerAvatarPath;
                    newfollower.save();
                    profile[0].followers = newfollower;
                    console.log(profile[0]);
                    profile.save();
                    //req.flash("success","Successfully added follower!");
                    res.status(200).send("success");
                }
            });
        }
    });

    Profile.findById(req.user._id, function(err, profile1){
        if(err){
           //req.flash("error","Something went wrong!");
           console.log(err);
        } else {
            Following.create(req.body, function(error, newfollowing){
                if(error){
                    //req.flash("error","Something went wrong!");
                    console.log(error);
                    res.status(400).send("Something went wrong!");
                } else {
                    newfollowing.user.id = req.params.userid;
                    newfollowing.user.name = followingUserName;
                    newfollowing.user.designation = followingDesignation;
                    newfollowing.user.avatarPath = followingAvatarPath;
                    newfollowing.save();
                    profile1[0].following = newfollowing;
                    profile1.save();
                    //req.flash("success","Successfully added following!");
                    res.status(200).send("success");
                }
            });
        }
    });
});

module.exports = router;