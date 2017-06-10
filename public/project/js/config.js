(function () {
    angular
        .module("RushDelivery", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "../project/views/user/template/user.login.client.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }

})();