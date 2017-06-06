module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget/", sortWidget);

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../uploads'});
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = findLocalWidgetById(widgetId);
        widget.url = '/assignment/uploads/' + filename;

        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

        res.redirect(callbackUrl);

    }

    var widgets = [
        {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
        {_id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
        {
            _id: "345", widgetType: "IMAGE", pageId: "321", width: "100",
            url: "http://lorempixel.com/400/200/"
        },
        {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
        {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
        {
            _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        },
        {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
        {
            _id: "345", widgetType: "IMAGE", pageId: "12341234", width: "200",
            url: "http://lorempixel.com/400/200/"
        },
        {
            _id: "678", widgetType: "YOUTUBE", pageId: "12341234", width: "1000",
            url: "https://www.youtube.com/embed/LGCkoapvXT8"
        }
    ];

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params['pageId'];
        widget.pageId = pageId;
        widgets.push(widget);
    }

    function findLocalWidgetById(widgetId) {
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                return widget;
            }
        }
    }

    function findAllLocalWidgetsForPage(pageId) {
        var resultSet = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                resultSet.push(widgets[w]);
            }
        }
        return resultSet;
    }

    function findAllWidgetsForPage(req, res) {
        var resultSet = [];
        var pageId = req.params["pageId"];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                resultSet.push(widgets[w]);
            }
        }
        res.send(resultSet);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params["widgetId"];
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                res.json(widget);
                return;
            }
        }
        res.send("0");
    }

    function updateWidget(req, res) {
        var widgetId = req.params["widgetId"];
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        var newWidget = req.body;
        newWidget._id = widgetId;
        widgets.splice(index, 0, newWidget);
        res.json(widgets);

    }

    function deleteWidget(req, res) {
        var widgetId = req.params["websiteId"];
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.json(widgets);
    }

    function sortWidget(req, res) {
        var store = [];
        var initial = req.query["initial"];
        var final = req.query["final"];

        for (var i = widgets.length - 1; i >= 0; i--) {
            if (widgets[i].pageId === req.params["pageId"]) {
                store.unshift(widgets[i]);
                widgets.splice(i, 1);
            }
        }
        var widget = store[initial];
        store.splice(initial, 1);
        store.splice(final, 0, widget);
        widgets = widgets.concat(store);
        res.send("OK");
    }

};