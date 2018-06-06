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
            console.log(question);
            if (question === undefined || question.title === undefined) {
                model.errorMessage = "Enter all fields!";
            } else {
                questionService.createQuestion(question)
                    .then(function (question) {
                        console.log(question);
                        $location.url("#!/question/" + question._id + "/detail");
                    });
            }
        }

    }
})();