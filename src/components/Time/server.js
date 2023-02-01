import Request from "Utils/request";
import API from "Utils/api";

/**
 * 获取本周日期
 * @param {*} data
 */
export async function findWeekDate(data) {
  const response = await Request({
    url: API.common.findWeekDate,
    method: "post",
    data
  });
  return response;
}

//获取已经设置的时间
export async function findInterviewSetTime(data) {
  const response = await Request({
    url: API.common.findInterviewSetTime,
    method: "post",
    data
  });
  return response;
}
//启用时间
export async function saveEnableTime(data) {
  const response = await Request({
    url: API.common.saveEnableTime,
    method: "post",
    data
  });
  return response;
}

//禁用时间
export async function saveDisabelTime(data) {
  const response = await Request({
    url: API.common.saveDisabelTime,
    method: "post",
    data
  });
  return response;
}

//启用全周
export async function enableWeek(data) {
  const response = await Request({
    url: API.common.enableWeek,
    method: "post",
    data
  });
  return response;
}

//禁用全周
export async function disableWeek(data) {
  const response = await Request({
    url: API.common.disableWeek,
    method: "post",
    data
  });
  return response;
}

export async function settingDay(data) {
  const response = await Request({
    url: API.common.settingDay,
    method: "post",
    data
  });
  return response;
}

export async function getWeekState(data) {
  const response = await Request({
    url: API.common.getWeekState,
    method: "post",
    data
  });
  return response;
}
