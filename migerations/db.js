const {Pool} = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    port: 5432,
});

pool.connect();

module.exports = pool;