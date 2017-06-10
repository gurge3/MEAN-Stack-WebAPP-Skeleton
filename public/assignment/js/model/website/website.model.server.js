var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');

var websiteModel = mongoose.model('WebsiteSchema', websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

function createWebsiteForUser(website) {
    return websiteModel.collection.insert(website);
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({developerId: userId});

}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update(
        {_id: websiteId},
        {$set: website}
    );
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({
        _id: websiteId
    });
}

module.exports = websiteModel;

