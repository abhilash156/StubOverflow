var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
mongoose.Promise = require("q").Promise;

var userModel = mongoose.model("UserModel", userSchema);

require("../models.server");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addQuestion = addQuestion;
userModel.addUpvote = addUpvote;
userModel.removeQuestion = removeQuestion;
userModel.removeUpvote = removeUpvote;
userModel.addFollow = addFollow;
userModel.removeFollow = removeFollow;
userModel.getAllUsers = getAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.searchUsers = searchUsers;
userModel.removeAnsweredQuestions = removeAnsweredQuestions;
userModel.upsertAnsweredQuestions = upsertAnsweredQuestions;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function addQuestion(userId, questionId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.askedQuestions.push(questionId);
            return user.save();
        })
}

function removeQuestion(userId, questionId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.askedQuestions.indexOf(questionId);
            user.askedQuestions.splice(index, 1);
            return user.save();
        });
}

function removeAnsweredQuestions(userId, questionId) {
    return userModel.findById(userId)
        .then(function (user) {
            var answeredQuestions = user.answeredQuestions;
            var index = -1;
            for (var i = 0; i < answeredQuestions.length; i++) {
                if (answeredQuestions[i]._question == questionId) {
                    index = i;
                    break;
                }
            }
            user.answeredQuestions.splice(index, 1);
            return user.save();
        });
}

function upsertAnsweredQuestions(userId, updatedAnsweredQuestions) {
    return userModel.findById(userId)
        .then(function (user) {
            var answeredQuestions = user.answeredQuestions;
            var index = -1;
            for (var i = 0; i < answeredQuestions.length; i++) {
                if (answeredQuestions[i]._question == updatedAnsweredQuestions._question) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                user.answeredQuestions.push(updatedAnsweredQuestions);
            } else {
                user.answeredQuestions[index] = updatedAnsweredQuestions;
            }
            return user.save();
        });
}

function addUpvote(userId, questionId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.upvoted.push(questionId);
            return user.save();
        })
}

function removeUpvote(userId, questionId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.upvotedQuestions.indexOf(questionId);
            user.upvotedQuestions.splice(index, 1);
            return user.save();
        })
}

function addFollow(userId, userId2) {
    userModel.findById(userId2)
        .then(function (user) {
            user.followers.push(userId);
            user.save();
        });

    return userModel.findById(userId)
        .then(function (user) {
            user.following.push(userId2);
            return user.save();
        });
}

function removeFollow(userId, userId2) {
    userModel.findById(userId2)
        .then(function (user) {
            var index = user.followers.indexOf(userId);
            user.followers.splice(index, 1);
            user.save();
        });

    return userModel.findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(userId2);
            user.following.splice(index, 1);
            return user.save();
        });
}

function findUserById(userId) {

    return userModel.findById(userId);
}

function findUserByGoogleId(googleId) {

    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {

    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByUsername(username) {

    return userModel.findOne({"username": username});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({"username": username, "password": password});
}

function updateUser(userId, user) {

    delete user.username;
    delete user.dateCreated;
    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {

    return userModel.remove({_id: userId});
}

function getAllUsers() {

    return userModel.find();
}

function searchUsers(searchTerm) {
    searchTerm = new RegExp(["^", searchTerm, "$"].join(""), "i");
    var searchArray = [
        {"username": searchTerm},
        {"firstName": searchTerm},
        {"lastName": searchTerm},
        {"email": searchTerm}];
    return userModel.find().or(searchArray);
}