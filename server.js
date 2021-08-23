const express = require("express");
const path = require("path");
const { generateRandomId, readAndAppend, readFromFile } = require("./utils/utils");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// HTML route to index.html
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// HTML route to notes.html
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
    // Retrieve notes JSON
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));

    // Log GET request to terminal
    console.info(`${req.method} request received to retrieve notes`);
});

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
            id: generateRandomId(),
        }

        // Add new note to db.json
        readAndAppend(newNote, "./db/db.json");

        // Log POST request status to terminal
        console.log(`Success! New note "${newNote.title}" posted.`);
        res.json(newNote);
    } else {
        res.json("Error in posting note");
    }
});

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
);