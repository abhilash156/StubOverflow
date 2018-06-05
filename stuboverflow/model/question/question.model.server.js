var mongoose = require("mongoose");
var questionSchema = require("./question.schema.server");
mongoose.Promise = require("q").Promise;

var questionModel = mongoose.model("QuestionModel", questionSchema);

require("../models.server");

questionModel.createQuestion = createQuestion;
// questionModel.findQuestionByExternalId = findQuestionByExternalId;
questionModel.getAllQuestions = getAllQuestions;
questionModel.findQuestionById = findQuestionById;
questionModel.updateQuestion = updateQuestion;
questionModel.deleteQuestion = deleteQuestion;
questionModel.getTopQuestions = getTopQuestions;
questionModel.addComment = addComment;
questionModel.addUserAnswer = addUserAnswer;

module.exports = questionModel;

function createQuestion(question) {
    return questionModel.create(question);
}

function getAllQuestions() {
    return questionModel.find();
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

function getTopQuestions() {
    return questionModel.find();
}

// function findQuestionByExternalId(externalId) {
//
//     return questionModel.findOne({"externalId": externalId});
// }

function addComment(questionId, commented) {
    return questionModel.findById(questionId)
        .then(function (question) {
            question.comment.push(commented);
            return question.save();
        })
}

function addUserAnswer(questionId, answer) {
    return questionModel.findById(questionId)
        .then(function (question) {
            question.comment.push(answer);
            return question.save();
        })
}

