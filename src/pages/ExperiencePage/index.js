import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchExperiences } from "../../store/experience/actions";
import { selectExperiences } from "../../store/experience/selectors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./style.css";

export default function ExperiencePage() {
  const dispatch = useDispatch();

  const experience = useSelector(selectExperiences);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  //console.log("what is experience", experience);
  return (
    <div className="ExperiencePage">
      <div className="ExperiencePageTitle">
        <h1 style={{ color: "white", marginTop: 10 }}>Experiences:</h1>
      </div>
      <div style={{ display: "flex" }}>
        {experience
          ? experience?.map((exp) => (
              <div>
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
                    alt={exp.location}
                    height="140"
                    image={exp.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {exp.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Descriptions:</strong> {exp.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))
          : "Loading.."}
      </div>
    </div>
  );
}
