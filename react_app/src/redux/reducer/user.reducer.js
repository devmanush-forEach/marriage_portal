import { actionTypes } from "../actions/user.actions";
const initialState = { user: null };

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER:
      return { ...state, user: payload };

    default:
      return state;
  }
};

export default userReducer;
