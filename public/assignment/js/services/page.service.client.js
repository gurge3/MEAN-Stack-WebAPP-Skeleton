(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
            {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
            {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findAllPagesForWebsite": findAllPagesForWebsite
        };
        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var page = pages.find(function (page) {
                return page.websiteId === websiteId;
            });
            if (typeof page === 'undefined')
                return null;
            return page;
        }

        function findPageById(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            if (typeof page === 'undefined')
                return null;
            return page;
        }

        function updatePage(pageId, page) {
            if (findPageById(pageId)) {
                deletePage(pageId);
                page._id = pageId;
                pages.push(page);
                return true;
            } else {
                return false;
            }
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findAllPagesForWebsite(websiteId) {
            var resultSet = [];
            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    resultSet.push(pages[w]);
                }
            }
            return resultSet;
        }
    }

})();