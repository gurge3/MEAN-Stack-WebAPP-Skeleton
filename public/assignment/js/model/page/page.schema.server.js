var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now()},
    _widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}]
}, {collection: 'wu-xingyao-webdev.page'});

module.exports = pageSchema;