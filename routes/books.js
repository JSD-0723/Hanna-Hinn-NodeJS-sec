const express = require("express");

const router = express.Router();

const books = [];

// /books --> GET --> return html file containing a list of books
router.get("/books", (req, res, next) => {
  res.render("list-books", {
    bookList: books,
    pageTitle: "Shop",
    path: "/books",
  });
});

// /books/:id --> GET --> return html file containing a book
router.get("/books/:id", (req, res, next) => {
  const book = { id: 0, name: "Book1" };
  res.render("book", { pageTitle: `${book.name}`, bookObj: book });
});

// /books --> POST --> handles book details and add the book details to the list of books
router.get("/add-book", (req, res, next) => {
  res.render("add-book", { pageTitle: "Add Book", path: "/add-book" });
});

router.post("/books", (req, res, next) => {
  console.log(req.body);
  books.push({ id: 0, name: req.body.title });
  res.redirect("/books");
});

exports.routes = router;
exports.books = books;
