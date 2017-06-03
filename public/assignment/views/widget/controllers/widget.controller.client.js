(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetChooserController", widgetChooserController)
        .controller("widgetListController", widgetListController)
        .controller("widgetEditController", widgetEditController);

    function widgetListController($sce, $routeParams, WidgetService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.getHtml = getHtml;
        model.getUrl = getUrl;
        model.getTemplate = getTemplate;

        function init() {
            model.widgets = WidgetService.findAllWidgetsForPage(model.pageId);
            console.log(model.widgets);
        }
        init();

        function getHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTemplate(widgetType) {
            var template = 'views/widget/template/widget-' + widgetType.toLowerCase() + '.view.client.html';
            return template;
        }
    }

    function widgetChooserController($location, $routeParams, WidgetService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];
        model.createWidget = createWidget;

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }

        function createWidget(widgetType) {
            var widget = {
                name: "",
                widgetType: widgetType,
                pageId: model.pageId
            };
            WidgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
        }
        init();
    }

    function widgetEditController($location, $routeParams, WidgetService, $scope) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            model.widget = WidgetService.findWidgetById(model.widgetId);
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
            $scope.type = model.widget.widgetType.toLowerCase();
        }
        init();

        $scope.template = getTemplate();

        function getTemplate() {
            var template = 'views/widget/template/widget-' + model.widget.widgetType.toLowerCase() + '-edit.view.client.html';
            return template;
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + /widget/);
        }

        function updateWidget() {
            var result = WidgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + /widget/);
        }
    }

})();