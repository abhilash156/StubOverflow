var mongoose = require("mongoose");
var questionSchema = require("./question.schema.server");
mongoose.Promise = require("q").Promise;

var questionModel = mongoose.model("QuestionModel", questionSchema);

require("../models.server");

questionModel.createQuestion = createQuestion;
// questionModel.findQuestionByExternalId = findQuestionByExternalId;
questionModel.findQuestionById = findQuestionById;
questionModel.updateQuestion = updateQuestion;
questionModel.deleteQuestion = deleteQuestion;
// questionModel.addPage = addPage;
// questionModel.removePage = removePage;
// questionModel.addLike = addLike;
// questionModel.removeLike = removeLike;

module.exports = questionModel;

function createQuestion(question) {
    return questionModel.create(question);
}

function findQuestionById(questionId) {
    return questionModel.findById(questionId)
}

function updateQuestion(questionId, question) {
    delete question.dateCreated;
    return questionModel.update({_id: questionId}, {$set: question});
}

function deleteQuestion(gameId) {
   return questionModel.remove({_id: gameId});
}

// function findQuestionByExternalId(externalId) {
//
//     return questionModel.findOne({"externalId": externalId});
// }

// function addPage(gameId, pageId) {
//     return questionModel.findById(gameId)
//         .then(function (game) {
//             game.pages.push(pageId);
//             return game.save();
//         })
// }

// function removePage(gameId, pageId) {
//     return questionModel.findById(gameId)
//         .then(function (game) {
//             var index = game.pages.indexOf(pageId);
//             game.pages.splice(index, 1);
//             return game.save();
//         })
// }

// function addLike(gameId, userId) {
//     return questionModel.findById(gameId)
//         .then(function (game) {
//             game.likes.push(userId);
//             return game.save();
//         })
// }
//
// function removeLike(gameId, userId) {
//     return questionModel.findById(gameId)
//         .then(function (game) {
//             var index = game.pages.indexOf(userId);
//             game.likes.splice(index, 1);
//             return game.save();
//         })
// }
