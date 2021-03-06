(function () {
    angular
        .module("StubOverflow")
        .controller("questionAddController", questionAddController);

    function questionAddController($location, $routeParams, sessionUser, userService, questionService) {
        var model = this;
        model.createQuestion = createQuestion;
        model.loggedUser = sessionUser;

        function init() {
        }

        init();

        function createQuestion(question) {
            if (question === undefined || question.title === undefined) {
                model.errorMessage = "Enter all fields!";
            } else {
                questionService.createQuestion(question)
                    .then(function (question) {
                        question._user = sessionUser._id;
                        $location.url("#!/question/" + question._id + "/detail");
                    });
            }
        }

    }
})();