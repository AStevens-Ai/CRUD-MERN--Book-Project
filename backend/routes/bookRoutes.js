import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// route to add new book to database
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// root to get all books in database

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
  }
});

// Route to get one book by id in database

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
  }
});

// route to update existing book by id

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book Successfully updated" });
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

//route to delete book by existing id

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
