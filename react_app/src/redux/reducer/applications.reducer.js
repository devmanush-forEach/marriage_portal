import { actionTypes } from "../actions/applications.actions";
const initialState = { applications: null };

const applicationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_APPLICATIONS:
      return { ...state, applications: payload };

    default:
      return state;
  }
};

export default applicationsReducer;
