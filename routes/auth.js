var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/login', function(req, res, next){

    res.render('login',{title: 'Login'});
});

router.get('/register', function(req, res, next){

    res.render('signup',{title: 'SignUp'});
});

router.post('/register', function(req, res, next){

    User.register(new User({
        email: req.body.email,
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (!err) {
            res.redirect('/auth/login');

        }
        else {
            // console.log(err.message);
        }
    });
});

router.post('/login', function(req, res, next) {
    User.authenticate()(req.body.username, req.body.password, function(err, user) {
        if(!err){
            if(!user){

                return res.status(400).json({
                    success: false
                });
            }
            else{
                req.logIn(user, function(err) {
                    if(!err){
                        console.log("Success");

                        res.redirect('/');

                    }

                })
            }
        }

    });
});







module.exports = router;