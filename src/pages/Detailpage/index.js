import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchNumberOfFavourite,
  fetchWeather,
  getCity,
} from "../../store/randomCity/actions";
import {
  selectNumberOfFavourites,
  selectRandomCity,
  selectWeather,
} from "../../store/randomCity/selector";
import Review from "../../components/Reviews";
import { hasToken } from "../../store/user/selectors";
import {
  addNewFavourite,
  fetchFavouritesId,
  removeFavourite,
} from "../../store/favourite/actions";
import { selectFavourites } from "../../store/favourite/selectors";
import Button from "@mui/material/Button";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HotelIcon from "@mui/icons-material/Hotel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import sunny from "./sunny.png";
import raining from "./raining.png";
import cloudy from "./cloudy.png";
import "./style.css";

export const Detailpage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const city = useSelector(selectRandomCity);
  const token = useSelector(hasToken);
  const favourites = useSelector(selectFavourites);
  const weather = useSelector(selectWeather);
  const heart_color = favourites
    ? favourites.includes(parseInt(id))
      ? "red"
      : ""
    : "";
  const cityFavourites = useSelector(selectNumberOfFavourites);

  useEffect(() => {
    dispatch(getCity(id));
    dispatch(fetchFavouritesId());
    dispatch(fetchNumberOfFavourite(id));
    dispatch(fetchWeather());
  }, [dispatch, id]);

  const handleFavourite = (city_id) => {
    if (favourites.includes(parseInt(city_id))) {
      dispatch(removeFavourite(city_id));
    } else {
      dispatch(addNewFavourite(city_id));
    }
  };

  console.log("weatherrrrrr", weather);

  return !city || !cityFavourites || !weather ? (
    <></>
  ) : (
    <div style={{ margin: "10px", color: "white", marginBottom: 100 }}>
      <h1
        style={{
          textAlign: "center",
          marginTop: 50,
          marginBottom: 50,
          marginLeft: 50,
        }}
      >
        {city.location}
      </h1>

      {cityFavourites > 0 ? (
        <p style={{ textAlign: "left" }}>
          {cityFavourites} person(s) would like to go there....
        </p>
      ) : (
        <></>
      )}

      <div style={{ display: "flex" }}>
        <img
          src={city.pictures[0].image}
          alt={city.location}
          style={{ marginLeft: 50, width: 300 }}
        />

        <p style={{ width: 400, marginLeft: 300 }}>{city.description}</p>
        <div>
          {token ? (
            <Button
              variant="contained"
              onClick={() => handleFavourite(id)}
              style={{ marginLeft: 120, marginTop: 100 }}
              startIcon={<FavoriteIcon style={{ color: heart_color }} />}
            >
              I want to go!
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${city.lat}%2C${city.lng}`}
          target="_blank"
          rel={"noreferrer"}
        >
          <img
            src="https://cdn.ndtv.com/tech/images/google_maps_android_logo.jpg"
            alt="link-to-google-maps"
            width={"100px"}
            style={{ background: "black", borderRadius: "100%", width: 50 }}
          />
        </a>
        <Review id={id} />

        <div className="Buttons">
          <Link to={`/detail/${id}/restaurants`}>
            <Button startIcon={<RamenDiningIcon />} variant="contained">
              Restaurants
            </Button>
          </Link>
        </div>
        <div className="Buttons">
          <Link to={`/detail/${id}/hotels`}>
            <Button startIcon={<HotelIcon />} variant="contained" href="/">
              Hotels
            </Button>
          </Link>
        </div>
        <div className="Buttons">
          <Link to={`/detail/${id}/attractions`}>
            <Button
              startIcon={<AttractionsIcon />}
              variant="contained"
              href="/"
            >
              Attractions
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <h1 style={{ marginLeft: 400 }}>Weather:🌤</h1>
      </div>
      <div className="ImagesCity">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: 50,
          }}
        >
          {weather?.forecasts?.map((weath) => {
            if (weath.text.includes("Sunny")) {
              return (
                <div className="WeatherCard">
                  <img
                    src={sunny}
                    alt="sunny"
                    style={{ width: 40, marginLeft: 5 }}
                  />
                  <p style={{ color: "white" }}>Day: {weath.day}</p>
                  <p style={{ color: "white" }}>Condition: {weath.text}</p>
                  <p style={{ color: "white" }}>
                    High: {Math.floor(weath.high - (32 / 9) * 5)}°
                  </p>
                  <p style={{ color: "white" }}>
                    Low: {Math.floor(weath.low - (32 / 9) * 5)}°
                  </p>
                </div>
              );
            } else if (weath.text.includes("Cloudy")) {
              return (
                <div className="WeatherCard">
                  <img
                    src={cloudy}
                    alt="sunny"
                    style={{ width: 40, marginLeft: 5 }}
                  />
                  <p style={{ color: "white" }}>Day: {weath.day}</p>
                  <p style={{ color: "white" }}>Condition: {weath.text}</p>
                  <p style={{ color: "white" }}>
                    High: {Math.floor(weath.high - (32 / 9) * 5)}°
                  </p>
                  <p style={{ color: "white" }}>
                    Low: {Math.floor(weath.low - (32 / 9) * 5)}°
                  </p>
                </div>
              );
            } else if (
              weath.text.includes("Rain") ||
              weath.text.includes("Scattered")
            ) {
              return (
                <div className="WeatherCard">
                  <img
                    src={raining}
                    alt="sunny"
                    style={{ width: 40, marginLeft: 5 }}
                  />
                  <p style={{ color: "white" }}>Day: {weath.day}</p>
                  <p style={{ color: "white" }}>Condition: {weath.text}</p>
                  <p style={{ color: "white" }}>
                    High: {Math.floor(weath.high - (32 / 9) * 5)}°
                  </p>
                  <p style={{ color: "white" }}>
                    Low: {Math.floor(weath.low - (32 / 9) * 5)}°
                  </p>
                </div>
              );
            }
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: 100,
          }}
        >
          {city?.pictures?.map((item, index) => (
            <img
              key={index}
              src={`${item.image}`}
              alt="Images"
              style={{ width: 300, height: 200, margin: 10 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detailpage;
