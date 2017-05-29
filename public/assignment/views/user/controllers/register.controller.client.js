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
            var found = UserService.findUserByUsername(username);
            if (found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    password: password
                };
                UserService.createUser(user);
                $location.url('/user/' + user._id);
            }
        }
    }
})();