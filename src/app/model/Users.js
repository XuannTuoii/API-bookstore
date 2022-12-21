const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, maxlength: 600 },
    role: { type: String },
  },
  {
    timestamps: true,
  }
);

// Add Plugin
mongoose.plugin(slug);

// Songs.plugin(mongooseDelete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });

module.exports = mongoose.model("User", User);
