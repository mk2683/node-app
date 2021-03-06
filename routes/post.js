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
        cb(null, "post_" + Date.now() + ".png");
    }
});

var upload = multer({
 storage: storage
});


router.get("/", authenticate, (req, res) => {
    //console.log(req.user);
    Post.find({
      postById : req.user._id
    }).populate("comments").populate("likes").exec(function(err, posts){
        if(err){
            console.log(err);
            //req.flash("error","Something went wrong!");
            res.status(400).send(err);
        } else {
            for (var i = 0; i < posts.length; i++) {
                posts[i].likesCount = posts[i].likes.length;
                posts[i].commentsCount = posts[i].comments.length;
            }
            res.status(200).send(posts);
        }
    });
});

router.get("/:id", authenticate, function(req, res){
    Post.findById(req.params.id).populate("comments").populate("likes").exec(function(err, post){
        if(err){
            console.log(err);
            //req.flash("error","Something went wrong!");
            res.status(400).send(err);
        } else {
            post.likesCount = post.likes.length;
            post.commentsCount = post.comments.length;
            res.status(200).send(post);
        }
    });
});


router.post("/", [authenticate, upload.single('image')], function(req, res){

        // Profile.find({user : req.user._id }).then((data) => {
        //     var {firstName} = data[0];
        //     var {lastName}  = data[0];
        //     var postBy = firstName + " " + lastName;
        //     var {designation} = data[0];
        //     var {avatarPath} = data[0];
        // console.log("Profile::-"+req.user.profile);
        // var firstName = req.user.profile.firstName;
        // var lastName = req.user.profile.lastName;
        var postBy = req.user.userName;
        var {designation} = req.user;
        var {avatarPath} = req.user;
        var postText = req.body.postText;

        var imagePath = null;
        var imageName = null;
        var videoPath = null;
        var videoName = null;

        // var imagePath = req.file.path;
        // var imageName = req.file.filename;
        // var videoPath = req.file.path;
        // var videoName = req.file.filename;
        var privacy = req.body.privacy;
        var postById = req.user._id;


        var newPost = {postText: postText, imagePath: imagePath, imageName: imageName, videoPath: videoPath, videoName: videoName, privacy: privacy, postBy:postBy, postById: postById, userDesignation: designation, userAvatarPath: avatarPath};

        Post.create(newPost, function(err, newlyCreated){
            if(err){
                console.log(err);
                //req.flash("error","Something went wrong!");
                res.status(400).send("Something went wrong!");
            } else {
                //req.flash("success","Profile successfully added");
                res.status(200).send("success");
            }
        });
    // },(err) => {
    //     console.log(err);
    // })
});

module.exports = router;