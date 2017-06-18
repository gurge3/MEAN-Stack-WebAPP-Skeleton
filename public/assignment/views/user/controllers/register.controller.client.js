(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, UserService) {
        var model = this;
        model.register = register;

        function register(username, password, password2) {
            if (typeof username === "undefined") {
                model.error = "Please enter your username!";
                return;
            }
            console.log(password);
            if (typeof password === "undefined" || password === "") {
                model.error = "Please enter your password!";
                return;
            }

            if (typeof password === "undefined") {
                model.error = "Please enter your password again!";
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
                        UserService.register(user)
                            .then(
                                function(response) {
                                    $location.url('/profile');
                                }
                            );
                    }
                }
            );
        }
    }
})();