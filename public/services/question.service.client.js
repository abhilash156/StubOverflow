(function () {
    angular.module("GameOn").factory("questionService", questionService);

    function questionService($http) {
        var api = {
            "createQuestion": createQuestion,
            "isLiked": isLiked,
            "findQuestionById": findQuestionById,
            "updateQuestion": updateQuestion,
            "deleteQuestion": deleteQuestion,
            "likeQuestion": likeQuestion,
            "unLikeQuestion": unLikeQuestion,
            "getTopQuestions": getTopQuestions
        };

        return api;

        function createQuestion(question) {
            var url = "/api/question";

            return $http.post(url, question).then(successCallback, errorCallback);
        }

        function likeQuestion(userId, questionId) {
            var url = "/api/user/" + userId + "/like/" + questionId;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function unLikeQuestion(userId, questionId) {
            var url = "/api/user/" + userId + "/unlike/" + questionId;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function isLiked(userId, questionId) {
            var url = "/api/user/" + userId + "/liked/" + questionId;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function findQuestionById(questionId) {
            var url = "/api/question/" + questionId;

            return $http.get(url).then(successCallback, errorCallback);
        }


        function updateQuestion(questionId, question) {
            var url = "/api/question/" + questionId;

            return $http.put(url, question).then(successCallback, errorCallback);
        }

        function deleteQuestion(questionId) {
            var url = "/api/question/" + questionId;

            return $http.delete(url).then(successCallback, errorCallback);
        }

        function getTopQuestions() {
            var url = "/api/questions/top";
            return $http.get(url).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            return response.data;
        }

        function errorCallback(error) {
            console.log("In ErrorCallback Service Client");
            console.log(error);
            return null;
        }
    }
})();