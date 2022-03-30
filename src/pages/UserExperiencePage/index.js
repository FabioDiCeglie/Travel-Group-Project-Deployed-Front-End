import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createExperience } from "../../store/user/actions";
import("./style.css");

export default function UserExperiencePage() {
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  const { id } = useParams();

  //selector
  const userProfile = useSelector(selectUser);

  //dispatch
  const dispatch = useDispatch();

  //navigate
  const navigate = useNavigate();

  const findCity = userProfile?.cities?.find(
    (city) => city.id === parseInt(id)
  );
  const [location, setLocation] = useState(findCity?.location);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "qmlqhgyk");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnjicmmbn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setImage(file.url); //put the url in local state, next step you can send it to the backend
  };
  console.log("what is image", image);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createExperience(location, description, image));
    navigate("/profile");
  }
  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center", marginTop: 40, color: "white" }}>
          Create your experience:
        </h2>
      </div>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
            color: "white",
          }}
        >
          We would like that you share with us your experience, please do it!
        </p>
      </div>
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{ marginLeft: 120, marginTop: 50 }}
        >
          <p style={{ color: "white" }}>Location:</p>
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ backgroundColor: "white", borderRadius: 10 }}
          />
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
          <br />
          <input type="file" onChange={uploadImage} />
          <div>
            <img
              src={
                image
                  ? image
                  : "https://clippingpathgreat.com/wp-content/uploads/2021/04/upload-files.jpg"
              }
              alt="Upload"
              style={{ width: 200 }}
            />
            {image ? (
              <p style={{ fontSize: 20, color: "white" }}>
                Succesfully uploaded!
              </p>
            ) : (
              ""
            )}
          </div>
          <Button
            variant="contained"
            style={{ width: 400 }}
            type="submit"
            onClick={handleSubmit}
          >
            Post your experience!
          </Button>
        </Box>
      </div>
    </div>
  );
}
