const userRouter = require("./users");
const bookRouter = require("./books");
const orderRouter = require("./orders");
const commentRouter = require("./comments");

function route(app) {
  app.use("/v1/users", userRouter);
  app.use("/v1/books", bookRouter);
  app.use("/v1/comments", commentRouter);
  app.use("/v1/orders", orderRouter);
}

module.exports = route;
