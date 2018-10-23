const express = require("express");
const router = express.Router();
const _          = require("lodash");
const multer = require("multer");

const {Profile} = require("../models/profile");
const {Post} = require("../models/post");
const {Like} = require("../models/likes");
const {authenticate} = require("../middlewares/authenticate");


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, "like_" + Date.now() + ".png");
    }
});

var upload = multer({
 storage: storage
});


router.post("/post/:id/likes", authenticate, function(req, res){

        // var firstName = req.user.profile.firstName;
        // var lastName = req.user.profile.lastName;
        // var likeBy = firstName + " " + lastName;
        // var {designation} = req.user.profile;
        // var {avatarPath} = req.user.profile;
        //console.log(req.params.id);
        var likeBy = req.user.userName;
        var {designation} = req.user;
        var {avatarPath} = req.user;
        Post.findById(req.params.id, function(err, post){
           if(err){
               //req.flash("error","Something went wrong!");
               console.log(err);
           } else {
            Like.create(req.body, function(error, like){
               if(error){
                   //req.flash("error","Something went wrong!");
                   console.log(error);
                   res.status(400).send("Something went wrong!");
               } else {
                   like.user.id = req.user._id;
                   like.user.name = likeBy;
                   like.user.designation = designation;
                   like.user.avatarPath = avatarPath;
                   like.save();
                   post.likes.push(like);
                   post.save();
                   //req.flash("success","Successfully added like!");
                   res.status(200).send("success");
               }
            });
           }
      });
});

module.exports = router;