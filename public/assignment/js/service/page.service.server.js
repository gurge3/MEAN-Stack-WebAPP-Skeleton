module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
        {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
        {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
    ];

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params['websiteId'];
        var id = (new Date()).getTime() + "";
        page.websiteId = websiteId;
        page._id = id;
        pages.push(page);
    }

    function findAllPagesForWebsite(req, res) {
        var resultSet = [];
        var websiteId = req.params["websiteId"];
        for (var w in pages) {
            if (pages[w].websiteId === websiteId) {
                resultSet.push(pages[w]);
            }
        }
        res.send(resultSet);
    }

    function findPageById(req, res) {
        var pageId = req.params["pageId"];
        for (var w in pages) {
            var page = pages[w];
            if (page._id === pageId) {
                res.json(page);
                return;
            }
        }
        res.send("0");
    }

    function updatePage(req, res) {
        var pageId = req.params["pageId"];
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        var newPage = req.body;
        newPage._id = pageId;
        pages.splice(index,0, newPage);
        res.json(pages);

    }

    function deletePage(req, res) {
        var pageId = req.params["pageId"];
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.json(pages);
    }
};