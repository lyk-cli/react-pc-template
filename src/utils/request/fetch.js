/* eslint-disable no-case-declarations */
/**
 * request
 */

import { BASE_API } from "Config";
import { Toast } from "Components";
import { Session as Storage, Application } from "Utils/storage";
import signMd5Utils from "Utils/md5";
import { Encrypt, Decrypt } from "Utils/aes";
const isAes = false;
/**
 * request
 * @param {*}
 */
export default async function({
  url,
  method = "post",
  data = {},
  headers = { "Content-Type": "application/json" },
  loading = false,
  timeout = 60000
}) {
  // fetch promise
  const fetchPromise = new Promise(resolve => {
    let requestConfig = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    if (!url) return;
    //const sign = signMd5Utils.getSign(url, data);
    if (isAes) {
      var aes_value = Encrypt(JSON.stringify(data));
      data = { ars_value: aes_value };
    }

    console.log("Encrypt", data);
    const sign = signMd5Utils.getSign(
      url,
      Storage.get("info") ? Storage.get("info") : {}
    );
    // url
    url = url.includes("://") || url.includes("json") ? url : BASE_API + url;

    //token
    if (Storage.get("token")) {
      requestConfig.headers.UTOKEN = Storage.get("token");
    }

    // header
    if (Object.keys(headers).length !== 0) {
      Object.assign(requestConfig.headers, headers);
    }

    // header 里公共参数
    requestConfig.headers = {
      ...requestConfig.headers,
      client: "pc", // 端
      deviceId: "h5"
      // version: 1, // 服务版本号
      // source: "source", //来源
      // requestNo: new Date().getTime() // 请求序号
    };

    // method & data
    if (method.toLowerCase() === "post" || method.toLowerCase() === "put") {
      // form or json
      const contentType = requestConfig.headers["Content-Type"];
      if (contentType === "application/json") {
        Object.defineProperty(requestConfig, "body", {
          value: JSON.stringify(data)
        });
      } else if (contentType === "multipart/form-data") {
        // file upload
        const form = new FormData();
        Object.keys(data).forEach(key => {
          form.append(key, data[key]);
        });
        Object.defineProperty(requestConfig, "body", {
          value: form
        });
        delete requestConfig.headers["Content-Type"];
      }
    } else if (method.toLowerCase() === "get") {
      const str = Object.entries(data)
        .reduce((acc, cur) => acc.concat(cur.join("=")), [])
        .join("&");
      if (str) {
        url += "?" + str;
      }
    }
    console.log("signMd5Util");

    console.log("sign", sign);
    if (isAes) {
      if (url.includes("?")) {
        url += `&sign_params_str=${sign}&ars_flag=ars`;
      } else {
        url += `?sign_params_str=${sign}&ars_flag=ars`;
      }
    }

    // var aes_value = Encrypt(requestConfig.body);
    // aes_value = JSON.stringify({ ars_value: requestConfig });
    // requestConfig.body = aes_value;
    console.log("requestConfig", requestConfig);
    fetch(url, requestConfig)
      .then(response => {
        // 数据检验
        return response;
      })
      .then(response => {
        // 解析数据
        let responseData;

        switch (requestConfig.headers.Accept) {
          // json
          case "application/json":
            responseData = response.json();
            break;
          // 文本
          case "text/html":
            responseData = response.text();
            break;
          // 文件下载
          case "application/octet-stream":
            const blob = response.blob();
            // responseData = {
            //   blob,
            //   filename: response.headers.get("Content-Disposition"),
            //   type: "file"
            // };
            const a = document.createElement("a");
            const fileurl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
            const filename = response.headers.get("Content-Disposition");
            a.href = fileurl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(fileurl);
            break;
        }
        console.log("123", responseData);
        return responseData;
      })
      .then(data => {
        resolve(data);
      });
  });

  // timeout promise
  const timeoutPromise = new Promise(function(resolve, reject) {
    const time = setTimeout(() => {
      clearTimeout(time);
      reject(new Error("请求超时"));
    }, timeout);
  });

  // loading
  // loading && Toast.loading("loading");
  console.log(loading);

  // check network
  if (!window.navigator.onLine) {
    console.log("没有网络");
    Toast.fail("没有网络");
    return;
  }

  try {
    var result = await Promise.race([fetchPromise, timeoutPromise]);
    // Toast.hide();
    // 业务逻辑code 0为成功
    // result = result.replace('"', "").replace('"', "");
    if (isAes) {
      result = result.arsValue;
      result = JSON.parse(Decrypt(result));
    }

    if (+result.code !== 0) {
      if (result.code === 402) {
        Toast.fail(result.msg || result.error, 1, () => {
          Storage.clear();
          Application.clear();
          window.location.reload();
        });
      } else {
        Toast.fail(result.msg || result.error);
      }
      // 错误信息收集 发送到服务器
    } else {
      result.status = true;
    }
    return result;
  } catch (error) {
    console.log("catch", error);
    Toast.fail(error.message);
    // 错误信息收集 发送到服务器
  }
}
