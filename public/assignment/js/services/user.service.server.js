module.exports = function (app) {
    var userModel = require("../model/user/user.model.server");

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.post("/api/login", passport.authenticate("local"), login);
    app.get("/api/checkLoggedIn", checkLoggedIn);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/user", findUserByCredentials);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/#!/login'
    }));
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        return userModel.findUserByFacebookId(profile.id).then(
            function (user) {
                if (!user) {
                    var user = {
                        username: profile.displayName,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(user).then(
                        function (response) {
                            return done(null, user);
                        }
                    )
                }
                return done(null, user);
            }
        )
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.createUser(user).then(
            function (response) {
                res.send(response);
            }
        )
    }

    function findUserById(req, res) {
        var userId = req.params["userId"];
        userModel.findUserById(userId).then(
            function (user) {
                res.json(user);
            }
        );
    }

    function findUserByUsername(req, res) {
        var username = req.query["username"];
        userModel.findUserByUsername(username).then(
            function (user) {
                res.json(user);
            }
        )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkLoggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
                function (user) {
                    req.logIn(user.ops[0], function (err) {
                        if (err) {
                            console.log(err);
                        }
                        res.json(user);
                    });
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        userModel.findUserByCredentials(username, password).then(
            function (user) {
                res.json(user);
            }
        );
    }

    function updateUser(req, res) {
        var userId = req.params["userId"];
        var newUser = req.body;
        userModel.updateUser(userId, newUser).then(
            function (response) {
                res.send(response);
            }
        )
    }

    function deleteUser(req, res) {
        var userId = req.params["userId"];
        userModel.deleteUser(userId).then(
            function (response) {
                res.send(response);
            }
        )
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

};
