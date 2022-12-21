const express = require("express");
const route = express.Router();

const userController = require("../app/controller/userController");

route.get("/", userController.index);
route.post("/login", userController.login);
route.post("/register", userController.register);

module.exports = route;
