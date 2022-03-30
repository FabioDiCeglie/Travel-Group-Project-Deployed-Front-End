import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { useSelector, useDispatch } from "react-redux";
import { selectReviews } from "../../store/randomCity/selector";
import { getReviews } from "../../store/randomCity/actions";

import StarIcon from "@mui/icons-material/Star";

const Review = (props) => {
  const [show, setShow] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();
  console.log("iddddd", props.id);
  console.log("reviewssss", reviews);
  useEffect(() => {
    dispatch(getReviews(parseInt(props.id)));
  }, [dispatch, props.id]);
  return (
    <div>
      {show ? <ReviewForm setShow={setShow} /> : null}
      <div style={{ display: "flex", marginLeft: 20 }}>
        <Button
          variant="contained"
          startIcon={<StarIcon />}
          onClick={() => setShowReview(!showReview)}
        >
          Show Reviews
        </Button>
        <Button
          variant="contained"
          style={{ marginLeft: 40 }}
          onClick={() => setShow(!show)}
          startIcon={<StarIcon />}
        >
          Create Review
        </Button>
        <br />
      </div>
      <div style={{ marginTop: 30 }}>
        {showReview ? (
          reviews.length > 0 ? (
            reviews.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })
          ) : (
            <p>No Reviews Yet :( </p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Review;
