import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRandomCity } from "../../store/randomCity/actions";
import "./style.css";
const Wheel = (props) => {
  const [name, setName] = useState("circle");
  const disptach = useDispatch();
  const startRotation = () => {
    setName("circle start-rotate");
    disptach(getRandomCity());
    setTimeout(() => {
      setName("circle start-rotate stop-rotate");
      props.handleShow();
    }, Math.floor(Math.random() * 10000) + 1);
  };
  return (
    <div>
      <div className="arrow"></div>
      <ul className={name}>
        <li>
          <div className="text">1</div>
        </li>
        <li>
          <div className="text">2</div>
        </li>
        <li>
          <div className="text">3</div>
        </li>
        <li>
          <div className="text">4</div>
        </li>
        <li>
          <div className="text">5</div>
        </li>
        <li>
          <div className="text">6</div>
        </li>
        <li>
          <div className="text">7</div>
        </li>
        <li>
          <div className="text">8</div>
        </li>
        <li>
          <div className="text">9</div>
        </li>
        <li>
          <div className="text">10</div>
        </li>
        <li>
          <div className="text">11</div>
        </li>
        <li>
          <div className="text">12</div>
        </li>
      </ul>
      <button className="spin-button" onClick={startRotation}>
        SPIN
      </button>
    </div>
  );
};

export default Wheel;
