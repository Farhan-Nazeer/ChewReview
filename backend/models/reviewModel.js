const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    headline: {
      type: String,
      required: [true, "Please add a headline"],
    },
    rating: {
      type: mongoose.Decimal128,
      required: [true, "Please add a rating in the requested format"],
    },
    content: {
      type: String,
      required: [true, "Please add body content to your review"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    diet: {
      type: String,
      required: [true, "Please add a dietary restrictions"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
