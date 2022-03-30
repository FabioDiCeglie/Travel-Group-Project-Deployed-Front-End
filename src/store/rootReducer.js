import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import randomCity from "./randomCity/reducer";
import favourite from "./favourite/reducer";
import experienceReducer from "./experience/reducer";

export default combineReducers({
  appState,
  user,
  randomCity,
  favourite,
  experiences: experienceReducer,
});
