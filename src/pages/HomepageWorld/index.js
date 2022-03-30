import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import("./style.css");

export default function HomepageWorld() {
  const token = useSelector(selectToken);
  return (
    <div id="box">
      <div>
        {token ? (
          <Button
            style={{
              marginTop: 370,
              backgroundColor: "yellow",
              color: "black",
              width: 200,
            }}
            href="/game"
          >
            START YOUR GAME!
          </Button>
        ) : (
          <div>
            <h1
              style={{
                marginTop: 300,
                color: "white",
                width: 500,
              }}
            >
              For play the game you need to log in!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
