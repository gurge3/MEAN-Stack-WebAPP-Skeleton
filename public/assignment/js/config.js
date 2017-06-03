(function () {
    angular
        .module("WebAppMaker", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "../assignment/views/user/template/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "../assignment/views/user/template/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "../assignment/views/user/template/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "../assignment/views/user/template/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: "../assignment/views/website/template/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "../assignment/views/website/template/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "../assignment/views/website/template/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "../assignment/views/page/template/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "../assignment/views/page/template/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "../assignment/views/page/template/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "../assignment/views/widget/template/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "../assignment/views/widget/template/widget-chooser.view.client.html",
                controller: "widgetChooserController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "../assignment/views/widget/template/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            });
    }

})();