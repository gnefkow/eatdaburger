USE kraxod5y1n9et1ib;
CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burgerType varchar(255) NOT NULL,
  devoured BOOLEAN,
  createdAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

