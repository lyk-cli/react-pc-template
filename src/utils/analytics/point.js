/**
 * analytics
 * 埋点
 */

import request from "./request";

const analytics = () => {
  console.log("analytics enject");

  const body = document.querySelector("body");
  body.addEventListener("click", () => {
    let spmArray = [];
    const event = event || window.event;
    const target = event.target;
    const spm = target.getAttribute("data-spm");
    if (spm) {
      // console.log(spm);
      spmArray.push(spm);
      findParentSpm(target, spmArray);
    } else {
      // 冒泡 就再找一下父节点
      const parent = target.parentNode;
      if (parent && parent.tagName !== "BODY") {
        const spmParent = parent.getAttribute("data-spm");
        if (spmParent) {
          // console.log(spmParent);
          spmArray.push(spmParent);
          findParentSpm(parent, spmArray);
        }
      }
    }
  });
};

const findParentSpm = (element, spmArray) => {
  const parent = element.parentNode;
  if (parent && parent.tagName !== "BODY") {
    const spm = parent.getAttribute("data-spm");
    if (spm) {
      // console.log(spm);
      spmArray.unshift(spm);
    }
    findParentSpm(parent, spmArray);
  } else {
    send(spmArray);
  }
};

const send = data => {
  let params = {
    url: document.URL,
    referrer: document.referrer,
    sw: window.screen.width,
    sh: window.screen.height,
    lang: navigator.language,
    action: data.join(",")
  };

  // let args = "";
  // for (let [k, v] of Object.entries(params)) {
  //   args += `${k}=${encodeURIComponent(v)}&`;
  // }

  // data
  // args += "action=" + data.join(",");

  request(params);
  //const img = new Image(1, 1);
  //img.src = "http://localhost:4000/analytics?" + args;
};

export default analytics();
