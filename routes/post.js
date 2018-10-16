const express = require("express");
const router = express.Router();
const _          = require("lodash");
const multer = require("multer");

const {Post}     = require("../models/post");
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
      postBy : req.user._id

    }).then((data) => {
      console.log(data);
      res.send({data});
    },(err) => {
      res.status(400).send(err);
    })
});


router.post("/", [authenticate, upload.single('image')], function(req, res){
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
    var postBy = req.user._id;

    var newPost = {postText: postText, imagePath: imagePath, imageName: imageName, videoPath: videoPath, videoName: videoName, privacy: privacy, postBy:postBy};

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
});

module.exports = router;