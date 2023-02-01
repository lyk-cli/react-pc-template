/**
 * api
 */

/* eslint-disable */
const api = {
  // 公共
  common: {
    login: "/mapi/login", // 登录
    menu: "/security-service/mapi/common/menu", // 菜单
    logout: "/mapi/logout", // 退出
    permission: "/security-service/mapi/common/permission", // 权限
    dict: "/security-service/mapi/common/dict",
    findArea: "common/area/findArea", //省市区
    uploadFile: "/security-service/mapi/common/attachment/upload", // 上传图片/附件
    downFile: "common/attachment/down", // 下载图片/附件
    deleteFileById: "/security-service/mapi/common/attachment/deleteById", // 删除图片/附件
    findFileByObjectIdAndType: "/common/attachment/findByObjectIdAndType", // 查询图片/附件
    findFileByObjectIdAndpmanageInfo: "material/approve/pmanageInfo", // 查询图片/附件findFileByObjectIdAndpmanageInfo
    selectContract: "material/approve/selectContract", // 查询电子合同
    findFilePathById: "common/attachment/show", // 根据文件id拼接文件path
    findFilePathByIddown: "common/attachment/down", // 根据文件id拼接文件path
    generateId: "/security-service/mapi/common/generateId", // 新增时生成id
    findDept: "common/org/findDept",
    findGroup: "common/org/findGroup",
    findOrg: "common/org/findOrg", //可用组织
    findWeekDate: "main/InterviewTime/findWeekDate",
    findInterviewSetTime: "main/InterviewTime/findInterviewSetTime",
    saveEnableTime: "main/InterviewTime/saveEnableTime",
    saveDisabelTime: "main/InterviewTime/saveDisabelTime",
    enableWeek: "main/InterviewTime/enableWeek",
    disableWeek: "main/InterviewTime/disableWeek",
    settingDay: "main/InterviewTime/settingDay",
    getWeekState: "main/InterviewTime/getWeekState",
    personType: "material/approve/compTree",
    send: "mobile/send", //发送短信
    validate: "mobile/validate", //发送验证码
    selectAllCity: "common/org/selectAllCity" //查询城市
  }
};
export default api;
