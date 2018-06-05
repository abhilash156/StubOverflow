(function () {
    angular.module("GameOn").factory("questionService", questionService);

    function questionService($http) {
        var api = {
            "createQuestion": createQuestion,
            // "findQuestionByExternalId": findQuestionByExternalId,
            // "isLiked": isLiked,
            // "isOwned": isOwned,
            "findQuestionById": findQuestionById,
            "updateQuestion": updateQuestion,
            "deleteQuestion": deleteQuestion,
            // "likeQuestion": likeQuestion,
            // "buyQuestion": buyQuestion,
            // "unLikeQuestion": unLikeQuestion
        };

        return api;

        function createQuestion(question) {
            var url = "/api/question";

            return $http.post(url, question).then(successCallback, errorCallback);
        }

        // function likeQuestion(userId, questionId) {
        //     var url = "/api/user/" + userId + "/like/" + questionId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
        //
        // function buyQuestion(userId, questionId) {
        //     var url = "/api/user/" + userId + "/buy/" + questionId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
        //
        // function unLikeQuestion(userId, questionId) {
        //     var url = "/api/user/" + userId + "/unlike/" + questionId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
        //
        // function isLiked(userId, questionId) {
        //     var url = "/api/user/" + userId + "/liked/" + questionId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
        //
        // function isOwned(userId, questionId) {
        //     var url = "/api/user/" + userId + "/owned/" + questionId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }

        function findQuestionById(questionId) {
            var url = "/api/question/" + questionId;

            return $http.get(url).then(successCallback, errorCallback);
        }

        // function findQuestionByExternalId(externalId) {
        //     var url = "/api/question?externalId=" + externalId;
        //
        //
        //     return $http.get(url).then(function (response) {
        //         if (response.status === 204) {
        //             return giantBombService.getQuestionById(externalId)
        //                 .then(function (questionData) {
        //                     return createQuestion(giantBombService.getQuestionObject(questionData.results))
        //                 })
        //         } else {
        //             return successCallback(response);
        //         }
        //     }, errorCallback);
        // }

        function updateQuestion(questionId, question) {
            var url = "/api/question/" + questionId;

            return $http.put(url, question).then(successCallback, errorCallback);
        }

        function deleteQuestion(questionId) {
            var url = "/api/question/" + questionId;

            return $http.delete(url).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            return response.data;
        }

        function errorCallback() {
            return null;
        }
    }
})();