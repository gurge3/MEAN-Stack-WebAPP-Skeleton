var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var secret = "mysecret";

if (process.env.SESSION_SECRET) {
    secret = process.env.SESSION_SECRET;
}

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({secret: secret}));
app.use(passport.initialize());
app.use(passport.session());

require("./public/assignment/js/app.js")(app);
//require("./public/project/js/app.js")(app);

var port = process.env.PORT || 3001;

app.listen(port);