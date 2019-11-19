console.log("This is loaded");
require("dotenv").config;

module.exports = {
    key: process.env.NYTIMES_KEY
}