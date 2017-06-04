(function() {
    angular.module("WebAppMaker")
        .directive('wdDraggable', wdDraggable);

    function wdDraggable() {
        function linkFunction(scope, element) {
            $(element).sortable();
        }

        return {
            link: linkFunction
        }
    }
})();