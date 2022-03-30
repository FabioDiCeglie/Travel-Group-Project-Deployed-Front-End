import { Avatar, Rating } from "@mui/material";
import "./style.css";
const ReviewCard = (props) => {
  const { description, rating, user } = props.review;
  return (
    <div className="ReviewsCards">
      <div style={{ marginTop: 5, marginLeft: 10 }}>
        <Avatar alt="Remy Sharp" src={user.image} />
      </div>
      <div>
        <p style={{ color: "black", marginTop: 4, marginLeft: 10 }}>
          Review: {description}
        </p>
      </div>
      <div>
        <Rating
          style={{ marginLeft: 10 }}
          name="read-only"
          value={rating}
          readOnly
        />
      </div>
    </div>
  );
};

export default ReviewCard;
