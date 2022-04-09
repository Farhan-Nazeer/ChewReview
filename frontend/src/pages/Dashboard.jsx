import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import ReviewItem from "../components/ReviewItem";
import { reset, getReviewsReversed } from "../features/reviews/reviewSlice";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Slide from "@mui/material/Slide";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getReviewsReversed());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <CircularProgress className="loading-spinner" />;
  }

  return (
    <>
      {/* <p className="greeting">Hello, {user && user.name}!</p> */}

      <ReviewForm />
      <h1 className="dashboard-title">{user && user.name}'s Dashboard</h1>
      <div className="search-narrowers">
        <SearchBar />
        <Filter />
      </div>

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        {reviews.length > 0 ? (
          <div className="reviews-container">
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <h3>You do not have any reviews</h3>
        )}
      </Slide>
    </>
  );
}

export default Dashboard;
