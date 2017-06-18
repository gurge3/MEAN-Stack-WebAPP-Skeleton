(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, UserService) {
        var model = this;
        model.login = login;

        function login(user) {
            if (typeof user === "undefined") {
                model.message = "Please enter both your username and password!";
                return;
            }

            var username = user.username;
            if (typeof username === "undefined" || username === "") {
                model.message = "Please enter your username!";
                return;
            }

            var password = user.password;
            if (typeof password === "undefined" || password === "") {
                model.message = "Please enter your password!";
                return;
            }

            UserService
                .login(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $location.url("/profile");
                    },
                    function (err) {
                        model.message = "Failed to login in, please try again!";
                    }
                )
        }
    }
})();