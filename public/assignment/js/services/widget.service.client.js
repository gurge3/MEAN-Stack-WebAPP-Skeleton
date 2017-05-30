(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
            {_id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            {
                _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                url: "http://lorempixel.com/400/200/"
            },
            {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            {
                _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            },
            {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var widget = widgets.find(function (widget) {
                return widget.pageId === pageId;
            });
            if (typeof widget === 'undefined')
                return null;
            return widget;
        }

        function findWidgetById(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            if (typeof widget === 'undefined')
                return null;
            return widget;
        }

        function updateWidget(widgetId, widget) {
            if (findWidgetById(widgetId)) {
                deleteWidget(widgetId);
                widget._id = widgetId;
                widgets.push(widget);
            } else {
                return false;
            }

        }

        function deleteWidget(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }
    }

})();