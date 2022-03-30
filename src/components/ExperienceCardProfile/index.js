import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { removeExperience } from "../../store/user/actions";

export default function ExperienceCardProfile(props) {
  const { id, location, description, image } = props.favouriteExperience;

  const dispatch = useDispatch();

  return (
    <div>
      <Card
        sx={{ maxWidth: 345, marginLeft: 10, marginTop: 10, marginBottom: 5 }}
      >
        <CardMedia component="img" alt={location} height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Descriptions:</strong> {description}
          </Typography>
        </CardContent>
        <Button
          style={{ textDecoration: "none", marginLeft: 300, width: 1 }}
          onClick={() => dispatch(removeExperience(id))}
        >
          <ClearIcon style={{ color: "grey" }} />
        </Button>
      </Card>
    </div>
  );
}
