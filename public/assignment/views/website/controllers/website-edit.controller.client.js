(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   WebsiteService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService.findAllWebsitesForUser(model.userId).then(
                function (data) {
                    model.websites = data;
                }
            );

            WebsiteService.findWebsiteById(model.websiteId).then(
                function (data) {
                    model.website = data;
                }
            );
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            WebsiteService.createWebsite(website);
            $location.url('/user/' + model.userId + '/website');
        }

        function updateWebsite(website) {
            var name = website.name;
            if (typeof name === "undefined" || name === "") {
                model.error = "Please enter a name!";
                return;
            }
            WebsiteService.updateWebsite(model.websiteId, website);
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();