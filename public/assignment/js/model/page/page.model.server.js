var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');

var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidgetToPage = addWidgetToPage;
pageModel.deleteWidget = deleteWidget;
module.exports = pageModel;

function createPage(page) {
    return pageModel.collection.insert(page);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({websiteId: websiteId});

}

function addWidgetToPage(pageId, widgetId) {
    return pageModel.findById(pageId).then(
        function (page) {
            page._widgets.push(widgetId);
            return page.save();
        }
    );
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update(
        {_id: pageId}, {$set: page}
    );
}

function deletePage(pageId) {
    return pageModel.remove({
        _id: pageId
    });
}

function deleteWidget(pageId, widgetId) {
    console.log(widgetId);
    return pageModel.update(
        {_id: pageId},
        {$pull: {_widgets: widgetId}}
    );
}


