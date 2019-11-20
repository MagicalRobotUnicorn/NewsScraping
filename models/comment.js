// poster
// the article id
// text


const orm = require("../config/org");
const axios = require("axios");

const comment = {
    axios({
        method: 'post',
        url: './api/comment',
        data: {
            poster: this.poster,
            articleId: this.id,
            text: this.text
        }
    }).then()
}

modules.exports = comment;