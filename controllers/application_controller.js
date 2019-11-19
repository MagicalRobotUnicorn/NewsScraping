// On NYT Route, find all categories
// On click of category, display results from Api

// Get and post routing for comments
// Both routes will take the address of the article as the table name

const express = require("express");
const router = express.Router();

const comment = require("../models/comment");
const sections = require("../public/assets/javascript/sectionData");
const oneSection = require("../public/assets/javascript/sample.js");


router.get("/", function(req, res){
    const handleObject = sections;

    res.render("allSections", {handleObject});
});

router.get("/oneSection", function(req, res){
    const handleObject = oneSection;

    res.render("allArticlesInSection", {layout: 'allArticlesInSectionLayout', handleObject : handleObject});
});

module.exports = router;