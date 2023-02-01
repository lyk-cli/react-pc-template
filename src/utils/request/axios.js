/**
 * axios
 */

const axios = require("axios");
import { Session as Storage } from "Utils/storage";
import { Toast } from "Components";

const instance = axios.create({
  //   baseURL: "https://some-domain.com/api/",
  timeout: 10000,
  headers: {
    version: 1,
    token: Storage.get("token") || "" // token
  }
});

const request = async ({
  url,
  method = "get",
  data = {}
  // headers = { "Content-Type": "application/json" },
  // loading = false,
  // timeout = 30000
}) => {
  const response = await instance({
    url,
    method,
    data
  });

  const responseData = { ...response.data };
  if (+responseData.code === 0) {
    responseData.state = true;
  } else {
    Toast.msg(responseData.msg);
  }
  return responseData;
};

export default request;
