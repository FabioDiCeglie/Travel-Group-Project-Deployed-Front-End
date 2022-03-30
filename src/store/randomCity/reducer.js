import { RANDOM_CITY, REVIEWS } from "./actions";
const initialState = {
  randomCityInfo: null,

  reviews: null,

  services: {
    attractions: null,
    hotels: null,
    restaurants: null,
  },

  weather: null,

  numberOfFavourites: null,
};

//reducers for restaurants, hotels and attractions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RANDOM_CITY: {
      localStorage.setItem("lat", action.payload.lat);
      localStorage.setItem("lng", action.payload.lng);
      return {
        ...state,
        randomCityInfo: action.payload,
      };
    }
    case REVIEWS: {
      return {
        ...state,
        reviews: action.payload,
      };
    }
    case "setHotels":
      return {
        ...state,
        services: { ...state.services, hotels: action.payload.hotels },
      };
    case "setRestaurants":
      return {
        ...state,
        services: {
          ...state.services,
          restaurants: action.payload.restaurants,
        },
      };
    case "setAttractions":
      return {
        ...state,
        services: {
          ...state.services,
          attractions: action.payload.attractions,
        },
      };
    case "setNumberOfFavourite":
      return { ...state, numberOfFavourites: action.payload.numberOfFavourite };
    default: {
      return state;
    }
    case "detailspage/weather": {
      return {
        ...state,
        weather: action.payload,
      };
    }
  }
};

export default reducer;
