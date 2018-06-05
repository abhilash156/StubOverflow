(function () {
    angular
        .module("GameOn")
        .controller("questionDetailsController", questionDetailsController);

    function questionDetailsController($routeParams, questionService, $location, sessionUser) {
        var model = this;

        model.questionId = $routeParams["questionId"];
        model.liked = false;
        model.owned = false;

        model.loggedUser = sessionUser;
        model.isAnon = true;
        model.isSelling = false;

        model.getGameURL = getGameURL;
        model.likeGame = likeGame;
        model.unLikeGame = unLikeGame;

        function init() {

            if (sessionUser) {
                model.userId = sessionUser._id;
                model.isAnon = false;
            }

            questionService.findGameById(model.gameId)
                .then(function (game) {
                    model.game = game;
                    giantBombService.getGameById(game.externalId)
                        .then(function (gameData) {
                            model.gameInfo = gameData.results;
                        });
                });

            if (!model.isAnon) {
                questionService.isLiked(model.userId, model.gameId)
                    .then(function (value) {
                        model.liked = value;
                    });

                questionService.isOwned(model.userId, model.gameId)
                    .then(function (value) {
                        model.owned = value;
                    });
            }
        }

        init();

        function getGameURL(externalId) {
            questionService.findGameByExternalId(externalId)
                .then(function (game) {
                    $location.url("/game/" + game._id + "/detail");
                });
        }

        function likeGame() {
            if (model.isAnon) {
                $location.url("login");
            } else {
                questionService.likeGame(model.userId, model.gameId)
                    .then(function (game) {
                        model.liked = !model.liked;
                    });
            }
        }

        function unLikeGame() {
            if (model.isAnon) {
                $location.url("login");
            } else {
                questionService.unLikeGame(model.userId, model.gameId)
                    .then(function (game) {
                        model.liked = !model.liked;
                    });
            }
        }
    }
})();