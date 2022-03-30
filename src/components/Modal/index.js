import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addFavourites, removeFavourite } from "../../store/user/actions";
import "./style.css";
import { selectRandomCity } from "../../store/randomCity/selector";
const ModalCard = (props) => {
  const [like, setLike] = useState(false);
  const { show, handleClose } = props;
  const randomCity = useSelector(selectRandomCity);
  const navigate = useNavigate();
  const readMore = () => {
    navigate(`/detail/${randomCity.id}`);
  };

  const dispatch = useDispatch();

  const addFavourite = () => {
    if (like) {
      dispatch(removeFavourite(randomCity.id));
    } else {
      dispatch(addFavourites(randomCity.id));
    }
    setLike(!like);
  };
  return (
    <div>
      {show ? (
        <Modal show={randomCity && show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{randomCity.location}</Modal.Title>
          </Modal.Header>
          <Image src={randomCity.pictures[0]["image"]} />
          <Modal.Body>{randomCity.description}</Modal.Body>
          <Modal.Footer>
            <Button onClick={addFavourite}>
              <FavoriteIcon style={{ color: !like ? "grey" : "red" }} />
            </Button>
            <Button
              style={{ margin: "auto" }}
              variant="contained"
              onClick={readMore}
            >
              Read More
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
};

export default ModalCard;
