var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Database Connections (with "if/else" statement for Heroku connection)
var connection;

//Connection stuff for Heroku:
if(process.env.JAWSDB_URL) {
  connection - mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burger_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


// Routes
// ======================================================================
require("./routes/api-routes.js")(app); // NOTE: This doens't do anything yet....



// I wish I could move these things, but I don't know how. 
// ======================================================================
  
// DISPLAY BURGERS ---------- ---------- ---------- ---------- ---------- ---------- 
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers ;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
      
      //Seperates Burgers into arrays for "devoured" and "nonDevoured":
      var nonDevouredArr = [];
      var devouredArr = [];
      for (var i = 0; i < data.length; i++){
        if (data[i].devoured == 0){
          nonDevouredArr.push(data[i]);
        } else {
          devouredArr.push(data[i]);
        }
      }

      // Sends arrays to the handlebars file:
      res.render("index", { 
        burgersNonDevoured: nonDevouredArr,
        burgersDevoured: devouredArr 
      });
    });
  });



  // Create a new Burger ç ----------
  app.post("/api/burgers", function(req, res) {
    connection.query("INSERT INTO burgers (burgerType, devoured) VALUES (?, false)", [req.body.burger], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      // Send back the ID of the new Burger
      res.json({ id: result.insertId });
      console.log(`The ID is: ${ { id: result.insertId } }`);
    });
  });
  

  
  // Retrieve all Burgers ---------- ----------
  app.get("/api/burgers", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
      res.json(data);
    });
  });



// DEVOUR ---------- ----------
app.put("/api/burgers/:id",function (req, res){
  connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  })
});


// DELETE ---------- ----------
app.delete("/api/burgers/:id",function (req, res){
  connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  })
});




// This should be SYNC:
// ======================================================================
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
