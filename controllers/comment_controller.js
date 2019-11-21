const express = require("express");
const router = express.Router();
const axios = require("axios");

const comment = require("../models/comment");


axios({
    method: 'post',
    url: './api/comment',
    data: {
        poster: this.poster,
        articleId: this.id,
        text: this.text
    }
}).then()

