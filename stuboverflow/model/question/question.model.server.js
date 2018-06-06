var mongoose = require("mongoose");
var questionSchema = require("./question.schema.server");
mongoose.Promise = require("q").Promise;

var questionModel = mongoose.model("QuestionModel", questionSchema);

require("../models.server");

questionModel.createQuestion = createQuestion;
questionModel.getAllQuestions = getAllQuestions;
questionModel.searchQuestions = searchQuestions;
questionModel.findQuestionById = findQuestionById;
questionModel.updateQuestion = updateQuestion;
questionModel.deleteQuestion = deleteQuestion;
questionModel.getTopQuestions = getTopQuestions;
questionModel.addComment = addComment;
questionModel.addUserAnswer = addUserAnswer;
questionModel.addTag = addTag;
questionModel.findQuestionsByTag = findQuestionsByTag;

module.exports = questionModel;

function createQuestion(question) {
    return questionModel.create(question);
}

function getAllQuestions() {
    return questionModel.find().populate('_user')
        .exec();
}

function findQuestionById(questionId) {
    return questionModel.findById(questionId).populate('_user')
        .exec();
}

function findQuestionsByTag(tagId) {
    return questionModel.find({tags: tagId}).populate('_user')
        .exec();
}

function updateQuestion(questionId, question) {
    delete question.dateCreated;
    return questionModel.update({_id: questionId}, {$set: question});
}

function deleteQuestion(questionId) {
    return questionModel.remove({_id: questionId});
}

function getTopQuestions() {
    return questionModel.find().populate('_user')
        .exec();
}

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

function addTag(questionId, tagId) {
    return questionModel.findById(questionId)
        .then(function (question) {
            question.tags.push(tagId);
            return question.save();
        })
}

function searchQuestions(searchTerm) {
    searchTerm = new RegExp(["^", searchTerm, "$"].join(""), "i");
    var searchArray = [
        {"title": searchTerm},
        {"tags": searchTerm}
    ];
    return questionModel.find().or(searchArray);
}

