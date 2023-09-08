// Imports
const path = require("path");
const express = require("express");
const { check, validationResult } = require("express-validator");

// Local imports
const fileManipulation = require("../util/fileManipulation");
const rootDir = require("../util/path");

// file path to create or fetch books.json
const filePath = path.join(rootDir, "data", "books.json");

// Defining Router
const router = express.Router();

// List of Books
const books = [];

// Book validation
const bookValidation = [
  check("name", "name does not exist!").exists().isString().notEmpty(),
];

////////////////////////// Functions ///////////////////////////////////////////////

// Function to check if file exists if not create
const checkFile = (res) => {
  console.log("Checking File...");
  const checkFile = fileManipulation.ensureFileExists(filePath);
  checkFile.catch(() => {
    console.log("Error processing Data file: " + filePath);
    return;
  });
};

// function for handling incoming requests and adding item to list
const addBookToList = (name) => {
  console.log("Adding Book: " + name);
  if (books.length === 0) {
    books.push({ id: 0, name: name });
  } else {
    const lastIndex = books[books.length - 1].id;
    books.push({ id: lastIndex + 1, name: name });
  }
};

// function for writing data into file
const writeData = () => {
  console.log("Writing Data...");
  const jsonData = JSON.stringify(books, null, 2);
  const writeData = fileManipulation.writeToFile(filePath, jsonData);
  writeData.catch((error) => {
    console.log("Error writing Data file: " + filePath);
    return;
  });
};


////////////////////////// MiddleWare ///////////////////////////////////////////////

// Read the Data from the file then fill the list
// if the file doesn't exist then returns empty list
const readData = (req, res, next) => {
  console.log("Reading Data...");
  const readBooks = fileManipulation.readThisFile(filePath);
  readBooks
    .then((data) => {
      books.length = 0;
      books.push(...JSON.parse(data));
      console.log("Data loaded successfully");
    })
    .catch(() => {
      books.length = 0;
      console.log("Error reading Data file! returning empty list!");
    })
    .finally(() => {
      next();
    });
};

////////////////////////// Routes ///////////////////////////////////////////////

// /books --> GET --> return html file containing a list of books
router.get("/books", [readData], (req, res, next) => {
  res.render("list-books", {
    bookList: books,
    pageTitle: "Shop",
    path: "/books",
  });
});

// /books/:id --> GET --> return html file containing a book
router.get("/books/:id", [readData], (req, res, next) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  if (book) {
    res.render("book", { pageTitle: `${book.name}`, bookObj: book });
  } else {
    res.status(404).render("404", { pageTitle: "Page not found" });
  }
});

// GET /add-books --> return a html file with a form for adding a book
router.get("/add-book", (req, res, next) => {
  res.render("add-book", { pageTitle: "Add Book", path: "/add-book" });
});

// /books --> POST --> handles book details and add the book details to the list of books
router.post("/books", bookValidation, [readData], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Error happened when validating");
    res.status(400).send("Please enter a valid name!!!");
    return;
  }
  const name = req.body.name;
  checkFile(res);
  addBookToList(name);
  writeData(res);
  res.send("Operation successful");
});

// Exports
exports.routes = router;
