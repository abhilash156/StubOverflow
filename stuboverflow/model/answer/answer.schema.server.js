var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    text: String,
    _user: {type: mongoose.Schema.Types.ObjectId,  ref: 'UserModel'},
    _question: {type: mongoose.Schema.Types.ObjectId, ref:'QuestionModel'},
    dateCreated: {type: Date, default: Date.now},
    comments: [String]
}, {collection: "answer"});

module.exports = answerSchema;