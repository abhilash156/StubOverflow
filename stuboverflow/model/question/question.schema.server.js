var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    title: String,
    description: String,
    viewsCount: String,
    answersCount: String,
    _creator: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    dateCreated: {type: Date, default: Date.now},
    comments: [String]
}, {collection: "question"});

module.exports = postSchema;