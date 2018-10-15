var express = require("express");
var router = express.Router();
var _          = require("lodash");

var {Profile}     = require("../models/profile");
var {authenticate} = require("../middlewares/authenticate");


// router.post("/profile",(req, res) => {
//   //console.log(req.body.email);
//   var body = _.pick(req.body, ["firstName", "lastName", "designation", "hospitalName", "city", "country"]);

//   var newProfile = new Profile(body);

//   newProfile.save().then(() => {
//     return res.status(200).send("success");
//   }).catch((e) => {
//     console.log(e);
//     res.status(400).send(e);
//   })
// });


router.post("/", authenticate, function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var designation = req.body.designation;
    var hospitalName = req.body.hospitalName;
    var city = req.body.city;
    var country = req.body.country;
    var user = {
      id: req.user._id
    };
    var newProfile = {firstName: firstName, lastName: lastName, designation: designation, hospitalName: hospitalName, city: city, country: country, user:user};
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