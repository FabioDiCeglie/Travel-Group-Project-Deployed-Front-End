import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import { selectUser } from "../../store/user/selectors";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(selectUser);

  const logOutGoHome = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <Button onClick={() => dispatch(logOutGoHome)}>Logout</Button>
    </>
  );
}
