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
            model.websites = WebsiteService.findAllWebsitesForUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }

        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            WebsiteService.createWebsite(website);
            $location.url('/user/' + model.userId + '/website');
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(model.websiteId, website);
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();