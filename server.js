var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var indexRoutes = require('./routes/index.js');
var authenticRoutes = require('./routes/authentication.js');
var mongoose    = require('mongoose');
var session     = require('express-session');
var User        = require('./models/user.js');
var pythonShell = require('python-shell');
var fs = require('fs');
var csv = require('fast-csv');

// csv
//     .fromPath("out.csv")
//     .on("data", function(data){
//         console.log(data);
//     })
//     .on("end", function(){
//         console.log("done");
//     });

// pythonShell.run('script.py', function (err) {
//     if (err) throw err;
//     console.log('finished');
// });
//Mongodb Config

//--------------------------------------------------------------------------------------------------------------------------
var DBURL = process.env.url;

if(!DBURL)
{
    DBURL= "mongodb://localhost/appradh" ;
}

mongoose.connect(DBURL);



//-------------------------------------
//****************


// Configuration
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Passport config

app.use(session({
    secret: 'sUperS3cr3t',
    saveUninitialized: false,
    resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// serialize/deserialize

passport.serializeUser(function(user, done) {
    done(null, user.id);

});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});




//***********************************

//routes configuration

app.use('/',indexRoutes);
app.use('/',authenticRoutes);

//*************


//*********************************
// Server config
//**********************

app.listen(process.env.PORT||8080, function(){

    console.log('Server listing on 8080');
});

//*******************