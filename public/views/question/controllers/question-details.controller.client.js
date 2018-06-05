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
        model.buyGame = buyGame;
        model.sellGame = sellGame;

        function init() {

            if (sessionUser) {
                model.userId = sessionUser._id;
                model.isAnon = false;
            }

            gameService.findGameById(model.gameId)
                .then(function (game) {
                    model.game = game;
                    giantBombService.getGameById(game.externalId)
                        .then(function (gameData) {
                            model.gameInfo = gameData.results;
                        });
                });

            if (!model.isAnon) {
                gameService.isLiked(model.userId, model.gameId)
                    .then(function (value) {
                        model.liked = value;
                    });

                gameService.isOwned(model.userId, model.gameId)
                    .then(function (value) {
                        model.owned = value;
                    });
            }
        }

        init();

        function getGameURL(externalId) {
            gameService.findGameByExternalId(externalId)
                .then(function (game) {
                    $location.url("/game/" + game._id + "/detail");
                });
        }

        function likeGame() {
            if (model.isAnon) {
                $location.url("login");
            } else {
                gameService.likeGame(model.userId, model.gameId)
                    .then(function (game) {
                        model.liked = !model.liked;
                    });
            }
        }

        function unLikeGame() {
            if (model.isAnon) {
                $location.url("login");
            } else {
                gameService.unLikeGame(model.userId, model.gameId)
                    .then(function (game) {
                        model.liked = !model.liked;
                    });
            }
        }
    }
})();