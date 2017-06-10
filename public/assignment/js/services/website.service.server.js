module.exports = function(app) {
    var websiteModel = require('../model/website/website.model.server');

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var developerId = req.params['userId'];
        website.developerId = developerId;
        websiteModel.createWebsiteForUser(website).then(
            function(response) {
                res.send(response);
            }
        );
    }

    function findAllWebsitesForUser(req, res) {
        var developerId = req.params["userId"];
        websiteModel.findAllWebsitesForUser(developerId).then(
            function(websites) {
                res.json(websites);
            }
        );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params["websiteId"];
        websiteModel.findWebsiteById(websiteId).then(
            function(website) {
                res.json(website);
            }
        );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        var newWebsite = req.body;
        websiteModel.updateWebsite(websiteId, newWebsite)
         .then(
            function(response) {
                res.send(response);
            }
        );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        websiteModel.deleteWebsite(websiteId).then(
            function(response) {
                res.send(response);
            }
        );
    }
};