var app = require("../../express");

var questionModel = require("../model/question/question.model.server");

app.question("/api/question", createQuestion);
app.get("/api/question/:questionId", findQuestionById);
// app.get("/api/question", findQuestionByExternalId);
app.put("/api/question/:questionId", updateQuestion);
app.delete("/api/question/:questionId", deleteQuestion);

function createQuestion(request, response) {
    var question = request.body;

    questionModel.createQuestion(question)
        .then(function (newQuestion) {
            response.send(newQuestion);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function findQuestionById(request, response) {
    var questionId = request.params.questionId;

    questionModel.findQuestionById(questionId)
        .then(function (question) {
            response.send(question);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function updateQuestion(request, response) {
    var question = request.body;
    var questionId = request.params.questionId;

    questionModel.updateQuestion(questionId, question)
        .then(function () {
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function deleteQuestion(request, response) {
    var questionId = request.params.questionId;

    questionModel.deleteQuestion(questionId)
        .then(function () {
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

// function findQuestionByExternalId(request, response) {
//     var externalId = request.query.externalId;
//
//     questionModel.findQuestionByExternalId(externalId)
//         .then(function (question) {
//             if (question === null) {
//                 response.sendStatus(204);
//             } else {
//                 response.json(question);
//             }
//         }, function (error) {
//             response.sendStatus(404).error(error);
//         });
// }