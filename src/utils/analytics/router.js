/**
 * 路由变换
 * startTime
 * preUrl
 *
 * 停留时间 time
 * 上一个url pre
 * 当前url current
 */
import request from "./request";

function router() {
  window.addEventListener("load", () => {
    // console.log("load");
    window.track = {
      time: new Date().getTime()
    };
  });

  window.addEventListener("hashchange", e => {
    const trackVo = {
      time: window.track ? new Date().getTime() - window.track.time : 0,
      pre: window.track.current || "",
      current: e.oldURL,
      next: e.newURL,
      sw: window.screen.width,
      sh: window.screen.height,
      lang: navigator.language,
      ua: window.navigator.userAgent
    };

    // console.log(trackVo);
    request(trackVo);

    window.track = {
      time: new Date().getTime(),
      current: e.oldURL
    };
  });
}

export default router();
