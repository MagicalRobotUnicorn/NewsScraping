console.log("This is loaded");
const keys = require("dotenv").config;

console.log(process.env.NYTIMES_KEY);

module.exports = {
    key: process.env.NYTIMES_KEY
}