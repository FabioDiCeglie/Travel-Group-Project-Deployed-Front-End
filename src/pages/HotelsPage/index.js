import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../store/randomCity/actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { selectHotels } from "../../store/randomCity/selector";

import "./style.css";
import GoBackButton from "../../components/GoBackButton";
export default function HotelsPage() {
  const dispatch = useDispatch();

  const hotels = useSelector(selectHotels);

  console.log("what is hotels", hotels);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const filterHotels = hotels?.filter((hotel) => {
    return hotel.photo && hotel.name && hotel.location_string && hotel.rating;
  });

  console.log("what is filter", filterHotels);

  return hotels && hotels.length > 1 ? (
    <div>
      <GoBackButton page="Details Page" />
      <div>
        <h1 style={{ color: "white", textAlign: "center", marginTop: 10 }}>
          Hotels
        </h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filterHotels?.map((hotel) => (
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
              alt={hotel.name}
              height="140"
              image={hotel.photo.images.original.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hotel.name}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                <strong>Location:</strong>
                {hotel.location_string}
              </Typography>
              <Rating name="read-only" value={hotel.rating} readOnly />
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
