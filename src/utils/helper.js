/**
 * helper
 */
import { BASE_API, BASE_SHOWAPI } from "Config";
import { Session as Storage } from "Utils/storage";
import API from "Utils/api";

/**
 * generate uuid
 * 时间戳+8位随机
 */
export const generateUuid = () =>
  new Date().getTime().toString() + Math.ceil(Math.random() * Math.pow(10, 8));

/**
 * url 获取值
 * @param {*} search
 * @param {*} name
 */
export function getQueryString(search, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 将base64转换为文件
 */
export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
};

/**
 * 将文件转base64
 */
export const fileToDataURL = (image, callback) => {
  var reader = new FileReader(); //实例化文件读取对象
  reader.readAsDataURL(image); //将文件读取为 DataURL,也就是base64编码
  reader.onload = function (ev) { //文件读取成功完成时触发
    var dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
    // document.querySelector("img").src = dataURL; //将DataURL码赋值给img标签
    // console.log(dataURL);
    callback && callback(dataURL);
  }
}

// 创建a标签并且下载
export const createADown = (url, fileName) => {
  let a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 调用接口，通过url返回流下载文件
export const downFileByBlob = (url, fileName,callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
  xhr.responseType = "blob";  // 返回类型blob
  // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
  xhr.onload = function () {
    // 请求完成
    if (this.status === 200) {
      callback && callback();
      // 返回200
      let blob = this.response;
      let reader = new FileReader();
      reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
      reader.onload = function (e) {
        // 转换完成，创建一个a标签用于下载
        createADown(e.target.result, fileName);
      }
    }
  };
  // 发送ajax请求
  xhr.send();
}

/**
 * 将文件转换成base64再下载文件
 * @param {*} file 
 */
export const downFileByFile = (file) => {
  let a = document.createElement('a');
  // 获取文件url
  fileToDataURL(file, (url) => {
    a.download = file.name;
    a.href = url;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
/**
 * 根据url下载文件
 * @param {*} file 
 */
export const downFileByUrl = async (id, fileName, callback) => {
  try {
    let url = findFilePathByAttachmentId(id);     // 获取url
    downFileByBlob(url, fileName,callback);
  } catch (e) {
    // 防止报错，关闭不了loading
    callback && callback();
  }
}

/**
 * 判断是否为中文
 * @param {*} str
 * @returns boolean   true中文  false不是中文
 */
export const isItChinese = str => {
  if (!str) {
    return false;
  }
  let i = -1,
    hanRegExp = /^[\u4e00-\u9fa5]+$/;
  while (++i < str.length) {
    if (hanRegExp.test(str[i])) {
      return true;
    }
  }
  return false;
};

/**
 * 判断是否为数字
 * @param {*} str
 * @returns boolean   true数字  false不是数字
 */
export const isItNumber = str => {
  return /^\d*$/.test(str);
};

/**
 *  使用forma表单实现导出
 * @param {*} url
 * @param {*} method
 * @param {*} options
 */
export const formDownload = (url, method = "post", options = {}) => {
  console.log(1232, options);
  url = BASE_API + url;
  let form = document.createElement("form");
  form.method = method;
  form.action = url;
  form.target = "_blank";
  // 动态创建input
  for (let key in options) {
    let idInput = document.createElement("input");
    idInput.name = key;
    idInput.value = options[key];
    form.appendChild(idInput);
  }
  // 添加token
  let tokenInput = document.createElement("input");
  tokenInput.name = "UTOKEN";
  tokenInput.value = Storage.get("token");
  form.appendChild(tokenInput);
  document.body.appendChild(form);
  // om[0].style.display = "none";
  form.submit(); // 提交
  document.body.removeChild(form);
};

/**
 * 轨迹查看详情通用接口
 * @code:dictValue
 * @array:枚举数组
 */
export function changeDict(code, array) {
  var value = "";
  array &&
    array.map(item => {
      if (item.dictValue == code) {
        value = item.nameCn;
      }
    });
  return value.trim();
}

//返回图片url
export const findFilePathById = id => {
  return (
    BASE_API +
    API.common.findFilePathById +
    `?id=${id}&UTOKEN=${Storage.get("token")}`
  );
};
//返回图片url
export const findFilePathByIdforPdf = id => {
  return (
    BASE_API +
    API.common.findFilePathById +
    `Pdf/${id}.pdf?id=${id}&UTOKEN=${Storage.get("token")}`
  );
};

//返回图片url
export const findFilePathByPath = url => {
  console.log("url", url);
  if (url) {
    return BASE_SHOWAPI + "web/photo" + url.path;
  }
};

// 根据attachmentId返回图片url
export const findFilePathByAttachmentId = attachmentId => {
  if (attachmentId) {
    return (
      BASE_API +
      `/security-service/api/common/attachment/show?id=${attachmentId}&UTOKEN=${Storage.get(
        "token"
      )}`
    );
  }
};

// 根据ObjectId返回图片url
export const findFilePathByObjectId = objectId => {
  if (objectId) {
    return (
      BASE_API +
      `/security-service/api/common/attachment/attachmentByObjectId?objectId=${objectId}&UTOKEN=${Storage.get(
        "token"
      )}`
    );
  }
};

//通过省市区code查找城市回显
export const deepFind = condition => {
  // 即将返回的数组
  let arr = Storage.get("provinceCity");
  let children = "children";
  let main = [];

  // 用try方案方便直接中止所有递归的程序
  try {
    // 开始轮询
    (function poll(arr, level) {
      // 如果传入非数组
      if (!Array.isArray(arr)) return;

      // 遍历数组
      for (let i = 0; i < arr.length; i++) {
        // 获取当前项
        const item = arr[i];

        // 先占位预设值
        main[level] = item;

        // 检验是否已经找到了
        const isFind = (condition && condition(item, i, level)) || false;

        // 如果已经找到了
        if (isFind) {
          // 直接抛出错误中断所有轮询
          throw Error;

          // 如果存在children，那么深入递归
        } else if (children && item[children] && item[children].length) {
          poll(item[children], level + 1);

          // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
        } else if (i === arr.length - 1) {
          // 删除占位预设值
          main.length = main.length - 1;
        }
      }
    })(arr, 0);
    // 使用try/catch是为了中止所有轮询中的任务
  } catch (err) {
    console.log(err);
  }

  // 返回最终数组

  let str = "";
  for (var i in main) {
    str += `${main[i].label}/`;
  }
  var info = str.substr(0, str.length - 1);
  return info;
};

//过滤状态
export function filterStatus(code, array) {
  let arr =
    array &&
    array.filter(item => {
      return item.dictValue.substring(0, 2) == code;
    });
  return arr;
}

/**
 * 从字典里面拿值
 * @param {*} code      字典类型
 * @param {*} dictValue 字典code
 * @param {*} isEn      是否需要英文，默认中文
 */
export function getDictNameByCode(code, dictValue, isEn, type) {
  if (!code) return "";
  // 拿到字典
  const dict = Storage.get("dict");
  if (!dict) return "";
  // 通过code拿到莫个类型的字典
  const dictTypeList = dict[code];
  if (!dictTypeList) return "";
  // 如果dictValue为空就返回字典类型列表
  if (!dictValue) return dictTypeList;
  // 通过dictValue找到指定的name
  let findObj =
    dictTypeList.find(
      item => item.dictValue == dictValue || item.code == dictValue
    ) || {};
  // 返回指定的值，例如找remark
  if (type) {
    return findObj[type];
  }
  // 返回找到的中文或者英文值
  return findObj[isEn ? "nameEn" : "nameCn"];
}

/**
 * 判断是否为正常网址
 * @param {*} str
 * @returns boolean   true中文  false不是中文
 */
export const checkUrl = url => {
  if (!url) {
    return false;
  }
  // const re = new RegExp("^([hH][tT]{2}[pP]:/*|[hH][tT]{2}[pP][sS]:/*|[fF][tT][pP]:/*)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+(\\?{0,1}(([A-Za-z0-9-~]+\\={0,1})([A-Za-z0-9-~]*)\\&{0,1})*)$");
  let hanRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return hanRegExp.test(url);
};

/**
 * 交换数组的两个元素
 * @param {*} arr     
 * @param {*} index1  
 * @param {*} index2 
 * @returns 
 */
export const swapItems = function (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};


