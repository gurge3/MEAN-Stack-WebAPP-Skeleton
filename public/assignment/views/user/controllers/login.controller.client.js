(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, UserService) {
        var model = this;
        model.login = function (username, password) {
            UserService.findUserByCredentials(username, password).then(login);

            function login(found) {
                if (found !== "0") {
                    $location.url('/user/' + found._id);
                } else {
                    model.message = "Username " + username + " not found!";
                }
            }
        };
    }
})();