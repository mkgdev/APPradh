var router  = require('express').Router();
var mongoose = require('mongoose');
var User    = require("../models/user");
var passport = require('passport');

//routes

router.get("/register", function(req, res){

    res.render("register");

});

router.post("/register", function(req, res){


    var newUser = new User({username: req.body.username});
    email = req.body.email;
    gender = req.body.email;

    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);

            return res.render("register");
        }

        passport.authenticate("local")(req, res, function(){

            res.redirect("/map");
        });


    });

});

//show login form

router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/map",
        failureRedirect: "/"

    }), function(req, res){


});






module.exports = router;