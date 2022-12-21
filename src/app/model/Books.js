const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Book = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, maxlength: 600 },
    type: { type: String },
    pageCount: { type: Number },
    publishedDate: { type: String },
    description: { type: String },
    img_url: { type: String },
    public_id: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("Book", Book);
