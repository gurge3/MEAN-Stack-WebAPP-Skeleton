var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');

var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatepage = updatePage;
pageModel.deletePage = deletePage;

function createPage(page) {
    return pageModel.collection.insert(page);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({websiteId: websiteId});

}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    console.log(pageId);
    return pageModel.update(
        {_id: pageId}, {$set: page}
    );
}

function deletePage(pageId) {
    return pageModel.remove({
        _id: pageId
    });
}

module.exports = pageModel;

