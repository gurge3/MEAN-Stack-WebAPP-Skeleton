(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, WebsiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            WebsiteService.findAllWebsitesForUser(model.userId).then(
                function(data) {
                    model.websites = data;
                }
            )
        }

        init();
    }
})();