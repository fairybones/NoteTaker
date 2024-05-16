// Import necessary packages/modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Assign db.json file data to variable
let notesData = require("./db/db.json");

// Initialize application
const app = express();

// Middleware to serve static files from 'public'
app.use(express.static("public"));
// Middleware for parsing json
app.use(express.json());

// Import function for generating unique IDs
const uuid = require("./db/uuid.js");

// HTML routes

// GET /notes returns notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// GET * returns index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API routes

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} parsing notes now`);
  // return all saved notes as json
  return res.status(200).json(notesData);
});

// post should save new note to the req body, add it to db.json file, then return new note
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  let response;
  // prepare response object if body & title exists
  if (req.body && req.body.title) {
    response = {
      title: req.body.title,
      text: req.body.text,
      // each note should have a unique ID for reference
      id: uuid(),
    };
  }
  notesData.push(response);
  // update db.json file
  fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
    // handle any errors in saving note
    if (err) {
      console.error("Error saving note:", err);
      return res.status(400).json({ error: "Title is required" });
    } else {
      console.log("New note added successfully!");
      return res.status(200).json(notesData);
    }
  });
});

// Delete route
app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  notesData = notesData.filter((note) => note.id != req.params.id);
  // update db.json
  fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
    // handle any errors in saving note
    if (err) {
      console.error("Error saving note:", err);
      return res.status(400).json({ error: "Title is required" });
    } else {
      console.log("New note added successfully!");
      return res.status(200).json(notesData);
    }
  });
});

// Declare port app will listen @
const PORT = 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
