/**
 * error
 */
import request from "./request";

const error = data => {
  console.log("error", data);
  request(data);
};

export default error;
