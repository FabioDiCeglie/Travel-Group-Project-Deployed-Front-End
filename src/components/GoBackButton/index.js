import { useNavigate } from "react-router-dom";
import "./style.css";

export const GoBackButton = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="go_back" onClick={() => navigate(-1)}>
        Go back to {props.page}
      </div>
    </>
  );
};

export default GoBackButton;
