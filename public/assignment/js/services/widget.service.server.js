module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget/", sortWidget);

    var multer = require('multer');
    var widgetModel = require("../model/widget/widget.model.server");
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

        findWidgetWithGivenId(widgetId).then(
            function (widget) {
                var widget = widget;
                widget.url = '/assignment/uploads/' + filename;
                updateWidgetByID(widgetId, widget);
                var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";
                res.redirect(callbackUrl);
            }
        );

    }


    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params['pageId'];
        widgetModel.createWidget(widget).then(
            function (response) {
                res.send(response);
            }
        );

    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params["pageId"];
        widgetModel.findAllWidgetsForPage(pageId).then(
            function (widgetIds) {
                widgetModel.findWidgetByIds(widgetIds).then(
                    function (widgets) {
                        var finalHashWidgetList = getHashedList(widgets);

                        function getHashedList(widgets) {
                            var hashedWidgetList = [];
                            for (var i in widgets) {
                                hashedWidgetList[widgets[i]._id] = widgets[i];
                            }
                            return hashedWidgetList;
                        }

                        var widgetList = [];

                        for (var i = 0; i < widgetIds.length; i++) {
                            var widgetId = widgetIds[i];
                            var widget = finalHashWidgetList[widgetId];
                            widgetList.push(widget);
                        }
                        res.json(widgetList);
                    }
                );
            }
        );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params["widgetId"];
        widgetModel.findWidgetById(widgetId).then(
            function (widget) {
                res.json(widget);
            }
        );
    }

    function findWidgetWithGivenId(widgetId) {
        return widgetModel.findWidgetById(widgetId).then(
            function (widget) {
                return widget;
            }
        );
    }

    function updateWidget(req, res) {
        var widgetId = req.params["widgetId"];
        var newWidget = req.body;
        widgetModel.updateWidget(widgetId, newWidget).then(
            function (response) {
                res.send(response);
            }
        );
    }

    function updateWidgetByID(widgetId, newWidget) {
        return widgetModel.updateWidget(widgetId, newWidget).then(
            function (response) {
                res.send(response);
            }
        );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params["widgetId"];
        console.log(widgetId);
        widgetModel.deleteWidget(widgetId).then(
            function (response) {
                res.send(response);
            }
        );
    }

    function sortWidget(req, res) {
        var initial = req.query["initial"];
        var final = req.query["final"];
        var pageId = req.params["pageId"];
        widgetModel.reorderWidget(pageId, initial, final).then(
            function (response) {
                res.send(response);
            }
        );
    }

};