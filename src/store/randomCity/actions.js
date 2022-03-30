import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../user/selectors";
import { showMessageWithTimeout } from "../appState/actions";

export const RANDOM_CITY = "RANDOM_CITY";
export const REVIEWS = "REVIEWS";

export const randomCity = (data) => {
  return {
    type: RANDOM_CITY,
    payload: data,
  };
};

//hotels actions
export const setHotels = (hotels) => ({
  type: "setHotels",
  payload: {
    hotels,
  },
});

// restaurants action
export const setRestaurants = (restaurants) => ({
  type: "setRestaurants",
  payload: {
    restaurants,
  },
});

//attractions action
export const setAttractions = (attractions) => ({
  type: "setAttractions",
  payload: {
    attractions,
  },
});

//TODO: set the number of favourites of a city in the store
export const setNumberOfFavourite = (numberOfFavourite) => {
  const action = {
    type: "setNumberOfFavourite",
    payload: {
      numberOfFavourite,
    },
  };
  return action;
};

export const getWeather = (data) => {
  return {
    type: "detailspage/weather",
    payload: data,
  };
};

export const getRandomCity = () => {
  return async function (disptach, getState) {
    try {
      const response = await axios.get(`${apiUrl}/cities/random`);
      disptach(randomCity(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCity = (city_id) => async (dispatch, getState) => {
  try {
    console.log("whaaaaat", city_id);
    const response = await axios.get(`${apiUrl}/cities/details/${city_id}`);
    dispatch(randomCity(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

const reviews = (data) => {
  return {
    type: REVIEWS,
    payload: data,
  };
};

export const getReviews = (id) => {
  return async function (dispatch, getState) {
    try {
      const token = getState().user.token;
      const response = await axios.get(`${apiUrl}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("respone from reviews", response.data);
      dispatch(reviews(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const postReview = (description, rate) => {
  return async function (dispatch, getState) {
    const token = selectToken(getState());
    const { id } = getState().randomCity.randomCityInfo;
    try {
      const response = await axios.post(
        `${apiUrl}/reviews`,
        {
          description,
          rating: rate,
          cityId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from reviews", response);
      dispatch(getReviews(id));
      dispatch(
        showMessageWithTimeout("success", false, "Your review is created!")
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//TODO: fetch the number of favourites a CITY has
export const fetchNumberOfFavourite =
  (city_id) => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        apiUrl + `/cities/favourite/${city_id}/count`
      );
      dispatch(setNumberOfFavourite(response.data.numberOfFavourite));
    } catch (error) {
      console.log(error.message);
    }
  };

//finish fetch hotels
export const fetchHotels = (lat, lng) => async (dispatch, getState) => {
  try {
    // const cityInformation = getState().randomCity.randomCityInfo;
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");
    // const { lat, lng } = cityInformation;
    const response = await axios.get(apiUrl + `/cities/services/hotels`, {
      params: {
        lat,
        lng,
      },
    });
    const hotels = response.data;
    console.log(hotels);
    dispatch(setHotels(hotels));
  } catch (error) {
    console.log(error.message);
  }
};

// fetch restaurants
export const fetchRestaurants = (lat, lng) => async (dispatch, getState) => {
  try {
    // const cityInformation = getState().randomCity.randomCityInfo;
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");
    // const { lat, lng } = cityInformation;
    const response = await axios.get(apiUrl + `/cities/services/restaurants`, {
      params: {
        lat,
        lng,
      },
    });
    console.log("what is restaurants", response.data);
    const restaurants = response.data;
    dispatch(setRestaurants(restaurants));
  } catch (error) {
    console.log(error.message);
  }
};

// fetch attractions
export const fetchAttractions = (lat, lng) => async (dispatch, getState) => {
  try {
    // const cityInformation = getState().randomCity.randomCityInfo;
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");
    // const { lat, lng } = cityInformation;
    const response = await axios.get(apiUrl + `/cities/services/attractions`, {
      params: {
        lat,
        lng,
      },
    });
    const attractions = response.data;
    //console.log("what is attractions 1", attractions);
    dispatch(setAttractions(attractions));
  } catch (error) {
    console.log(error.message);
  }
};

//fetch weather
export const fetchWeather = (lat, lng) => async (dispatch, getState) => {
  try {
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    const response = await axios.get(apiUrl + `/cities/weather`, {
      params: {
        lat,
        lng,
      },
    });
    const weather = response.data;
    console.log(weather);
    dispatch(getWeather(weather));
  } catch (error) {
    console.log(error.message);
  }
};
