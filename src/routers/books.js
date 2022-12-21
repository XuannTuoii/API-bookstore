const express = require("express");
const route = express.Router();

const bookController = require("../app/controller/bookController");
route.get("/:slug", bookController.getABook);
route.get("/", bookController.index);
route.post("/add-book", bookController.addBook);
route.put("/update-book/:slug", bookController.updateBook);
route.delete("/delete-book/:slug", bookController.deleteBook);
module.exports = route;
