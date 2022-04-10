import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function SuggestionItem(props) {
  const date = new Date(props.review.createdAt);
  const displayDate = date.toString().substring(4, 15);

  return (
    <div>
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
          <MoreHorizIcon />
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;
