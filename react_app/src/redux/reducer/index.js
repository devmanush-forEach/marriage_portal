import { combineReducers } from "redux";
import applicationsReducer from "./applications.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  applications: applicationsReducer,
});

export default rootReducer;
