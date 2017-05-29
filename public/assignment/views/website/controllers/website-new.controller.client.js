(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  WebsiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['uid'];

        model.createWebsite = createWebsite;

        function init() {
            model.websites = WebsiteService.findAllWebsitesForUser(model.userId);
        }

        init();

        function createWebsite(name, description) {
            var website = {
                name: name,
                developerId: model.userId,
                description: description
            };
            WebsiteService.createWebsite(model.userId, website);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();