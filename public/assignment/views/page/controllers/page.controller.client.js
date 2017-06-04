(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController)
        .controller('pageListController', pageListController)
        .controller('pageNewController', pageNewController);

    function pageEditController($routeParams,
                                PageService,
                                $location) {

        var model = this;
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.userId = $routeParams['uid'];

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            PageService.findAllPagesForWebsite(model.websiteId).then(
                function(data) {
                    model.pages = data;
                }
            );

            PageService.findPageById(model.pageId).then(
                function(data) {
                    model.page = data;
                }
            )
        }

        init();

        // implementation
        function createPage(page) {
            page.pageId = model.pageId;
            PageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }

        function updatePage(page) {
            PageService.updatePage(model.pageId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }
    }

    function pageNewController($routeParams,
                               PageService,
                               $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.createPage = createPage;

        function init() {
            PageService.findAllPagesForWebsite(model.websiteId).then(
                function (data) {
                    model.pages = data;
                }
            )
        }

        init();

        function createPage(name, title) {
            var page = {
                _id: new Date().getTime(),
                name: name,
                websiteId: model.websiteId,
                title: title
            };
            PageService.createPage(model.websiteId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }
    }

    function pageListController($routeParams, PageService) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init() {
            PageService.findAllPagesForWebsite(model.websiteId).then(
                function (data) {
                    model.pages = data;
                }
            )
        }

        init();
    }
})();