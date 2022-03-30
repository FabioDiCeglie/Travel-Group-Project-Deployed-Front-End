const initialState = {
  favouriteCities: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "addFavourite":
      return { ...state, favouriteCities: action.payload.favourites };
    case "addOneFavourite":
      return {
        ...state,
        favouriteCities: [...state.favouriteCities, action.payload.city_id],
      };
    case "removeOneFavourite":
      const index = state.favouriteCities.indexOf(action.payload.city_id);
      let favouritesCopy = [...state.favouriteCities];
      favouritesCopy.splice(index, 1);
      return {
        ...state,
        favouriteCities: favouritesCopy,
      };
    default:
      return state;
  }
}
