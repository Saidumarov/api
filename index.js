const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4 } = require("uuid");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let books = [];

// Get all books
app.get("/books", (req, res) => {
  res.json({
    status: "OK",
    books,
  });
});

// Get a specific book
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((b) => b.id === id);

  if (book) {
    res.json({
      status: "OK",
      book,
    });
  } else {
    res.status(404).json({
      status: "Not Found",
      message: "Book not found",
    });
  }
});

// Add a new book
app.post("/books", (req, res) => {
  const { title, pages, author } = req.body;
  const newBook = {
    id: v4(),
    title,
    pages,
    author,
  };
  books.push(newBook);

  res.status(201).json({
    status: "Created",
    book: newBook,
  });
});

// Update a book
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, pages, author } = req.body;

  const idx = books.findIndex((b) => b.id === id);

  if (idx !== -1) {
    const updatedBook = {
      id: books[idx].id,
      title: title || books[idx].title,
      pages: pages || books[idx].pages,
      author: author || books[idx].author,
    };
    books[idx] = updatedBook;
    res.json({
      status: "OK",
      book: updatedBook,
    });
  } else {
    res.status(404).json({
      status: "Not Found",
      message: "Book not found",
    });
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  books = books.filter((b) => b.id !== id);
  res.json({
    status: "DELETED",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
