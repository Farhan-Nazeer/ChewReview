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
import Grow from "@mui/material/Grow";
import SpeedDial from "@mui/material/SpeedDial";

function ReviewForm() {
  const [review, setReview] = useState({
    restaurant: "",
    rating: "",
    content: "",
    location: "",
    diet: "No special diet",
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
      diet: "No special diet",
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

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    setIsClicked(true);
  }

  return (
    <div className="form-container">
      <div className="review-form">
        {!isClicked ? (
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            icon={<DriveFileRenameOutlineIcon />}
            className="write-review-button"
            onClick={handleClick}
          ></SpeedDial>
        ) : (
          <Grow in={isClicked} {...(isClicked ? { timeout: 500 } : {})}>
            <form onSubmit={handleSubmit}>
              <div className="top-row">
                <p className="add-review-text">Add a ChewReview</p>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={() => setIsClicked(false)}
                >
                  Close
                </Button>
              </div>
              <div className="form-top-row">
                <TextField
                  label="Eatery Name"
                  name="restaurant"
                  onChange={handleChange}
                  placeholder="i.e Red Lobster"
                  variant="outlined"
                  value={review.restaurant}
                  required
                />
                <TextField
                  label="Rating"
                  name="rating"
                  onChange={handleChange}
                  placeholder="i.e 8.5"
                  type="number"
                  variant="outlined"
                  value={review.rating}
                  required
                />
                <FormControl>
                  <InputLabel id="diet-label">Diet</InputLabel>
                  <Select
                    className="select-dropdown"
                    labelId="diet-label"
                    label="Diet"
                    name="diet"
                    onChange={handleChange}
                    variant="outlined"
                    value={review.diet}
                    required
                  >
                    <MenuItem value="No special diet">No special diet</MenuItem>
                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="Vegan">Vegan</MenuItem>
                    <MenuItem value="Halal">Halal</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                label="Enter your review here"
                name="content"
                onChange={handleChange}
                variant="outlined"
                value={review.content}
                rows={4}
                fullWidth
                multiline
                required
              />
              <div className="form-bottom-row">
                <FormControl>
                  <InputLabel id="typeOfFood-label">Type Of Food</InputLabel>
                  <Select
                    className="select-dropdown"
                    label="Type of Food"
                    labelId="typeOfFood-label"
                    name="typeOfFood"
                    onChange={handleChange}
                    variant="outlined"
                    value={review.typeOfFood}
                    placeholder="Type of Food"
                    required
                  >
                    {foodTypes.map((food) => (
                      <MenuItem key={food} value={food}>
                        {food}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Restaurant Location"
                  name="location"
                  onChange={handleChange}
                  placeholder="i.e 4120 Yonge St."
                  variant="outlined"
                  value={review.location}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="review-submit-button"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Grow>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
