import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Timeline from "../components/TimelineGraphic";
import SuggestionItem from "../components/SuggestionItem";
import Fade from "@mui/material/Fade";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function ReviewDetails() {
  const params = useParams();

  const { reviews } = useSelector((state) => state.reviews);

  const [reviewToDisplay, setReviewToDisplay] = useState(reviews);
  const [similarReviews] = useState(reviews);

  useEffect(() => {
    window.scrollTo(0, 0);
    setReviewToDisplay((prevValue) =>
      prevValue.filter((review) => review._id === params.id)
    );
  }, [params.id]);

  return (
    <div className="form-container">
      {reviewToDisplay.length > 0 ? (
        <Fade in={true}>
          <div className="details-container">
            <div className="display-img-background">
              <img
                className="img-display"
                src={require(`../images/${reviewToDisplay[0].typeOfFood}.jpg`)}
                alt="food"
              />
            </div>
            <div className="review-body-content">
              <h1>
                {reviewToDisplay[0].restaurant}
              </h1>
              <Rating
                name="text-feedback"
                value={reviewToDisplay[0].rating.$numberDecimal / 2}
                readOnly
                precision={0.1}
                emptyIcon={<StarIcon fontSize="inherit" />}
              />
            <div className="details-timeline">
              <Timeline
                created={reviewToDisplay[0].createdAt}
                updated={reviewToDisplay[0].updatedAt}
              />
            </div>
              <div className="details-location">
                <Chip
                  icon={<RestaurantIcon />}
                  label={reviewToDisplay[0].typeOfFood}
                  color="primary"
                  variant="outlined"
                  size="large"
                  className="details-chip"
                />
                <Chip
                  icon={<LocationOnIcon />}
                  label={reviewToDisplay[0].location}
                  color="primary"
                  variant="outlined"
                  size="large"
                  className="details-chip"
                />
              </div>
              <div className="details-review">
                <h3>Review:</h3>
                <p>{reviewToDisplay[0].content}</p>
              </div>
            </div>
            <MoreHorizIcon fontSize="large" className="details-similar"/><MoreHorizIcon fontSize="large" className="details-similar"/>

            {similarReviews.length > 0 ? (
              <div className="review-body-content">
              <div className="details-review">
                <h2 className="details-similar">Similar eateries:</h2>
              </div>
              </div>
            ) : null}
            <div className="details-suggestion">
              {similarReviews.length > 0 ? (
                <div className="reviews-container-details">
                  {similarReviews.map((review) => (
                    review.typeOfFood === reviewToDisplay[0].typeOfFood && review._id !== reviewToDisplay[0]._id ? 
                    <SuggestionItem key={review._id} review={review} /> : null
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Fade>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default ReviewDetails;
