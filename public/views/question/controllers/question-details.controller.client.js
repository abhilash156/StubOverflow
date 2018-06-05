(function () {
    angular
        .module("StubOverflow")
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
        model.addComment = addComment;
        model.addAnswer = addAnswer;

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

        function addComment(comment) {
            if (comment === undefined) {
                alert("Enter some comment!");
            } else {
                var comments = model.questionInfo.comments;
                comments.push(comment);
                model.questionInfo.comments = comments;
                questionService.updateQuestion(model.questionId, model.questionInfo)
                    .then(function (question) {
                        $location.url("/question/" + model.questionId + "/details");
                    });
                var commentBox = document.getElementById("comment");
                commentBox.className = 'hidden'
            }
        }

        function addAnswer(answer) {
            if (answer === undefined) {
                alert("Enter some comment!");
            } else {
                var answers = model.questionInfo.answers;
                answers.push(answer);
                model.questionInfo.answers = answers;
                questionService.updateQuestion(model.questionId, model.questionInfo)
                    .then(function (question) {
                        $location.url("/question/" + model.questionId + "/details");
                    });
                var answerBox = document.getElementById("answer");
                answerBox.className = 'visible'
            }
        }
    }
})();