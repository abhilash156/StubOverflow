(function () {
    angular
        .module("StubOverflow")
        .controller("answerAddController", answerAddController);

    function answerAddController($location, $routeParams, sessionUser, userService, questionService) {
        var model = this;
        model.createAnswer = createAnswer;
        model.loggedUser = sessionUser;

        function init() {
        }

        init();

        function createAnswer(answer) {
            console.log(answer);
            if (answer === undefined) {
                model.errorMessage = "Enter all fields!";
            } else {
                answerService.createAnswer(answer)
                    .then(function (answer) {
                        $location.url("#!/");
                    });
            }
        }
    }
})();