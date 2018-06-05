/**
 * Created by harsh on 8/13/2017.
 */

var app = require("../../express");
var answerModel = require("../model/answer/answer.model.server");

// http handlers:
app.get("/api/answer/:answerId", findAnswerById);
app.get("/api/answer/post/:postId", findAnswersForPost);
app.get("/api/answer/user/:userId", findAnswersForUser);
app.post("/api/answer", createAnswer);
app.get("/api/answer", findAnswerByCredentials);
app.put("/api/answer/:answerId", updateAnswer);
app.delete("/api/answer/:answerId", deleteAnswer);

function createAnswer(req, res) {
    var answer = req.body;
    answerModel.createAnswer(answer)
        .then(function (answer) {
            res.json(answer);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findAnswerByCredentials(req, res) {

    var userId = req.query.userId;
    var postId = req.query.postId;

    if (userId && postId) {
        answerModel.findAnswerByCredentials(userId, postId)
            .then(function (answer) {
                res.json(answer);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
}

function findAnswerById(req, res) {
    answerModel.findAnswerById(req.params.answerId)
        .then(function (answer) {
            res.json(answer);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findAnswersForPost(req, res) {
    answerModel.findAnswersForPost(req.params.postId)
        .then(function (answers) {
            res.json(answers);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findAnswersForUser(req, res) {
    answerModel.findAnswersForUser(req.params.userId)
        .then(function (answers) {
            res.json(answers);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateAnswer(req, res) {
    var answer = req.body;
    var answerId = req.params.answerId;
    answerModel.updateAnswer(answerId, answer)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}

function deleteAnswer(req, res) {
    var answerId = req.params.answerId;
    answerModel.deleteAnswer(answerId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}

