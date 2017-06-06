(function() {
    angular.module("WebAppMaker")
        .directive('wdDraggable', wdDraggable);

    function wdDraggable(WidgetService) {
        function linkFunction(scope, element) {
            var initial = 0;
            $(element).sortable(

                {
                    start: function(event, ui) {
                        initial = $("ul").index(ui.item);
                    }
                },
                {
                    stop: function(event, ui) {
                        var final = $("ul").index(ui.item);
                        WidgetService.sortList(initial, final);
                    }

                }
            );
        }

        return {
            link: linkFunction
        }
    }
})();