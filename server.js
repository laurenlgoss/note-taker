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



app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));