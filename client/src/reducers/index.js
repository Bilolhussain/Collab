import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
// import updateUser from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  // update: updateReducer
});
