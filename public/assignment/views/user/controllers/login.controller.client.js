(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, UserService) {
        var model = this;
        model.login = function (username, password) {
            UserService.findUserByCredentials(username, password).then(login);

            function login(found) {
                console.log(found);
                if (found !== null) {
                    $location.url('/user/' + found._id);
                } else {
                    model.message = "Username " + username + " not found!";
                }
            }
        };
    }
})();