import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview, updateReview } from "../features/reviews/reviewSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
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
              id="outlined-basic"
              label="Restaurant Name"
              className="edit-restaurant"
              variant="outlined"
              name="restaurant"
              value={updatedReview.restaurant}
              onChange={handleChange}
              placeholder="i.e Red Lobster"
              required
              size="small"
            />
            <TextField
              type="number"
              id="outlined-basic"
              className="edit-rating"
              label="Rating"
              variant="outlined"
              name="rating"
              value={updatedReview.rating}
              onChange={handleChange}
              placeholder="i.e 8.5"
              required
              size="small"
            />
          </div>
          <div className="review-row-details">
            <TextField
              id="outlined-basic"
              label="Restaurant Location"
              className="edit-location"
              fullWidth
              variant="outlined"
              name="location"
              value={updatedReview.location}
              onChange={handleChange}
              placeholder="i.e 4120 Yonge St."
              required
              size="small"
            />
          </div>
          <div className="review-row-content">
            <TextField
              multiline
              rows={4}
              fullWidth
              id="outlined-basic"
              label="Enter your review here"
              variant="outlined"
              name="content"
              value={updatedReview.content}
              onChange={handleChange}
              required
              size="small"
            />
          </div>
          <div className="review-row-food-specs">
            <FormControl>
              <InputLabel id="diet-label" className="edit-food-specs">
                Diet
              </InputLabel>
              <Select
                labelId="diet-label"
                id="outlined-basic"
                className="select-dropdown edit-food-specs"
                label="Diet"
                variant="outlined"
                name="diet"
                value={updatedReview.diet}
                onChange={handleChange}
                required
                size="small"
              >
                <MenuItem value="None">None</MenuItem>
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
                labelId="typeOfFood-label"
                id="outlined-basic"
                label="Type of Food"
                className="select-dropdown edit-food-specs"
                variant="outlined"
                name="typeOfFood"
                value={updatedReview.typeOfFood}
                onChange={handleChange}
                placeholder="Type of Food"
                required
                size="small"
              >
                {foodTypes.map((food) => (
                  <MenuItem value={food}>{food}</MenuItem>
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
            variant="contained"
            color="error"
            fullWidth
            className="close-button"
            onClick={() => setIsUpdated(false)}
          >
            Close
          </Button>
        </div>
      ) : (
        <div className="review">
          <img
            className="img-responsive"
            src={require(`../images/${props.review.typeOfFood}.jpg`)}
            alt="food"
          />

          <div className="review-row-header">
            <h3>{props.review.restaurant}</h3>
            <h3>
              <StarBorderIcon sx={{ color: "red" }} id="star-icon" />{" "}
              {props.review.rating.$numberDecimal}/10{" "}
            </h3>
          </div>
          <div className="review-row-details">
            <p>{displayDate}</p>
            <p>{props.review.location}</p>
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
              size="small"
              startIcon={<DeleteForeverIcon />}
              color="error"
              onClick={() => dispatch(deleteReview(props.review._id))}
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
