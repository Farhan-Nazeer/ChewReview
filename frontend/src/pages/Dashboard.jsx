import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import ReviewItem from "../components/ReviewItem";
import { getReviews, reset } from "../features/reviews/reviewSlice";

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

    dispatch(getReviews());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}!</h1>
        <p>Reviews Dashboard</p>
      </section>

      <ReviewForm />
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
