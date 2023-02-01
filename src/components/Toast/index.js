/**
 * toast
 */
import { message } from "antd";

// export default (message, type, duration = 1) => {
//   switch (type) {
//     case "fail":
//       Toast.fail(message, duration);
//       break;
//     case "sucess":
//       Toast.success(message, duration);
//       break;
//     default:
//       Toast.info(message, duration);
//       break;
//   }
// };

message.config({
  top: 100,
  duration: 2,
  maxCount: 1
});

const msg = (msg, duration = 2) => message.info(msg, duration);
const fail = (msg, duration = 2, onClose) => {
  console.log("fail", msg, onClose);
  message.error(msg, duration, onClose);
};

export default {
  msg,
  fail
};
