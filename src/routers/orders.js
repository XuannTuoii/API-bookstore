const express = require("express");
const route = express.Router();

const orderController = require("../app/controller/orderController");

route.get("/:slug", orderController.index);
route.post("/add-order", orderController.addOrder);
route.delete("/delete-order", orderController.deleteOrder);

module.exports = route;
