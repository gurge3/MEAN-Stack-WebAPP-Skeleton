(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, UserService, $routeParams) {
        var model = this;
        model.userId = currentUser._id;
        model.user = currentUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
        }
        init();

        function updateUser() {
            UserService.updateUser(model.userId, model.user).then(
                function(data) {
                    return data;
                }
            );
        }

        function deleteUser() {
            UserService.deleteUser(model.userId);
            $location.url("/");
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    }
                );
        }
    }
})();