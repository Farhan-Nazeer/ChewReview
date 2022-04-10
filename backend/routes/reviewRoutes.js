const express = require("express");
const router = express.Router();
const {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getReviews).post(protect, setReview);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

// Add patch route

module.exports = router;
