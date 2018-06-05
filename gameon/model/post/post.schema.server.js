var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    question: String,
    viewsCount: String,
    answersCount: String,
    _creator: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "post"});

module.exports = postSchema;