// poster
// the article id
// text

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: String,
    content: String,
    articleId: String
});

module.exports = mongoose.model('Comment', commentSchema);