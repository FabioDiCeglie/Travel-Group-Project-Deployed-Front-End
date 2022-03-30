import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFavourite } from "../../store/user/actions";
import { getUsersFavorite } from "../../store/user/actions";
import Modal from "react-bootstrap/Modal";
import { selectUser, selectUsersFavourite } from "../../store/user/selectors";
import "./style.css";

export default function FavouriteCardProfile(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const usersFavourite = useSelector(selectUsersFavourite);
  const userLoggedIn = useSelector(selectUser);
  console.log("usersss", userLoggedIn);
  const { id, location, description, restriction, pictures } =
    props.favouriteCities;

  const dispatch = useDispatch();
  const buttonFavourite = () => {
    dispatch(getUsersFavorite(id));
    handleOpen();
  };
  console.log("userss favouriteee", usersFavourite);

  const filterUser = usersFavourite?.filter(
    (user) => user?.user?.id !== userLoggedIn?.id
  );

  console.log("what is filter user", filterUser);

  return (
    <div>
      <Card
        sx={{ maxWidth: 345, marginLeft: 10, marginTop: 10, marginBottom: 5 }}
      >
        <CardMedia
          component="img"
          alt={location}
          height="140"
          image={pictures[0].image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Descriptions:</strong> {description}
            <br />
            <strong>Covid - 19 restrictions:</strong> {restriction}
          </Typography>
        </CardContent>
        <Link to={`/profile/experience/${id}`}>
          <Button style={{ marginLeft: 10, textDecoration: "none" }}>
            Upload Your Experience
          </Button>
        </Link>
        <Button
          style={{ marginLeft: 10, textDecoration: "none" }}
          onClick={buttonFavourite}
        >
          Contact other users!
        </Button>
        {show ? (
          <Modal onHide={handleClose} animation={false} show={show}>
            <Modal.Header closeButton>
              <Modal.Title>Users </Modal.Title>
            </Modal.Header>
            <div>
              {filterUser?.length > 0 ? (
                filterUser?.map(({ user }) => {
                  return (
                    <div key={user.id} className="UsersCards">
                      <Avatar
                        alt="User image"
                        src={user.image}
                        style={{ marginLeft: 10, marginTop: 8 }}
                      />
                      <Modal.Body style={{ marginLeft: 30 }}>
                        {" "}
                        Name: {user.name}
                      </Modal.Body>
                      <Modal.Body>Email: {user.email}</Modal.Body>
                    </div>
                  );
                })
              ) : (
                <div>
                  {" "}
                  <Modal.Body style={{ marginLeft: 30 }}>
                    {" "}
                    For now nobody like the city!
                  </Modal.Body>
                </div>
              )}
            </div>

            <Modal.Footer></Modal.Footer>
          </Modal>
        ) : null}
        <Button
          style={{ textDecoration: "none", marginLeft: 85, width: 1 }}
          onClick={() => dispatch(removeFavourite(id))}
        >
          <ClearIcon style={{ color: "grey" }} />
        </Button>
      </Card>
    </div>
  );
}
