import { useDispatch } from "react-redux";
import { deleteReview } from "../features/reviews/reviewSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ReviewItem(props) {
  const dispatch = useDispatch();

  const date = new Date(props.review.createdAt);
  const displayDate = date.toString().substring(4, 15);

  return (
    <div>
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
        <p>{props.review.content.length > 100 ? props.review.content.substring(0, 100) + "..." : props.review.content}</p>
        </div>
        <div className="review-row-food-specs">
          <p>{props.review.diet}</p>
          <p>{props.review.typeOfFood}</p>
        </div>
        <div className="review-row-actions">
           <Button size="small" startIcon={<EditIcon />}  onClick={() => dispatch(deleteReview(props.review._id))}>
             Edit
           </Button>

           <Button  size="small" startIcon={<DeleteForeverIcon />} color="error" onClick={() => dispatch(deleteReview(props.review._id))}>
             Delete
           </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
