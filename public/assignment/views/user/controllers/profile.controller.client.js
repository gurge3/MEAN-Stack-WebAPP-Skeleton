(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, UserService, $routeParams) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(model.userId).then(
                function (data) {
                    model.user = data;
                }
            );
        }

        init();

        function updateUser() {
            UserService.updateUser(model.userId, model.user).then(
                function(data) {
                    $location.url('/user/' + model.userId);
                    return data;
                }
            );
        }

        function deleteUser() {
            UserService.deleteUser(model.userId);
            $location.url("/");
        }
    }
})();