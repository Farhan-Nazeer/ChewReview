const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");
const User = require("../models/userModel");

// GET: /api/reviews
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user.id });
  res.json(reviews);
});

// POST: /api/reviews
const setReview = asyncHandler(async (req, res) => {
  // Dont think this next bit is needed because front-end will have form validation, but that's technically true for everything
  // if (!req.body.text) {
  //   res.status(400);
  //   throw new Error("Please add a text field");
  // }

  const review = await Review.create({
    user: req.user.id,
    headline: req.body.headline,
    rating: req.body.rating,
    content: req.body.content,
    location: req.body.location,
    diet: req.body.diet,
  });

  res.json(review);
});

// PUT: /api/reviews/id
const updateReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(400);
    throw new Error("Review not found");
  }

  // Next code block seems useless, don't need to check user and don't need to query for user to use id again
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (review.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      headline: req.body.headline,
      rating: req.body.rating,
      content: req.body.content,
      location: req.body.location,
      diet: req.body.diet,
    },
    { new: true }
  );
  res.json(updatedReview);
});

// DELETE: /api/reviews/id
const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(400);
    throw new Error("Review not found");
  }

  // Next code block seem useless, don't need to check user and don't need to query for user to use id again
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (review.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Review.findByIdAndRemove(reviewId);

  res.json({ id: reviewId });
});

module.exports = {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
};
