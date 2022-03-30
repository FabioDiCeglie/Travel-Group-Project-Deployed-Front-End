import axios from "axios";
import { apiUrl } from "../../config/constants";

const getExperiences = (data) => ({
  type: "app/experiencePage",
  payload: data,
});

export function fetchExperiences() {
  return async function (dispatch, getState) {
    try {
      const response = await axios.get(apiUrl + "/experience");
      //console.log("what is response", response.data);

      dispatch(getExperiences(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
}
