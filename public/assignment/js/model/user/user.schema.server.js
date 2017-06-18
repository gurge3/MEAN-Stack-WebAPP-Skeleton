var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    _website: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now()},
    facebook: {
        id: String,
        token: String
    }
}, {collection: 'wu-xingyao-webdev.user'});

module.exports = userSchema;