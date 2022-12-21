const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: { type: String },
    bookId: { type: String },
    number: { type: Number },
    userName: { type: String },
    author: { type: String },
    bookSlug: { type: String },
    bookName: { type: String },
    email: { type: String },
    bookImg: { type: String },
    dateCreateOrder: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
