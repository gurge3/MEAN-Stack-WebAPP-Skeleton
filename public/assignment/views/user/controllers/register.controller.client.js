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
                    if (found !== "0") {
                        model.error = "Username is not available";
                    } else {
                        var id = (new Date()).getTime() + "";
                        var user = {
                            _id : id,
                            username: username,
                            password: password
                        };
                        UserService.createUser(user);
                        $location.url('/user/' + user._id);
                    }
                }
            );
        }
    }
})();