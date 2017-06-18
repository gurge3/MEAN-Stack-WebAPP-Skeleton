(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController)
        .controller('pageListController', pageListController)
        .controller('pageNewController', pageNewController);

    function pageEditController($routeParams,
                                PageService,
                                WidgetService,
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
            var name = page.name;
            if (typeof name === "undefined" || name === "") {
                model.error = "Please enter a name!";
                return;
            }
            WidgetService.findAllWidgetsForPage(model.pageId).then(
                function (widgets) {
                    page._widget = widgets;
                    PageService.updatePage(model.pageId, page);
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
                }
            );
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
            if (name === "" || typeof name === "undefined") {
                model.error = "Please enter a name!";
                return;
            }
            var page = {
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