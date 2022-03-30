export const selectRandomCity = (state) => state.randomCity.randomCityInfo;

export const selectReviews = (state) => state.randomCity.reviews;

export const selectHotels = (state) => state.randomCity.services.hotels;

export const selectRestaurants = (state) =>
  state.randomCity.services.restaurants;

export const selectAttractions = (state) =>
  state.randomCity.services.attractions;

export const selectNumberOfFavourites = (state) =>
  state.randomCity.numberOfFavourites;

export const selectWeather = (state) => state.randomCity.weather;
