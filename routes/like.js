const express = require("express");
const router = express.Router();
const _          = require("lodash");
const multer = require("multer");

const {Profile} = require("../models/profile");
const {Like} = require("../models/likes");
const {Post} = require("../models/post");
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
    }).then((data) => {
      //console.log(data);
      res.send({data});
    },(err) => {
      res.status(400).send(err);
    })
});


router.post("/:postid/like", [authenticate, upload.single('image')], function(req, res){
    Profile.find({user : req.user._id }).then((data) => {
        var {firstName} = data[0];
        var {lastName}  = data[0];
        var likeBy = firstName + " " + lastName;
        console.log(req.body);
        console.log(req.body.likesCount);
        var likesCount = Number(req.body.likesCount) + 1;
        var {avatarPath} = data[0];
        var postId = req.params.postid;

        Post.find({_id : postId}).then((record) => {
            record.likes.count = likesCount;
            record.likes.users = likeBy;
            record.save();
        }, (e) => {
            console.log(e);
        })

        var newLike = {postId: postId, likeBy: likeBy, likesCount: likesCount, avatarPath: avatarPath};
        Like.create(newLike, function(err, newlyCreated){
            if(err){
                console.log(err);
                //req.flash("error","Something went wrong!");
                res.status(400).send("Something went wrong!");
            } else {
                //req.flash("success","Profile successfully added");
                res.status(200).send("success");
            }
        });
    },(err) => {
        console.log(err);
    })
});

module.exports = router;