const express = require("express");
const path = require("path");
const fs = require("fs");
// Helper method for generating unique ids
const uuid = require('./utils/uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
  // Inform the client
  res.json(`${req.method} request received to retrieve notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to retrieve notes`);
});

app.post("/api/notes", (req, res) => {

});

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
);