/**
 * 登录service
 */
/* eslint-disable */
import Request from "Utils/request";
import API from "Utils/api";
import { Session as Storage } from "Utils/storage";

/**
 * 发送短信
 * @param {*} data
 */
export async function send(data) {
  const response = await Request({
    url: API.common.send,
    method: "post",
    headers: {
      UTOKEN: Storage.get("info").utoken || "" // token
    },
    data
  });
  return response;
}
/**
 * 验证
 * @param {*} id
 */
export async function validate(data) {
  let response = await Request({
    url: API.common.validate,
    method: "post",
    headers: {
      UTOKEN: Storage.get("info").utoken || "" // token
    },
    data
  });
  return response;
}
