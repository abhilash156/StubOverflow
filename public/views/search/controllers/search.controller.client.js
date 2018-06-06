(function () {
    angular
        .module("StubOverflow")
        .controller("searchController", searchController);

    function searchController($location, $routeParams, questionService, sessionUser, userService) {
        var model = this;
        model.search = search;
        model.getQuestionURL = getQuestionURL;
        model.searchTerm = $routeParams["q"];
        model.loggedUser = sessionUser;


        function init() {
            search();
        }

        init();

        function search() {
            questionService.searchQuestions(model.searchTerm)
                .then(function (response) {
                    model.searchResult = response.results;
                });
            userService.searchUsers(model.searchTerm)
                .then(function (users) {
                    model.searchResultUsers = users;
                });
        }

        function getQuestionURL(questionId) {
            $location.url("/question/" + questionId + "/detail");
        }
    }
})();