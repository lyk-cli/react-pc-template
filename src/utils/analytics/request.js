/**
 * use image to send message
 */

import { BASE_API } from "Config";

function request(data) {
  let args = "";
  // eslint-disable-next-line no-unused-vars
  for (const i in data) {
    args += `${i}=${encodeURIComponent(data[i])}&`;
  }

  const img = new Image(1, 1);
  img.src = BASE_API + "analytics/track?" + args;
}

export default request;
