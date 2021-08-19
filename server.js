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

app.get("/", (req, res) => {

});

app.get("/notes", (req, res) => {

});

app.get("/api/notes", (req, res) => {

});

app.post("/api/notes", (req, res) => {

});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));