/**
 * login reducer
 */
import { LOGIN, LOGOUT } from "./action";
// import { Session as Storage } from "Utils/storage";

const initialState = {
  token: null,
  // userInfo: Storage.get("userInfo") || {}
  userInfo: {}
};

// console.log(initialState);

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { ...action.data });
    case LOGOUT:
      return Object.assign({}, state, { ...action.data });
    default:
      return state;
  }
};

export default loginReducer;
