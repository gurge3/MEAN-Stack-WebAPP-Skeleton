var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');

var pageModel = require('../page/page.model.server.js');

var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.findWidgetByIds = findWidgetByIds;

function createWidget(widget) {
    return widgetModel.collection.insert(widget).then(
        function (widget) {
            var pageId = widget.ops[0].pageId;
            var widgetId = widget.ops[0]._id;
            pageModel.addWidgetToPage(pageId, widgetId);
            return widget;
        }
    );
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId).then(
        function (page) {
            return page._widgets;
        }
    );


}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function findWidgetByIds(widgetIds) {
    return widgetModel.find(
        {'_id': {$in: widgetIds}}
    );
}


function updateWidget(widgetId, widget) {
    return widgetModel.update(
        {_id: widgetId}, {$set: widget}
    );
}


function deleteWidget(widgetId) {
    return widgetModel.remove({
        _id: widgetId
    });
}

function reorderWidget(pageId, start, end) {
    return pageModel.findPageById(pageId).then(
        function (page) {
            var widgets = page._widgets;
            widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            page._widgets = widgets;
            return pageModel.updatePage(pageId, page);
        }
    )
}

module.exports = widgetModel;

