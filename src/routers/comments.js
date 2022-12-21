const express = require("express");
const route = express.Router();

const commentController = require("../app/controller/commentController");

route.get("/:slug", commentController.index);
route.post("/add-comment", commentController.addComment);

module.exports = route;
