import { useSelector, useDispatch } from "react-redux";
import { getReviews, getReviewsReversed, getReviewsHighestRated, getReviewsLowestRated } from "../features/reviews/reviewSlice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function Filter() {
  const dispatch = useDispatch();

  const { filter } = useSelector((state) => state.reviews);

  const handleChange = (e) => {
    const { value } = e.target;

    switch (value) {
      case "new":
        dispatch(getReviewsReversed());
        break;
      case "old":
        dispatch(getReviews());
        break;
      case "high":
        dispatch(getReviewsHighestRated());
        break;
      case "low":
        dispatch(getReviewsLowestRated());
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="diet-label">Filter</InputLabel>
        <Select
          labelId="diet-label"
          className="select-dropdown"
          label="Filter"
          variant="outlined"
          name="filter"
          value={filter}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="new">Newest</MenuItem>
          <MenuItem value="old">Oldest</MenuItem>
          <MenuItem value="high">Highest Rated</MenuItem>
          <MenuItem value="low">Lowest Rated</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
