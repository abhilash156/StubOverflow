(function () {
    angular
        .module("GameOn")
        .controller("homeController", homeController);

    function homeController($location, sessionUser, questionService) {
        var model = this;

        model.getQuestionURL = getQuestionURL;

        model.helloValue = 5;

        model.topQuestions = [{
            "_id": 1,
            "title": "What is meaning of life the universe and everything?",
            "viewsCount": 4,
            "answerCount": 6,
            "isAnswered": true
        }, {
            "_id": 2,
            "title": "What's the difference between JavaScript and Java?",
            "viewsCount": 1,
            "answerCount": 0,
            "isAnswered": false
        }, {
            "_id": 3,
            "title": "Why does ++[[]][+[]]+[+[]] return the string “10”?",
            "viewsCount": 3,
            "answerCount": 2,
            "isAnswered": true
        }];

        model.search = search;
        model.loggedUser = sessionUser;

        function init() {
            questionService.getTopQuestions()
                .then(function (questions) {
                    model.topQuestions = questions;
                });
            console.log(model.topQuestions);
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