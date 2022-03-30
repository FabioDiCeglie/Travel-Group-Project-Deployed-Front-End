import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import FavouriteCardProfile from "../../components/FavouriteCardProfile";
import ExperienceCardProfile from "../../components/ExperienceCardProfile";

import("./style.css");

export default function ProfilePage() {
  //selector
  const userProfile = useSelector(selectUser);

  //console.log
  console.log("what is user", userProfile);
  return (
    <div className="ProfilePage">
      <div>
        <h1 style={{ textAlign: "center", color: "white" }}>Profile page</h1>
      </div>
      <div className="ProfileBlock">
        <div>
          <img
            className="ProfileImage"
            src={userProfile.image}
            alt={userProfile.name}
            style={{ maxWidth: 300 }}
          />
        </div>
        <div className="InformationProfile">
          <p style={{ color: "white" }}>Name: {userProfile.name}</p>
          <p style={{ color: "white" }}>Email: {userProfile.email}</p>
        </div>
      </div>
      <div>
        <h1 style={{ textAlign: "center", marginTop: 40, color: "white" }}>
          My favourites cities:💖
        </h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {userProfile.cities
          ? userProfile?.cities.map((city) => (
              <FavouriteCardProfile favouriteCities={city} />
            ))
          : "Loading.."}
      </div>
      <div>
        <h1
          style={{
            textAlign: "center",
            marginTop: 40,
            color: "white",
            marginBottom: 20,
          }}
        >
          My experiences:🌎
        </h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {userProfile?.experiences
          ? userProfile?.experiences.map((experience) => (
              <ExperienceCardProfile favouriteExperience={experience} />
            ))
          : "Loaading"}
      </div>
    </div>
  );
}
