module.exports = function(app) {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    // Used temporarily for accessing MLab MongoDB.
    var username = "admin";
    var password = "admin";

    var connectionString = 'mongodb://'+ username + ':' + password + '@ds113628.mlab.com:13628/heroku_9bxp0pq5';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    mongoose.connect(connectionString);
    require('./services/UserService.service.server.js')(app);
};