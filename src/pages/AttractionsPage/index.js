import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttractions } from "../../store/randomCity/actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { selectAttractions } from "../../store/randomCity/selector";

import "./style.css";
import GoBackButton from "../../components/GoBackButton";
export default function AttractionsPage() {
  //dispatch
  const dispatch = useDispatch();

  const attractions = useSelector(selectAttractions);

  useEffect(() => {
    dispatch(fetchAttractions());
  }, [dispatch]);

  const filterAttractions = attractions?.filter((attraction) => {
    return attraction.name && attraction.location_string && attraction.image;
  });

  console.log("what is filter", filterAttractions);

  return attractions && attractions.length > 1 ? (
    <div>
      <GoBackButton page="Details Page" />
      <div>
        <h1 style={{ color: "white", textAlign: "center", marginTop: 10 }}>
          Attractions
        </h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filterAttractions?.map((attraction) => (
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
              alt={attraction.name}
              height="140"
              image={attraction.image.images.original.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {attraction.name}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                <strong>Location:</strong>
                {attraction.location_string}
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
