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

// HTML route to index.html
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// HTML route to notes.html
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
    // Inform the client
    res.json(`${req.method} request received to retrieve notes`);

    // Log GET request to terminal
    console.info(`${req.method} request received to retrieve notes`);
});

// Read data from file, append content
const readAndAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// Write content to JSON file
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// POST request for notes
app.post("/api/notes", (req, res) => {
    // Log POST request to terminal
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present,
    if (title && text) {
        // Create variable for new note with unique ID
        const newNote = {
            title,
            text,
            note_id: uuid(),
        }

        // Add note to db.json
        readAndAppend(newNote, "./db/db.json");

        console.log(`Success! New note "${newNote.title}" posted.`);
        res.json(newNote);
    } else {
        res.json("Error in posting note");
    }
});

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
);