/**
 * Reducer
 */
import { combineReducers } from "redux";

// import demoReducer from "./demoReducer";
import loginReducer from "../containers/Login/reducer";
import mainReducer from "../containers/Main/reducer";

const rootReducer = combineReducers({
  loginReducer,
  mainReducer
});

export default rootReducer;
