// On NYT Route, find all categories
// On click of category, display results from Api

// Get and post routing for comments
// Both routes will take the address of the article as the table name

const express = require("express");
const router = express.Router();
const axios = require("axios");
const $ = require("cheerio");

const sections = require("../public/assets/javascript/sectionData");
const nytimes = require("../config/keys");

const mongoose = require("mongoose");
const Comment = require('../models/comment');

router.get("/", function(req, res){
    const handleObject = sections;

    res.render("allSections", {handleObject});
});

router.get("/section/:route", function(req, res){
    const route = `${req.params.route}`;
    const key = nytimes.key;
    axios({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/' + route + '.json?api-key=' + key,
      }).then((response) => {
        let responseArray = [];
        for (let i = 0; i < response.data.results.length; i++){
            let individualResponse = {
            headline : response.data.results[i].title,
            author : response.data.results[i].byline,
            summary : response.data.results[i].abstract,
            url : response.data.results[i].url,
            thumb : response.data.results[i].multimedia[1].url
            }
            individualResponse.id = individualResponse.url.replace(/([:./])/g, '');
            responseArray.push(individualResponse);
        }
        res.render("allArticlesInSection", {layout: 'allArticlesInSectionLayout', handleObject : responseArray});
      }).catch(err => {
        console.log('error in section route is: ', err);
      })
  });

  router.get("/individualArticle/:articleId", function(req, res){
    let articleId = `${req.params.articleId}`;
    axios({
        method: 'get',
        url: '/api/' + articleId
  }).then((response) => {
    let responseArray = [];
    responseArray.push({
        articleId : articleId,
        articleObject: req.body.articleObject,
        comments : response
    });
    res.render("singleArticle", {layout: 'singleArticleLayout', handleObject : responseArray});
  }).catch(err => {
      console.log('error in article route is: ', err);
  });
});

router.post("/api/:article", function(req, res){
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        content: req.body.content,
        articleId: `${req.params.article}`
    });
    comment
    .save()
    .then(result => {
        console.log (result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: "Handling POST requests to /api/:article",
        createdComment: comment
    });
});

router.get("/api/:articleId", (req, res, next) => {
    const id = req.params.articleId;
    Comment.find({articleId: id})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
});
});

module.exports = router;
