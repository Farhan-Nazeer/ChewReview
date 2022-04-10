import axios from "axios";

const createReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("/api/reviews/", reviewData, config);

  return response.data;
};

const getReviews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/reviews/", config);

  return response.data;
};

const deleteReview = async (reviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete("/api/reviews/" + reviewId, config);

  return response.data;
};

const updateReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    "/api/reviews/" + reviewData.id,
    reviewData,
    config
  );

  return response.data;
};

const reviewService = {
  createReview,
  getReviews,
  deleteReview,
  updateReview,
};

export default reviewService;
