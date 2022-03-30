import axios from "axios";
import { apiUrl } from "../../config/constants";

export function addFavourites(favouriteList) {
  const action = {
    type: "addFavourite",
    payload: {
      favourites: favouriteList,
    },
  };
  return action;
}

export function addOneFavourite(city_id) {
  const action = {
    type: "addOneFavourite",
    payload: {
      city_id,
    },
  };
  return action;
}

export function removeOneFavourite(city_id) {
  const action = {
    type: "removeOneFavourite",
    payload: { city_id },
  };
  return action;
}

export function fetchFavouritesId() {
  return async function (dispatch, getState) {
    const token = getState().user.token;
    try {
      const response = await axios.get(apiUrl + "/cities/favourite/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const favourites = response.data.map((item) => item.city_id);
      dispatch(addFavourites(favourites));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function addNewFavourite(city_id) {
  return async function (dispatch, getState) {
    const token = getState().user.token;
    try {
      const response = await axios.post(
        apiUrl + "/auth/add/favourite",
        { city_id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addOneFavourite(response.data.city_id));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function removeFavourite(city_id) {
  return async function (dispatch, getState) {
    const token = getState().user.token;
    try {
      const response = await axios.delete(apiUrl + `/auth/del/favourite`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          city: city_id,
        },
      });
      dispatch(removeOneFavourite(parseInt(response.data)));
      dispatch();
    } catch (error) {
      console.log(error.message);
    }
  };
}
