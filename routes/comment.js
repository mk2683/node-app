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

    Profile.find({user : req.user._id }).then((data) => {
        var {firstName} = data[0];
        var {lastName}  = data[0];
        var commentBy = firstName + " " + lastName;
        var {designation} = data[0];
        var {avatarPath} = data[0];
        //console.log(req.params.id);
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
                   comment.save();
                   post.comments.push(comment);
                   post.save();
                   //req.flash("success","Successfully added comment!");
                   res.status(200).send("success");
               }
            });
           }
      });
    },(err) => {
        console.log(err);
    })
});

module.exports = router;