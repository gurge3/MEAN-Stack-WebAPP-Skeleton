(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http, $routeParams, PageService) {
        var api = {
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "sortList": sortList,
            "findAllWidgetsForPage": findAllWidgetsForPage
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            widget.pageId = pageId;
            return $http.post(url, widget).then(
                function (response) {
                    return response.data;
                }
            )
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url).then(
                function (response) {
                    return response.data;
                }
            );
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url).then(
                function (response) {
                    return response.data;
                }
            );
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            $http.put(url, widget);
        }


        function sortList(initial, final) {
            var url = "/page/" + $routeParams['pid'] + "/widget?initial=" + initial + "&final=" + final;
            $http.put(url);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            $http.delete(url);
        }
    }

})();