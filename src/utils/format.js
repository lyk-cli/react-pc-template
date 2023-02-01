/**
 * formate
 */

// export function formatDate(d, formatStr) {
//   // alert(d);
//   // 转换成Date类型
//   if (!d) return;
//   var date;
//   if (typeof d === "number") {
//     date = new Date(d);
//   } else if (typeof d === "string") {
//     date = new Date(d.replace(/-/g, "/"));
//   } else {
//     date = d;
//   }

//   var opt = {
//     YYYY: date.getFullYear(),
//     MM: addZero(date.getMonth() + 1),
//     M: date.getMonth() + 1,
//     dd: addZero(date.getDate()),
//     d: date.getDate(),
//     HH: addZero(date.getHours()),
//     h: date.getHours(),
//     mm: addZero(date.getMinutes()),
//     m: date.getMinutes(),
//     ss: addZero(date.getSeconds()),
//     s: date.getSeconds()
//   };

//   // 如果是个位数则前面添加0
//   function addZero(value) {
//     return value < 10 ? "0" + value : value;
//   }

//   // 遍历替换
//   for (var k in opt) {
//     formatStr = formatStr.replace(k, opt[k]);
//   }

//   // console.log(formatStr);
//   return formatStr;
// }

// const format = {
//   //  格式化日期 或者使用moment
//   date: function(d, formatStr) {
//     // alert(d);
//     // 转换成Date类型
//     if (!d) return;
//     var date;
//     if (typeof d === "number") {
//       date = new Date(d);
//     } else if (typeof d === "string") {
//       date = new Date(d.replace(/-/g, "/"));
//     } else {
//       date = d;
//     }

//     var opt = {
//       YYYY: date.getFullYear(),
//       MM: addZero(date.getMonth() + 1),
//       M: date.getMonth() + 1,
//       dd: addZero(date.getDate()),
//       d: date.getDate(),
//       HH: addZero(date.getHours()),
//       h: date.getHours(),
//       mm: addZero(date.getMinutes()),
//       m: date.getMinutes(),
//       ss: addZero(date.getSeconds()),
//       s: date.getSeconds()
//     };

//     // 如果是个位数则前面添加0
//     function addZero(value) {
//       return value < 10 ? "0" + value : value;
//     }

//     // 遍历替换
//     for (var k in opt) {
//       formatStr = formatStr.replace(k, opt[k]);
//     }

//     // console.log(formatStr);
//     return formatStr;
//   },

//   /**
//    * 字符串中的emoj替换
//    * @param {*} v
//    * @param {*} str
//    */
//   emoj: function(v, str = "") {
//     return v.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, str);
//   }
// };

// export default { formatDate };
//时间格式转换  date,"yyyy-mm-dd HH-mm-ss"
export const format = (timestamp, type) => {
  let now = new Date(timestamp);
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  if (type === "y-m-d") {
    return year + "-" + month + "-" + day;
  }
  if (type === "y-m-d h-m") {
    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
  }
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
};

export default { format };

// 判断两个日期是否是同年 | 同月 | 同日
export const isYAndMAndD = (str1, str2, type) => {
  let date1 = new Date(str1);
  let date2 = new Date(str2);
  let isYearFlag = date1.getFullYear() === date2.getFullYear();
  let isMonthFlag = date1.getMonth() === date2.getMonth();
  let isDayFlag = date1.getDate() === date2.getDate();
  switch (type) {
    case 1:
      return isYearFlag;
    case 2:
      return isMonthFlag;
    case 3:
      return isDayFlag;
    case 4:
      return isYearFlag;
    case 5:
      // 判断同年同月同日
      return isYearFlag && isMonthFlag && isDayFlag;
    default:
      // 默认判断同年同月相等
      return isYearFlag && isMonthFlag;
  }
};
