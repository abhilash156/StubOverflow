var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    text: String,
    _user: {type: mongoose.Schema.Types.ObjectId,  ref: 'UserModel'},
    _post: {type: mongoose.Schema.Types.ObjectId, ref:'PostModel'},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "answer"});

module.exports = answerSchema;