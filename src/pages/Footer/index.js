import logo from "./plane.gif";
import { useSelector } from "react-redux";
import { selectRandomCity } from "../../store/randomCity/selector";
import "./style.css";
export default function Footer() {
  const location = window.location;
  const randomCity = useSelector(selectRandomCity);

  if (location.pathname === "/") return null;
  if (location.pathname === `/detail/${randomCity?.id}`) return null;

  return (
    <div className="Footer">
      <div style={{ color: "white" }}>
        <img src={logo} alt="plane" style={{ width: 100 }}></img>
      </div>
      <div style={{ marginLeft: 340 }}>
        <h1>✨✨✨✨</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center", color: "white" }}>
          Where should I go?
        </h1>
      </div>
      <div>
        <h1>✨✨✨✨</h1>
      </div>
      <div>
        {" "}
        <img
          src={logo}
          alt="plane"
          style={{ width: 100, marginLeft: 280 }}
        ></img>
      </div>
    </div>
  );
}
