import { useState } from "react";
import StarsRain from "../../components/StarsRain";
import ModalCard from "../../components/Modal";
import Wheel from "../../components/Wheel";
import("./style.css");

export default function Homepage() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <div style={{ marginBottom: 100 }}>
      <div id="container">
        Make
        <div id="flip">
          <div>
            <div>Game</div>
          </div>
          <div>
            <div>Travel</div>
          </div>
          <div>
            <div>You</div>
          </div>
        </div>
        Awesome
      </div>

      <div id="container2">
        Make
        <div id="flip2">
          <div>
            <div>Game</div>
          </div>
          <div>
            <div>Travel</div>
          </div>
          <div>
            <div>You</div>
          </div>
        </div>
        Awesome
      </div>

      <div className="HomepageTitle">
        <h4 style={{ fontSize: 80, color: "white" }}>Where should I go?</h4>
      </div>
      {show ? <StarsRain /> : null}
      <div>
        <Wheel handleShow={handleShow} />
      </div>
      <div>
        <ModalCard show={show} handleClose={handleClose} />
      </div>
    </div>
  );
}
