const initialState = {
  Experiences: null,
};

export default function experienceReducer(state = initialState, action) {
  switch (action.type) {
    case "app/experiencePage":
      return {
        ...state,
        Experiences: action.payload,
      };
    default:
      return state;
  }
}
