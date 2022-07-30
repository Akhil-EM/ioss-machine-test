require("dotenv").config();
module.exports = {
    host:process.env.DB_HOST_NAME,
    user:process.env.DB_USERNAME,
    database:process.env.DATABASE,
    password:process.env.DB_PASSWORD}