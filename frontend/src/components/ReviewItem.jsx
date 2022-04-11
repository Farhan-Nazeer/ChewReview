import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReview, updateReview } from "../features/reviews/reviewSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import foodTypes from "../data/foodTypes";

function ReviewItem(props) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedReview, setUpdatedReview] = useState({
    id: props.review._id,
    restaurant: props.review.restaurant,
    rating: props.review.rating.$numberDecimal,
    content: props.review.content,
    location: props.review.location,
    diet: props.review.diet,
    typeOfFood: props.review.typeOfFood,
  });

  const dispatch = useDispatch();

  const date = new Date(props.review.createdAt);
  const displayDate = date.toString().substring(4, 15);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    const result = window.confirm(
      "Clicking OK will permanently delete this review"
    );
    if (result) {
      dispatch(deleteReview(props.review._id));
    }
  };

  return (
    <div>
      {isUpdated ? (
        <div className="edit-review">
          <img
            className="img-responsive"
            src={require(`../images/${props.review.typeOfFood}.jpg`)}
            alt="food"
          />
          <div className="review-row-header">
            <TextField
              className="edit-restaurant"
              label="Eatery Name"
              inputProps={{
                maxLength: 40,
              }}
              name="restaurant"
              onChange={handleChange}
              placeholder="i.e Red Lobster"
              size="small"
              variant="outlined"
              value={updatedReview.restaurant}
              required
            />
            <TextField
              className="edit-rating"
              label="Rating"
              name="rating"
              onChange={handleChange}
              placeholder="i.e 8.5"
              size="small"
              type="number"
              variant="outlined"
              value={updatedReview.rating}
              required
            />
          </div>
          <div className="review-row-details">
            <TextField
              className="edit-location"
              label="Restaurant Location"
              inputProps={{
                maxLength: 40,
              }}
              name="location"
              onChange={handleChange}
              placeholder="i.e 4120 Yonge St."
              size="small"
              variant="outlined"
              value={updatedReview.location}
              fullWidth
              required
            />
          </div>
          <div className="review-row-content">
            <TextField
              label="Enter your review here"
              inputProps={{
                maxLength: 500,
              }}
              name="content"
              onChange={handleChange}
              rows={4}
              size="small"
              variant="outlined"
              value={updatedReview.content}
              fullWidth
              multiline
              required
            />
          </div>
          <div className="review-row-food-specs">
            <FormControl>
              <InputLabel id="diet-label" className="edit-food-specs">
                Diet
              </InputLabel>
              <Select
                className="select-dropdown edit-food-specs"
                labelId="diet-label"
                label="Diet"
                name="diet"
                onChange={handleChange}
                size="small"
                variant="outlined"
                value={updatedReview.diet}
                required
              >
                <MenuItem value="No special diet">No special diet</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Halal">Halal</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="typeOfFood-label" className="edit-food-specs">
                Type Of Food
              </InputLabel>
              <Select
                className="select-dropdown edit-food-specs"
                labelId="typeOfFood-label"
                label="Type of Food"
                name="typeOfFood"
                onChange={handleChange}
                placeholder="Type of Food"
                size="small"
                variant="outlined"
                value={updatedReview.typeOfFood}
                required
              >
                {foodTypes.map((food) => (
                  <MenuItem key={food} value={food}>
                    {food}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={() => dispatch(updateReview(updatedReview))}
          >
            Update
          </Button>
          <Button
            className="close-button"
            color="error"
            onClick={() => setIsUpdated(false)}
            variant="contained"
            fullWidth
          >
            Close
          </Button>
        </div>
      ) : (
        <div className="review">
          <Link to={`/details/${props.review._id}`}>
            <img
              className="img-responsive"
              src={require(`../images/${props.review.typeOfFood}.jpg`)}
              alt="food"
            />
          </Link>

          <div className="review-row-header">
            <h3>{props.review.restaurant}</h3>
            <h3>
              <StarBorderIcon sx={{ color: "red" }} id="star-icon" />{" "}
              {props.review.rating.$numberDecimal}/10{" "}
            </h3>
          </div>
          <div className="review-row-details">
            <p>
              <CalendarMonthIcon
                fontSize="small"
                color="action"
                className="card-icons"
              />{" "}
              {displayDate}
            </p>
            <p>
              <LocationOnIcon
                fontSize="small"
                color="action"
                className="card-icons"
              />{" "}
              {props.review.location}
            </p>
          </div>
          <div className="review-row-content">
            <p>
              {props.review.content.length > 100
                ? props.review.content.substring(0, 100) + "..."
                : props.review.content}
            </p>
          </div>
          <div className="review-row-food-specs">
            <p>{props.review.diet}</p>
            <p>{props.review.typeOfFood}</p>
          </div>
          <div className="review-row-actions">
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => setIsUpdated(true)}
            >
              Edit
            </Button>
            <Button
              color="error"
              size="small"
              startIcon={<DeleteForeverIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewItem;
