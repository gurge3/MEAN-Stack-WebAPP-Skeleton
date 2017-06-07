(function () {
    angular
        .module("WebAppMaker")
        .controller("imageSearchController", imageSearchController);

    function imageSearchController(FlickrService, WidgetService, $routeParams, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        function init() {
            WidgetService
                .findWidgetById(model.websiteId)
                .then(function (widget) {
                    model.widget = widget;
                });
        }

        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                '_id': model.widgetId,
                'name': '',
                'widgetType': 'IMAGE',
                'pageId': model.pageId,
                'width': '',
                'url': url,
                'text': ''
            };
            WidgetService
                .updateWidget(model.widgetId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + "/widget");
        }

    }
}());