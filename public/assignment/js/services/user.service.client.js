(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        var api = {
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "checkLoggedIn": checkLoggedIn,
            "logout": logout,
            "register": register,
            "findUserById": findUserById,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            var url = "/api/user";
            $http.post(url, user);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function login(user) {
            return $http.post("/api/login", user).then(
                function(response) {
                    return response.data;
                }
            )
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function logout(user) {
            return $http.post("/api/logout", user);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user).then(
                function(response) {
                    return response;
                }
            )
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            $http.delete(url);
        }
    }

})();