var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String},
    firstName: String,
    lastName: String,
    email: String,
    cover: String,
    userType: {type: String, enum: ['PLAYER', 'ADMIN'], default: "PLAYER"},
    askedQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel"}],
    answeredQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel"}],
    upvotedQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;
