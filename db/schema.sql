/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Drops the movie_planner_db if it already exists --
DROP DATABASE IF EXISTS burger_db;

-- Create the database movie_planner_db and specified it for use.
CREATE DATABASE burger_db;

USE burger_db;

-- Create the table plans.
CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burgerType varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO burgers (burgerType) VALUES ('Black Bean Burger');
