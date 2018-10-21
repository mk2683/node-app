const express = require("express");
const router = express.Router();
const _          = require("lodash");
const multer = require("multer");

const {Profile} = require("../models/profile");
const {Post} = require("../models/post");
const {Comment} = require("../models/comments");
const {authenticate} = require("../middlewares/authenticate");


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, "comment_" + Date.now() + ".png");
    }
});

var upload = multer({
 storage: storage
});


router.post("/post/:id/comments", [authenticate, upload.single('image')], function(req, res){

        // var firstName = req.user.profile.firstName;
        // var lastName = req.user.profile.lastName;
        // var commentBy = firstName + " " + lastName;
        // var {designation} = req.user.profile;
        // var {avatarPath} = req.user.profile;
        //console.log(req.params.id);
        var commentBy = req.user.userName;
        var {designation} = req.user;
        var {avatarPath} = req.user;
        Post.findById(req.params.id, function(err, post){
           if(err){
               //req.flash("error","Something went wrong!");
               console.log(err);
           } else {
              //console.log(post);
              var text = req.body.text;
              var newComment = {text : text};
            Comment.create(newComment, function(error, comment){
               if(error){
                   //req.flash("error","Something went wrong!");
                   console.log(error);
                   res.status(400).send("Something went wrong!");
               } else {
                   comment.user.id = req.user._id;
                   comment.user.name = commentBy;
                   comment.user.designation = designation;
                   comment.user.avatarPath = avatarPath;
                   comment.save();
                   post.comments.push(comment);
                   post.save();
                   //req.flash("success","Successfully added comment!");
                   res.status(200).send("success");
               }
            });
           }
      });
});

module.exports = router;