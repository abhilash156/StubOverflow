(function () {
    angular
        .module("StubOverflow")
        .controller("questionDetailsController", questionDetailsController);

    function questionDetailsController($routeParams, questionService, $location, sessionUser, answerService, $route) {
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
                    model.questionInfo = question;
                });

            if (!model.isAnon) {
                questionService.isLiked(model.userId, model.questionId)
                    .then(function (value) {
                        model.liked = value;
                    });
            }

            answerService.findAnswerByQuestionId(model.questionId)
                .then((function (answers) {
                    model.answers = answers;
                }))
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
            answer._question = model.questionId;
            // answer._user = model.userId
            console.log(answer);
            if (answer === undefined || answer.text === undefined) {
                alert("Enter some comment!");
                // model.errorMessage = "Enter all fields!";
            } else {
                answerService.createAnswer(answer).then().then(function (answer) {
                    $route.reload();
                });
            }
        }
    }
})();