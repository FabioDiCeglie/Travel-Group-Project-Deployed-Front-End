import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import Detailpage from "./pages/Detailpage";
import UserExperiencePage from "./pages/UserExperiencePage";
import HomepageWorld from "./pages/HomepageWorld";
import Footer from "./pages/Footer";
import ExperiencePage from "./pages/ExperiencePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import HotelsPage from "./pages/HotelsPage";
import AttractionsPage from "./pages/AttractionsPage";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/game" element={<Homepage />} />
        <Route exact path="/experience" element={<ExperiencePage />} />
        <Route exact path="/" element={<HomepageWorld />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile/experience/:id"
          element={<UserExperiencePage />}
        />
        <Route path="/detail/:id" element={<Detailpage />} />
        <Route path="/detail/:id/restaurants" element={<RestaurantsPage />} />
        <Route path="/detail/:id/hotels" element={<HotelsPage />} />
        <Route path="/detail/:id/attractions" element={<AttractionsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
