/**
 * config
 */

const config = {};

let BASE_API = "/web";
let BASE_PADAPI = "";
let BASE_SHOWAPI = "/";
if (
  BUILD_ENV === "int" ||
  BUILD_ENV === "sit" ||
  BUILD_ENV === "uat" ||
  BUILD_ENV === "prod"
) {
  BASE_API = "/web";
} else {
  BASE_API = "https://iagent-uat.metlife.com.cn/web";
  // BASE_API = "http://192.168.137.143:9082";
}

export { BASE_API, BASE_SHOWAPI, BASE_PADAPI };

export default config;
