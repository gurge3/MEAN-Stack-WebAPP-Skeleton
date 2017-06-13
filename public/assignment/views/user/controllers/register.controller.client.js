(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, UserService) {
        var model = this;
        model.register = register;

        function register(username, password, password2) {
            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }
            UserService.findUserByUsername(username).then(
                function(data) {
                    var found = data;
                    if (found !== null) {
                        model.error = "Username is not available";
                    } else {
                        var user = {
                            username: username,
                            password: password
                        };
                        UserService.createUser(user);
                        UserService.findUserByUsername(user.username).then(
                            function(user) {
                                var id = user._id;
                                $location.url('/user/' + id);
                            }
                        );
                    }
                }
            );
        }
    }
})();