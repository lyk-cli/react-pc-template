/**
 * login action
 */

import Request from "Utils/request";
import API from "Utils/api";
import { Session as Storage } from "Utils/storage";
export const LOGIN = "Login";
export const LOGOUT = "Logout";

export const loginAction = (data, callback) => async dispatch => {
  console.log("登录参数", data);
  //   let response = await Request({
  //     url: API.common.login,
  //     method: "post",
  //     data,
  //     headers: {}
  //   });
  let response = {
    code: "0",
    data: {
      id: "1183662961333968898",
      name: data.username,
      username: data.username,
      utoken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtZXRsaWZlIiwiZXhwIjoxNjQ5MzE3OTgyODY3LCJ0eXBlIjoiSU5TSURFIiwidXNlcklkIjoiMTE4MzY2Mjk2MTMzMzk2ODg5OCIsImlhdCI6MTY0OTIzMTU4Mjg2N30.bSpUDJ-NDEw9sSZSF5yR2N4v2ClVwD6zmr-YKF4DQVM"
    },
    msg: "成功"
  };
  response.status = true;
  if (response.status) {
    // if (response.data.isAdmin == "N") {
    dispatch({
      type: LOGIN,
      data: { token: response.data.utoken, userInfo: response.data.username }
    });
    Storage.set("token", response.data.utoken);
  }
  Storage.set("name", response.data.name);

  Storage.set("info", response.data);
  // Application.set("username", data.userName);
  callback && callback();
  // } else {
  //   Storage.clear();
  // }
};

export const logoutAction = () => async dispatch => {
  dispatch({
    type: LOGOUT,
    data: {
      token: null
    }
  });
  Storage.clear();
};
