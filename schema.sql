-- Run this once:
DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;

-- VIEW IT --
USE burger_db;
SELECT * FROM burgers;

-- Creation is supposed to happen with Sequelize, so it is over there --


-- HERE IS SOME SEED STUFF --
INSERT INTO burgers (burgerName, state)
VALUES ("Seed Burger", "Ready");