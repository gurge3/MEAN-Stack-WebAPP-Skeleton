(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, UserService, $routeParams) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.updateUser = updateUser;

        function init() {
            model.user = UserService.findUserById(model.userId);
        }

        init();

        function updateUser() {
            var result = UserService.updateUser(model.userId, model.user);
            $location.url('/user/' + model.userId);
            return result;
        }
    }
})();