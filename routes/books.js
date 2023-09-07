const path = require("path");
const express = require("express");

const fileManipulation = require("../util/fileManipulation");
const rootDir = require("../util/path");

const filePath = path.join(rootDir, "data", "books.json");

const router = express.Router();

const books = [];

const checkData = (req, res, next) => {
  const checkFile = fileManipulation.ensureFileExists(filePath);
  checkFile
    .then(() => {
      next();
    })
    .catch(() => {
      console.log("Error processing Data file: " + filePath);
      res.status(500).send("Error creating Data File!");
      return;
    });
};

const readData = (req, res, next) => {
  const readBooks = fileManipulation.readThisFile(filePath);
  readBooks
    .then((data) => {
      books.length = 0;
      books.push(...JSON.parse(data));
    })
    .catch(() => {
      books.length = 0;
      console.log("Error reading Data file!");
    })
    .finally(() => {
      next();
    });
};

// Middleware for handling incoming requests and adding item to list
const addBookToList = (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send("Name is required!");
    res.end();
    return;
  }
  if (books.length === 0) {
    books.push({ id: 0, name: name });
  } else {
    const lastIndex = books[books.length - 1].id;
    books.push({ id: lastIndex + 1, name: req.body.name });
  }
  next();
};

// Middleware for writing data into file
const writeData = (req, res, next) => {
  const jsonData = JSON.stringify(books, 2);
  const writeData = fileManipulation.writeToFile(filePath, jsonData);
  writeData
    .then(() => {
      next();
    })
    .catch((error) => {
      console.log("Error writing Data file: " + filePath);
      res.status(500).send("Error writing Data!");
      return;
    });
};


// /books --> GET --> return html file containing a list of books
router.get("/books", [readData], (req, res, next) => {
  // res.json({ result : books});
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
    // res.json(book);
    res.render("book", { pageTitle: `${book.name}`, bookObj: book });
  } else {
    res.status(404).render("404", { pageTitle: "Page not found" });
  }
});

// /books --> POST --> handles book details and add the book details to the list of books
router.get("/add-book", (req, res, next) => {
  res.render("add-book", { pageTitle: "Add Book", path: "/add-book" });
});

router.post(
  "/books",
  [checkData, readData, addBookToList, writeData],
  (req, res, next) => {
    res.send("Operation successful");
  }
);

exports.routes = router;
exports.books = books;
