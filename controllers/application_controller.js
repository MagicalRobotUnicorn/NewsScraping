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


router.get("/", function(req, res){
    const handleObject = sections;

    res.render("allSections", {handleObject});
});

// router.get("/section/:route", function(req, res){
//     const route = `${req.params.route}`;
//     console.log('https://api.nytimes.com/svc/topstories/v2/' + '.json?api-key=' + nytimes.key);
//     axios({
//         method: 'get',
//         url: 'https://api.nytimes.com/svc/topstories/v2/' + route + '.json?api-key=' + nytimes.key,
//       }).then((response) => {
//         let cheerioObject = $(response);
//         cheerioObject = $(cheerioObject).results;

//         console.log(cheerioObject);

//       });
// });

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

router.get("/oneSection", function(req, res){
    const handleObject = oneSection;

    res.render("allArticlesInSection", {layout: 'allArticlesInSectionLayout', handleObject : handleObject});
});

module.exports = router;

// var singleObject = sampleObject.results[0];

// // console.log(singleObject);

// var Headline =  singleObject.title;

// var Author = singleObject.byline;

// var Summary = singleObject.abstract;

// var URL = singleObject.url;

// var LargeThumb = singleObject.multimedia[1].url;

// var projectObject = {
//   Headline,
//   Author,
//   Summary,
//   URL,
//   LargeThumb
// }

// console.log (projectObject);

// * Feel free to add more content to your database (photos, bylines, and so on).
