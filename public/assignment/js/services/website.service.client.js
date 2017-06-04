(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            $http.post(url, website);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            $http.delete(url);
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }

})();