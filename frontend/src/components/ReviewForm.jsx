import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../features/reviews/reviewSlice";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import foodTypes from "../data/foodTypes";

function ReviewForm() {
  const [review, setReview] = useState({
    restaurant: "",
    rating: "",
    content: "",
    location: "",
    diet: "None",
    typeOfFood: "",
  });
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview(review));
    setReview({
      restaurant: "",
      rating: "",
      content: "",
      location: "",
      diet: "None",
      typeOfFood: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <div className="review-form">
        {!isClicked ? (
          <Button
            size="large"
            variant="outlined"
            className="write-review-button"
            startIcon={<DriveFileRenameOutlineIcon />}
            onClick={() => setIsClicked(true)}
          >
            Write a ChewReview...
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="top-row">
              <p className="add-review-text">Add a ChewReview</p>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                color="error"
                onClick={() => setIsClicked(false)}
              >
                Close
              </Button>
            </div>
            <div className="form-top-row">
              <TextField
                id="outlined-basic"
                label="Restaurant Name"
                variant="outlined"
                name="restaurant"
                value={review.restaurant}
                onChange={handleChange}
                placeholder="i.e Red Lobster"
                required
              />
              <TextField
                type="number"
                id="outlined-basic"
                label="Rating"
                variant="outlined"
                name="rating"
                value={review.rating}
                onChange={handleChange}
                placeholder="i.e 8.5"
                required
              />
              <FormControl>
                <InputLabel id="diet-label">Diet</InputLabel>
                <Select
                  labelId="diet-label"
                  id="outlined-basic"
                  className="select-dropdown"
                  label="Diet"
                  variant="outlined"
                  name="diet"
                  value={review.diet}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Halal">Halal</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="outlined-basic"
              label="Enter your review here"
              variant="outlined"
              name="content"
              value={review.content}
              onChange={handleChange}
              required
            />
            <div className="form-bottom-row">
              <FormControl>
                <InputLabel id="typeOfFood-label">Type Of Food</InputLabel>
                <Select
                  labelId="typeOfFood-label"
                  id="outlined-basic"
                  label="Type of Food"
                  className="select-dropdown"
                  variant="outlined"
                  name="typeOfFood"
                  value={review.typeOfFood}
                  onChange={handleChange}
                  placeholder="Type of Food"
                  required
                >
                  {foodTypes.map((food) => (
                    <MenuItem value={food}>{food}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Restaurant Location"
                variant="outlined"
                name="location"
                value={review.location}
                onChange={handleChange}
                placeholder="i.e 4120 Yonge St."
                required
              />
            </div>
            <Button type="submit" variant="contained" size="large" className="review-submit-button" fullWidth>
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
