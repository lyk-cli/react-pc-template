// 后端接口返回的menu数据格式
export const menuConfig = [
  {
    icon: "systemConfig",
    id: "1169526378566025217",
    name: "系统管理",
    parentId: "",
    permissionString: "pc:system",
    sortIndex: 11,
    type: "",
    url: "systemConfig",
    children: [
      {
        children: [],
        icon: "",
        id: "c8203f1343e47aa52823eddd61d16642",
        name: "用户管理",
        parentId: "",
        permissionString: "pc:system:user",
        sortIndex: 1,
        type: "",
        url: "user"
      }
    ]
  },
  {
    icon: "systemConfig",
    id: "b3516688106550cace1e122972ec48cb",
    name: "个人名片",
    parentId: "",
    permissionString: "pc:consult",
    sortIndex: 1,
    type: "",
    url: "businessCard",
    children: [
      {
        children: [],
        icon: "",
        id: "5a001931c0e477d44d58749034b6c75d",
        name: "个性签名",
        parentId: "",
        permissionString: "pc:personalSign",
        sortIndex: 1,
        type: "",
        url: "personalSign"
      }
    ]
  }
];
