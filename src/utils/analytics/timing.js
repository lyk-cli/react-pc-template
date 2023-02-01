/**
 * timer
 * window.performance.timing
 */

import request from "./request";

function timing() {
  console.log("page load time", window.performance.timing);
  const timmer = window.performance.timing.toJSON();
  request(timmer);
}

export default timing();
