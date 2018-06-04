(function () {
    angular
        .module("GameOn")
        .controller("homeController", homeController);

    function homeController($location, sessionUser) {
        var model = this;

        model.helloValue = 5;

        model.topPosts = [{
            "question": "What is meaning of life?",
            "viewsCount": 4,
            "answersCount" : 6,
            "isAnswered": true
        }, {
            "question": "What is meaning of life?",
            "viewsCount": 4,
            "answersCount" : 6,
            "isAnswered": true
        }, {
            "question": "What is meaning of life?",
            "viewsCount": 4,
            "answersCount" : 6,
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

    }
})();