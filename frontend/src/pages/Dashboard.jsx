import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import ReviewItem from "../components/ReviewItem";
import { getReviews, reset } from "../features/reviews/reviewSlice";
import CircularProgress from "@mui/material/CircularProgress";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getReviews());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleChangeSearchBar = (e) => {
    const { value } = e.target;
    setSearchBar(value);
  };

  const handlePress = (e) => {
    const { key } = e;
    if (key === "Enter"){
      submitSearch();
    }
  }

  const submitSearch = () => {
    console.log("hi");
  }

  if (isLoading) {
    return <CircularProgress className="loading-spinner" />;
  }

  return (
    <>
      {/* <p className="greeting">Hello, {user && user.name}!</p> */}

      <ReviewForm />
      <h2>Reviews Dashboard</h2>

      <div id="search-bar">
      <InputBase
        placeholder="Search ChewReviews..."
        value={searchBar}
        onChange={handleChangeSearchBar}
        onKeyDown={handlePress}
      />
      <IconButton onClick={submitSearch} sx={{ mb: 0.5, ml: 10 }}>
        <SearchIcon />
      </IconButton>
    </div>

      {reviews.length > 0 ? (
        <div className="reviews-container">
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <h3>You do not have any reviews</h3>
      )}
    </>
  );
}

export default Dashboard;
