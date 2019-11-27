const mongoose = require("mongoose");


const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    imageAddress: String,
    headline: String,
    byline: String,
    summary: String,
    articleId: String
});

module.exports = mongoose.model('Article', articleSchema);