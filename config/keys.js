console.log("This is loaded");
const dotenv = require("dotenv").config();

module.exports = {
    key: process.env.NYTIMES_KEY,
    mongouser: process.env.MONGO_USER,
    mongopass: process.env.MONGO_PASS
}