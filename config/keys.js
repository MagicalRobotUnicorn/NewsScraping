console.log("This is loaded");
const dotenv = require("dotenv").config();

module.exports = {
    key: process.env.NYTIMES_KEY
}