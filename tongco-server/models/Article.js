const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    content: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);