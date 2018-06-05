(function () {
    angular
        .module("GameOn")
        .controller("homeController", homeController);

    function homeController($location, sessionUser) {
        var model = this;

        model.getQuestionURL = getQuestionURL;

        model.helloValue = 5;

        model.topPosts = [{
            "id": 1,
            "question": "What is meaning of life the universe and everything?",
            "viewsCount": 4,
            "answersCount" : 6,
            "isAnswered": true
        }, {
            "id": 2,
            "question": "What's the difference between JavaScript and Java?",
            "viewsCount": 1,
            "answersCount" : 0,
            "isAnswered": false
        }, {
            "id": 3,
            "question": "Why does ++[[]][+[]]+[+[]] return the string “10”?",
            "viewsCount": 3,
            "answersCount" : 2,
            "isAnswered": true
        }];

        model.search = search;
        model.loggedUser = sessionUser;

        function init() {
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