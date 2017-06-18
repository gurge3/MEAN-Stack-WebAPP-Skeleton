var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

function createUser(user) {
    var userResult = userModel.collection.insert(user);
    return userResult;
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({
        username: username
    });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({
        username: username,
        password: password
    });
}

function updateUser(userId, newUser) {
    return userModel.update(
        {_id: userId},
        {$set : {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({
        _id: userId
    });
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

module.exports = userModel;

