import { combineReducers } from "redux";
import authReducer from "./authReducer";
import statsReducer from "./statsReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  stats: statsReducer
});
