(function () {
    angular.module("StubOverflow").factory("userService", userService);

    function userService($http) {
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "getAskedQuestionsByUser": getAskedQuestionsByUser,
            "getAnswersByUser": getAnswersByUser,
            "getUpvotedQuestionsByUser": getUpvotedQuestionsByUser,
            "login": login,
            "checkLogin": checkLogin,
            "logout": logout,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "followUser": followUser,
            "unFollowUser": unFollowUser,
            "getFollowing": getFollowing,
            "getFollowers": getFollowers,
            "isFollowing": isFollowing,
            "isFollower": isFollower,
            "getUsers": getUsers,
            "searchUsers": searchUsers,
            "upsertAnswers": upsertAnswers,
            "removeAnswers": removeAnswers
        };
        return api;

        function upsertAnswers(userId, answers) {
            var url = "/api/user/" + userId + "/answers";
            return $http.post(url, answers).then(successCallback, errorCallback);
        }

        function removeAnswers(userId, questionId) {
            var url = "/api/user/" + userId + "/answers/" + questionId;

            return $http.delete(url).then(successCallback, errorCallback);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user).then(successCallback, errorCallback);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function getUsers() {
            var url = "/api/users";

            return $http.get(url).then(successCallback, errorCallback);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function searchUsers(searchTerm) {
            var url = "/api/searchUsers?searchTerm=" + searchTerm;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function login(username, password) {
            var url = "/api/login";

            return $http.post(url, {username: username, password: password})
                .then(successCallback, function (response, error) {
                    if (response.status === 401) {
                        return 401;
                    } else {
                        errorCallback();
                    }
                });
        }

        function getAskedQuestionsByUser(userId) {
            var url = "/api/user/" + userId + "/asked";

            return $http.get(url).then(successCallback, errorCallback);
        }

        function getAnswersByUser(userId) {
            var url = "/api/user/" + userId + "/answers";

            return $http.get(url).then(successCallback, errorCallback);
        }

        function getUpvotedQuestionsByUser(userId) {
            var url = "/api/user/" + userId + "/upvoted";

            return $http.get(url).then(successCallback, errorCallback);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;

            return $http.put(url, user).then(successCallback, errorCallback);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;

            return $http.delete(url).then(successCallback, errorCallback);
        }

        function checkLogin() {
            return $http.get("/api/checkLogin").then(successCallback, errorCallback);
        }

        function logout() {
            return $http.get("/api/logout").then(successCallback, errorCallback);
        }

        function followUser(userId, userId2) {
            var url = "/api/user/" + userId + "/follow/" + userId2;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function unFollowUser(userId, userId2) {
            var url = "/api/user/" + userId + "/unfollow/" + userId2;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function getFollowing(userId) {
            var url = "/api/user/" + userId + "/following";

            return $http.get(url).then(successCallback, errorCallback);
        }

        function isFollowing(userId, userId2) {
            var url = "/api/user/" + userId + "/following/" + userId2;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function isFollower(userId, userId2) {
            var url = "/api/user/" + userId + "/followers/" + userId2;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function getFollowers(userId) {
            var url = "/api/user/" + userId + "/followers";

            return $http.get(url).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            return response.data;
        }

        function errorCallback() {
            return null;
        }
    }
})();
