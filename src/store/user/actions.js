import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const USERS_FAVOURITE = "USERS_FAVOURITE";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const usersFavourite = (data) => {
  return {
    type: USERS_FAVOURITE,
    payload: data,
  };
};
export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password, image) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
        image,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

//create an experience
export const createExperience = (location, description, image) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    try {
      const response = await axios.post(
        `${apiUrl}/auth/create/experience`,
        {
          location,
          description,
          image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("what is response", response);

      dispatch(showMessageWithTimeout("success", false, "Experience created"));
      dispatch(getUserWithStoredToken());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

//add favourites on user
export const addFavourites = (city_id) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    try {
      const response = await axios.post(
        `${apiUrl}/auth/add/favourite`,
        {
          city_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("what is response", response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

//remove favourite city user
export function removeFavourite(city_id) {
  return async function (dispatch, getState) {
    const token = getState().user.token;
    try {
      await axios.delete(apiUrl + `/auth/del/favourite`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          city: city_id,
        },
      });

      dispatch(getUserWithStoredToken());
    } catch (error) {
      console.log(error.message);
    }
  };
}

//remove experience city user
export function removeExperience(id) {
  return async function (dispatch, getState) {
    const token = getState().user.token;
    try {
      await axios.delete(apiUrl + `/auth/del/experience`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          booking: id,
        },
      });

      dispatch(getUserWithStoredToken());
    } catch (error) {
      console.log(error.message);
    }
  };
}

// get users with the same favorite city
export const getUsersFavorite = (id) => {
  return async function (dispatch, getState) {
    const token = getState().user.token;
    try {
      const response = await axios.get(`${apiUrl}/cities/favourite/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("users favourite", response.data);
      dispatch(usersFavourite(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
