import Request from "Utils/request";
import API from "Utils/api";
import { Session as Storage } from "Utils/storage";
export const MENUS = "MENUS";

import { menuConfig } from "./menu.js";
/**
 * get menu
 */
export const menuAction = () => async dispatch => {
  console.log("menu");
  //   let response = await Request({
  //     url: API.common.menu,
  //     method: "POST"
  //   });

  //   if (response.status) {
  dispatch({ type: MENUS, data: menuConfig });
  Storage.set("menus", menuConfig);
  //   }
};
