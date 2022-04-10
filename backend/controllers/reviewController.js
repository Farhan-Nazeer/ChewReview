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
  const review = await Review.create({
    user: req.user.id,
    restaurant: req.body.restaurant,
    rating: req.body.rating,
    content: req.body.content,
    location: req.body.location,
    diet: req.body.diet,
    typeOfFood: req.body.typeOfFood,
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
      restaurant: req.body.restaurant,
      rating: req.body.rating,
      content: req.body.content,
      location: req.body.location,
      diet: req.body.diet,
      typeOfFood: req.body.typeOfFood,
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
