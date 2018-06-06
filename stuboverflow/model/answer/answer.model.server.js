var mongoose = require('mongoose');
var answerSchema = require('./answer.schema.server');
var db = require("../models.server");

var answerModel = mongoose.model("AnswerModel", answerSchema);
answerModel.createAnswer = createAnswer;
answerModel.findAnswerById = findAnswerById;
answerModel.updateAnswer = updateAnswer;
answerModel.deleteAnswer = deleteAnswer;
answerModel.findAnswersForQuestion = findAnswersForQuestion;
answerModel.findAnswersForUser = findAnswersForUser;
answerModel.findAnswerByCredentials = findAnswerByCredentials;
module.exports = answerModel;

function createAnswer(answer) {
    return answerModel.create(answer);
}

function findAnswerById(id) {
    return answerModel.findById(id)
        .populate('_user')
        .exec();
}

function findAnswersForQuestion(questionId) {
    return answerModel.find({_question: questionId}).populate('_user')
        .exec();
}

function findAnswersForUser(userId) {
    return answerModel.find({_user: userId}).populate('_user')
        .exec();
}

function updateAnswer(answerId, newAnswer) {
    return answerModel.update({_id: answerId}, {$set: newAnswer});
}

function deleteAnswer(answerId) {
    return answerModel
        .findById(answerId)
        .then(function (answer) {
            return answerModel.remove({_id: answerId});
        });
}

function findAnswerByCredentials(userId, postId) {
    return answerModel.findOne({_user: userId, _post: postId});
}
