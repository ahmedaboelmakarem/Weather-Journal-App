// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);

// get data
app.get("/getData", (req, res) => {
  res.send(projectData);
});

// post data
app.post("/sendData", (req, res) => {
  projectData = req.body;
  res.send({ message: "success sending data" });
});
