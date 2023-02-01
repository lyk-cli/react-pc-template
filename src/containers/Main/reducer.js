import { MENUS } from "./action";
import { Session as Storage } from "Utils/storage";
const initialState = {
  menus: Storage.get("menus") || []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MENUS:
      return Object.assign({}, state, { menus: [...action.data] });
    default:
      return state;
  }
};

export default reducer;
