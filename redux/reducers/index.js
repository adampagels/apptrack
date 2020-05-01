import { combineReducers } from "redux";
import jobReducer from "./job";
import userReducer from "./user";

const rootReducer = combineReducers({
  jobReducer,
  userReducer,
});

export default rootReducer;
