(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, WebsiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            model.websites = WebsiteService.findAllWebsitesForUser(model.userId);
        }

        init();
    }
})();