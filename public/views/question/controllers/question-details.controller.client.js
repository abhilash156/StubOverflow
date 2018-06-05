(function () {
    angular
        .module("GameOn")
        .controller("questionDetailsController", questionDetailsController);

    function questionDetailsController($routeParams, questionService, $location, sessionUser) {
        var model = this;

        model.questionId = $routeParams["questionId"];
        model.liked = false;

        model.loggedUser = sessionUser;
        model.isAnon = true;

        model.getQuestionURL = getQuestionURL;
        model.likeQuestion = likeQuestion;
        model.unLikeQuestion = unLikeQuestion;

        function init() {

            if (sessionUser) {
                model.userId = sessionUser._id;
                model.isAnon = false;
            }

            questionService.findQuestionById(model.questionId)
                .then(function (question) {
                    console.log(question);
                    model.questionInfo = question;
                });

            if (!model.isAnon) {
                questionService.isLiked(model.userId, model.questionId)
                    .then(function (value) {
                        model.liked = value;
                    });
            }
        }

        init();

        function getQuestionURL(questionId) {
            $location.url("/question/" + questionId + "/details");
        }


        function likeQuestion() {
            if (model.isAnon) {
                $location.url("login");
            } else {
                questionService.likeQuestion(model.userId, model.questionId)
                    .then(function (question) {
                        model.liked = !model.liked;
                    });
            }
        }

        function unLikeQuestion() {
            if (model.isAnon) {
                $location.url("login");
            } else {
                questionService.unLikeQuestion(model.userId, model.questionId)
                    .then(function (question) {
                        model.liked = !model.liked;
                    });
            }
        }
    }
})();