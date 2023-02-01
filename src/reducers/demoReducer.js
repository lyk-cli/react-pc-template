import { ENTER_PAGE } from "../actions/demoAction";

const initialState = {
  // enterTIme: null,
  // page: ""
};

const demoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTER_PAGE:
      return Object.assign({}, state, { ...action.data });
    // case LEAVE_PAGE:
    //   return Object.assign({}, state, { ...action.data });
    default:
      return state;
  }
};

export default demoReducer;
