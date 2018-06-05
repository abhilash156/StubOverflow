var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");
mongoose.Promise = require("q").Promise;

var postModel = mongoose.model("PostModel", postSchema);

require("../models.server");

postModel.createPost = createPost;
// postModel.findPostByExternalId = findPostByExternalId;
postModel.findPostById = findPostById;
postModel.updatePost = updatePost;
postModel.deletePost = deletePost;
// postModel.addPage = addPage;
// postModel.removePage = removePage;
// postModel.addLike = addLike;
// postModel.removeLike = removeLike;

module.exports = postModel;

function createPost(post) {
    return postModel.create(post);
}

function findPostById(postId) {
    return postModel.findById(postId)
}

function updatePost(postId, post) {
    delete post.dateCreated;
    return postModel.update({_id: postId}, {$set: post});
}

function deletePost(gameId) {
   return postModel.remove({_id: gameId});
}

// function findPostByExternalId(externalId) {
//
//     return postModel.findOne({"externalId": externalId});
// }

// function addPage(gameId, pageId) {
//     return postModel.findById(gameId)
//         .then(function (game) {
//             game.pages.push(pageId);
//             return game.save();
//         })
// }

// function removePage(gameId, pageId) {
//     return postModel.findById(gameId)
//         .then(function (game) {
//             var index = game.pages.indexOf(pageId);
//             game.pages.splice(index, 1);
//             return game.save();
//         })
// }

// function addLike(gameId, userId) {
//     return postModel.findById(gameId)
//         .then(function (game) {
//             game.likes.push(userId);
//             return game.save();
//         })
// }
//
// function removeLike(gameId, userId) {
//     return postModel.findById(gameId)
//         .then(function (game) {
//             var index = game.pages.indexOf(userId);
//             game.likes.splice(index, 1);
//             return game.save();
//         })
// }
