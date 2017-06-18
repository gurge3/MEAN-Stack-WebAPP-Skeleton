module.exports = function(app) {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    mongoose.connect('mongodb://127.0.0.1/wu-xingyao-webdev');

    require("./services/page.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/user.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};