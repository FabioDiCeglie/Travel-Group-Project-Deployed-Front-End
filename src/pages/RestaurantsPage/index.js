import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../store/randomCity/actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { selectRestaurants } from "../../store/randomCity/selector";

import "./style.css";
import GoBackButton from "../../components/GoBackButton";

export default function RestaurantsPage() {
  //dispatch
  const dispatch = useDispatch();

  const restaurants = useSelector(selectRestaurants);

  console.log("what is restaurants", restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const filterRestaurants = restaurants?.filter((restaurant) => {
    return restaurant.photo && restaurant.name && restaurant.location_string;
  });

  console.log("what is filter", filterRestaurants);

  return filterRestaurants && filterRestaurants?.length > 1 ? (
    <div>
      <GoBackButton page="Details Page" />
      <div>
        <h1 style={{ color: "white", textAlign: "center", marginTop: 10 }}>
          Restaurants
        </h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filterRestaurants?.map((restaurant) => (
          <Card
            sx={{
              maxWidth: 345,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <CardMedia
              component="img"
              alt={restaurant.name}
              height="140"
              image={restaurant.photo.images.original.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {restaurant.name}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                <strong>Location:</strong>
                {restaurant.location_string}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div>
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}
