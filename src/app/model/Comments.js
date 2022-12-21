const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    rating: { type: Number, required: true },
    content: { type: String },
    belongTo: { type: String },
    cmtForBook: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commnet", Comment);
