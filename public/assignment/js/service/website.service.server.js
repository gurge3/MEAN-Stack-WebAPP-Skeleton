module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
        {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
        {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
        {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
        {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
        {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
    ];

    function createWebsite(req, res) {
        var website = req.body;
        var developerId = req.params['userId'];
        var id = (new Date()).getTime() + "";
        website.developerId = developerId;
        website._id = id;
        websites.push(website);
    }

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        var developerId = req.params["userId"];
        for (var w in websites) {
            if (websites[w].developerId === developerId) {
                resultSet.push(websites[w]);
            }
        }
        res.send(resultSet);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params["websiteId"];
        for (var w in websites) {
            var website = websites[w];
            if (website._id === websiteId) {
                res.json(website);
                return;
            }
        }
        res.send("0");
    }

    function updateWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        var newWebsite = req.body;
        newWebsite._id = websiteId;
        websites.splice(index,0, newWebsite);
        res.json(websites);

    }

    function deleteWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.json(websites);
    }
};