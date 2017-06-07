(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findAllPagesForWebsite": findAllPagesForWebsite
        };
        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            $http.post(url, page);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            $http.delete(url);
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }

})();