(function () {
    angular
        .module("StubOverflow")
        .controller("commentAddController", commentAddController);

    function commentAddController($location, $routeParams, sessionUser, userService, questionService) {
        var model = this;
        model.comment = addComment;
        model.loggedUser = sessionUser;

        function init() {
        }

        init();

        function addComment(comment) {
            console.log(comment);
            if (comment === undefined) {
                model.errorMessage = "Enter some comment!";
            } else {
                questionService.addComment(question, questionId, comment)
                    .then(function (question) {
                        $location.url("/question/" + question._id + "/detail");
                    });
            }
        }
    }
})();