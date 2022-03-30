import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/randomCity/actions";

const ReviewForm = (props) => {
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const dispatch = useDispatch();
  const submitReview = () => {
    dispatch(postReview(description, rate));
    props.setShow(false);
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ marginLeft: 50, marginTop: 50, marginBottom: 50 }}
      >
        <p style={{ color: "white" }}>Description</p>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ backgroundColor: "white", borderRadius: 10, width: 300 }}
        />
        <p style={{ color: "white" }}>Rating:</p>
        <TextField
          id="outlined-number"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          InputProps={{ inputProps: { min: 0, max: 5 } }}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ backgroundColor: "white", borderRadius: 10, width: 100 }}
        />
        <Button variant="contained" onClick={submitReview}>
          Post
        </Button>
      </Box>
    </div>
  );
};

export default ReviewForm;
