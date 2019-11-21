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


    // axios({
    //     method: 'post',
    //     url: './api/comment',
    //     data: {
    //         poster: this.poster,
    //         articleId: this.id,
    //         text: this.text
    //     }
    // }).then()

module.exports = mongoose.model('Comment', commentSchema);