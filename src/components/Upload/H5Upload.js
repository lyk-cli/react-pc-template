/* eslint-disable */
import React, { Component } from "react";
import { Upload, Icon, Modal, message, Button, Popconfirm } from "antd";
import { Session as Storage } from "Utils/storage";
import {
  // findFileByObjectIdAndpmanageInfo,
  // findFilePathByIddown,
  // deleteFileById,
  actionUrlH5
} from "./server";
import { withDict } from "Contexts/DictContext";
class H5Upload extends Component {
  constructor() {
    super();
    this.state = {
      fileList: [], // 文件列表
      previewVisible: false,
      fileName: ""
    };
  }
  // 组件挂载完成
  async componentDidMount() {}

  // 上传完成

  fnHandleChange = info => {
    let { fileList, file } = info;

    if (file.status === "uploading") {
      fileList = fileList.map(file => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });
      this.setState({ fileList });
    }
    if (file.status === "done") {
      fileList = fileList.map(file => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });
      if (file.response.code == 0) {
        this.setState({ fileList });
        //
        this.props.fileName.getFileName(this, file.response.data);
      } else {
        message.error(`${file.response.msg}`);
        fileList.pop();
        this.setState({ fileList });
      }
    }
    if (file.status === "removed") {
      //this.fnRemove(file)
      fileList = fileList.map(file => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });
      this.setState({ fileList });
    }
  };

  //格式校验
  beforeUpload = file => {
    if (this.props && this.props.isLoading) {
      this.props.isLoading(true);
    }
    //只允许zip格式压缩包
    // const isRightType = file.name.split(".")[1] == "zip" || "rar";
    const isRightType = file.name.split(".")[1] == "zip";
    if (!isRightType) {
      message.error("不支持您所上传的文件格式");
      //将空的文件名返回
      // let fileName = "";
      // this.props.fileName.getFileName(this, fileName);
      return false;
    } else {
      //获取文件名并返回到input中
      // let fileName = file.name.split(".")[0];
      // this.props.fileName.getFileName(this, fileName);
    }
    // const isLt5M = file.size <= 1024 * 1024 * 5;
    // if (!isLt5M) {
    //   message.error("您上传的图片不能大于5MB");
    //   return false;
    // }
  };
  render() {
    //attachment_type

    const { fileList, previewVisible } = this.state;
    const UploadButton = (
      <div>
        <span
          style={
            this.props.disabled
              ? { color: "#666", fontSize: "10px", lineHeight: "40px" }
              : { color: "#0090da", fontSize: "10px", lineHeight: "40px" }
          }
        >
          上传H5代码包
        </span>
      </div>
    );
    return (
      <div style={{ display: "inline-block" }}>
        <Upload
          name="file"
          action={this.props.actionUrlH5 || actionUrlH5}
          headers={{
            UTOKEN: Storage.get("token")
          }}
          data={this.props.data}
          fileList={fileList}
          onChange={this.fnHandleChange}
          onRemove={this.fnRemove}
          beforeUpload={this.beforeUpload}
          disabled={this.props.disabled}
        >
          {fileList.length >= 30 ? null : UploadButton}
        </Upload>
      </div>
    );
  }
}

export default withDict(H5Upload);
