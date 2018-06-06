(function () {
    angular.module("StubOverflow").factory("answerService", answerService);

    function answerService($http) {
        var api = {
            "createAnswer": createAnswer,
            // "isLiked": isLiked,
            "findAnswerById": findAnswerById,
            "findAnswerByQuestionId": findAnswerByQuestionId,
            "updateAnswer": updateAnswer,
            "deleteAnswer": deleteAnswer,
            // "likeAnswer": likeAnswer,
            // "unLikeAnswer": unLikeAnswer,
            "getTopAnswers": getTopAnswers
        };

        return api;

        function createAnswer(answer) {
            var url = "/api/answer";

            return $http.post(url, answer).then(successCallback, errorCallback);
        }

        function findAnswerById(answerId) {
            var url = "/api/answer/" + answerId;

            return $http.get(url).then(successCallback, errorCallback);
        }

        function findAnswerByQuestionId(questionId) {
            var url = "/api/answer/question/" + questionId;
            return $http.get(url).then(successCallback, errorCallback);
        }


        function updateAnswer(answerId, answer) {
            var url = "/api/answer/" + answerId;

            return $http.put(url, answer).then(successCallback, errorCallback);
        }

        function deleteAnswer(answerId) {
            var url = "/api/answer/" + answerId;

            return $http.delete(url).then(successCallback, errorCallback);
        }

        function getTopAnswers() {
            var url = "/api/answers/top";
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

        // function likeAnswer(userId, answerId) {
        //     var url = "/api/user/" + userId + "/like/" + answerId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
        //
        // function unLikeAnswer(userId, answerId) {
        //     var url = "/api/user/" + userId + "/unlike/" + answerId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
        //
        // function isLiked(userId, answerId) {
        //     var url = "/api/user/" + userId + "/liked/" + answerId;
        //
        //     return $http.get(url).then(successCallback, errorCallback);
        // }
    }
})();