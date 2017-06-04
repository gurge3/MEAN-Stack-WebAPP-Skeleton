(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgetsForPage": findAllWidgetsForPage
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            $http.post(url, widget);
        }


        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            $http.delete(url);
        }
    }

})();