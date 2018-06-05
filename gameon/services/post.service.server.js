var app = require("../../express");

var postModel = require("../model/post/post.model.server");

app.post("/api/post", createPost);
app.get("/api/post/:postId", findPostById);
// app.get("/api/post", findPostByExternalId);
app.put("/api/post/:postId", updatePost);
app.delete("/api/post/:postId", deletePost);

function createPost(request, response) {
    var post = request.body;

    postModel.createPost(post)
        .then(function (newPost) {
            response.send(newPost);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function findPostById(request, response) {
    var postId = request.params.postId;

    postModel.findPostById(postId)
        .then(function (post) {
            response.send(post);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function updatePost(request, response) {
    var post = request.body;
    var postId = request.params.postId;

    postModel.updatePost(postId, post)
        .then(function () {
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function deletePost(request, response) {
    var postId = request.params.postId;

    postModel.deletePost(postId)
        .then(function () {
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

// function findPostByExternalId(request, response) {
//     var externalId = request.query.externalId;
//
//     postModel.findPostByExternalId(externalId)
//         .then(function (post) {
//             if (post === null) {
//                 response.sendStatus(204);
//             } else {
//                 response.json(post);
//             }
//         }, function (error) {
//             response.sendStatus(404).error(error);
//         });
// }