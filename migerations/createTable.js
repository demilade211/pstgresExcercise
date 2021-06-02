const pool = require("./db");

pool.query("CREATE TABLE players(player_id SERIAL PRIMARY KEY, name VARCHAR(255), position VARCHAR(255),clubname VARCHAR(255), avatar VARCHAR(255))");