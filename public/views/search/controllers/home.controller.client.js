(function () {
    angular
        .module("StubOverflow")
        .controller("homeController", homeController);

    function homeController($location, $routeParams, sessionUser, questionService) {
        var model = this;

        model.getQuestionURL = getQuestionURL;

        model.helloValue = 5;

        model.search = search;
        model.loggedUser = sessionUser;
        var tag = $routeParams["tag"];

        function init() {
            if(tag === undefined){
                questionService.getTopQuestions()
                    .then(function (questions) {
                        model.topQuestions = questions;
                    });
            }
            else {
                questionService.findQuestionsByTag(tag)
                    .then(function (questions) {
                        model.tag = tag;
                        model.topQuestions = questions;
                    });
            }
        }

        init();

        function search(searchTerm) {
            $location.url("/search?q=" + searchTerm);
        }

        function getQuestionURL(questionId) {
            $location.url("/question/" + questionId + "/details");
        }

    }
})();