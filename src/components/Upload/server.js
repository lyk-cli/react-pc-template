import Request from "Utils/request";
import API from "Utils/api";
import { BASE_API } from "Config";
import { Session as Storage } from "Utils/storage";
import { formDownload } from "Utils/helper";

/**
 * 根据ObjectId和类型获取上传的文件/附件列表
 * @param {*} data      ObjectId和type
 */
export async function findFileByObjectIdAndType(data) {
  const response = await Request({
    url: API.common.findFileByObjectIdAndType,
    method: "post",
    data
  });
  return response;
}

/**
 * 根据ObjectId和类型获取上传的文件/附件列表
 * @param {*} data      ObjectId和type
 */
export async function findFileByObjectIdAndpmanageInfo(data) {
  const response = await Request({
    url: API.common.findFileByObjectIdAndpmanageInfo,
    method: "post",
    data
  });
  return response;
}
/**
 * 根据ObjectId和类型获取上传的文件/电子合同
 * @param {*} data      ObjectId和type
 */
export async function selectContract(data) {
  const response = await Request({
    url: API.common.selectContract,
    method: "post",
    data
  });
  return response;
}
/**
 * 根据文件/附件id拼接文件path
 * @param {*} id
 */
export const findFilePathById = id => {
  console.log("id123465498", id);
  return (
    BASE_API +
    API.common.findFilePathById +
    `?id=${id}&UTOKEN=${Storage.get("token")}`
  );
};
/**
 * 根据文件/附件id拼接文件path
 * @param {*} id
 */
export const findFilePathByIddown = id => {
  console.log("id123465498", id);
  return (
    BASE_API +
    API.common.findFilePathByIddown +
    `?id=${id}&UTOKEN=${Storage.get("token")}`
  );
};

/**
 * 根据文件/附件id删除文件/附件
 * @param {*} data      接口数据参数
 */
export async function deleteFileById(data) {
  const response = await Request({
    url: API.common.deleteFileById,
    method: "post",
    data
  });
  return response;
}

/**
 * 根据文件/附件id下载文件/附件
 * @param {*} data  接口数据参数        id
 * @param {*} options 接口请求参数
 */
export const downFile = (data, options = {}) => {
  let path = options.path || API.common.downFile;
  let methods = options.path || "get";
  formDownload(path, methods, data);
};

// 获取上传图片/附件的url
export const actionUrl = BASE_API + API.common.uploadFile;

export const actionUrlH5 = BASE_API + API.common.uploadFile;
