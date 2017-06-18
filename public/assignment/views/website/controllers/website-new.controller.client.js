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
            WebsiteService.findAllWebsitesForUser(model.userId).then(
                function (data) {
                    model.websites = data;
                }
            );
        }

        init();

        function createWebsite(name, description) {
            if (typeof name === "undefined" || name === "") {
                model.error = "Please enter a name!";
                return;
            }
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