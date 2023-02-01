/* eslint-disable */
import React, { Component } from "react";
import { Upload, Icon, Modal, message } from "antd";
import "./avatar.less";
import { Session as Storage } from "Utils/storage";
import {
  findFilePathByAttachmentId,
  findFilePathByObjectId
} from "Utils/helper";

import {
  findFileByObjectIdAndType,
  findFilePathById,
  deleteFileById,
  actionUrl
} from "./server";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class DuploadPreview extends Component {
  state = {
    previewVisible: false, // 弹出预览图片的框
    previewImage: "", // 预览的图片路劲
    imgStatu: false, //当前上传图片的状态
    // fileList: [
    //   {
    //     uid: "-1",
    //     name: "image.png",
    //     status: "done",
    //     url:
    //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //   }
    // ]
    fileList: [] // 文件列表
  };

  // 组件挂载完成
  async componentDidMount() {
    if (this.props.type === "attachmentId") {
      this.getImageByObject(this.props.data, false, "init");
    } else if (this.props.type === "objectId") {
      this.getImageByObject(this.props.data, true, "init");
    } else {
      this.getFileList();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.listenerId !== nextProps.listenerId) {
      // 图片列表中是否有此图片
      let findObj = this.state.fileList.some(
        item => item.data && item.data.id === nextProps.listenerId
      );

      // 有的话就不需要重新显示图片
      !findObj &&
        this.getImageByObject(
          { uid: nextProps.listenerId },
          nextProps.type === "objectId"
        );
    }
  }

  // 根据attachmentId获取图片
  getImageByObject = (data, type, init) => {
    const { uid } = data;
    if (!uid) {
      !init && this.props.fileList(this.props.data.type, []);
      return this.setState({ fileList: [] });
    }
    let url = type
      ? findFilePathByObjectId(uid)
      : findFilePathByAttachmentId(uid);
    let fileList = [
      {
        uid,
        status: "done",
        url // 返回封装好的file对象
      }
    ];
    this.props.fileList(this.props.data.type, fileList);
    this.setState({
      fileList
    });
  };

  // 获取已经上传的文件列表
  getFileList = async () => {
    // 根据ObjectId和类型获取上传的文件列表
    const response = await findFileByObjectIdAndType(this.props.data);
    if (response.status === true) {
      let fileList = response.data.map(item => {
        let { id: uid, oldName: name } = item;
        let url = findFilePathById(uid); // 通过id查询图片url
        return { uid, name, status: "done", url }; // 返回封装好的file对象
      });
      this.setState({ fileList }, () => {
        if (this.props && this.props.fileList) {
          this.props.fileList(this.props.data.type, this.state.fileList);
        }
      });
    }
  };

  // 取消图片预览
  fnHandleCancel = () => this.setState({ previewVisible: false });

  // 预览图片
  fnHandlePreview = file => {
    // base64预览
    if (file.url) {
      this.setState({
        previewImage: file.url,
        previewVisible: true
      });
    } else {
      let url = findFilePathById(file.data.id);
      this.setState({
        previewImage: url,
        previewVisible: true
      });
    }
    // 设置图片预览

    // 下载图片
    // downFile({ id: file.id || file.data.id });
  };

  // 上传完成
  fnHandleChange = info => {
    console.log("1111111handleChange11111", info);
    let { fileList, file } = info;
    if (
      file.status === "done" ||
      file.status === "uploading" ||
      file.status === "removed"
    ) {
      fileList = fileList.map(file => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });

      this.setState({ fileList }, () => {
        if (this.props && this.props.fileList) {
          this.props.fileList(this.props.data.type, this.state.fileList);
        }
        if (file.status === "done") {
          if (this.props && this.props.isLoading) {
            this.props.isLoading(false);
          }
        }
      });
    }
  };

  // 删除图片
  fnRemove = async file => {
    let id = file.data ? file.data.id : file.uid;
    // 后端删除图片
    const response = await deleteFileById({ id });
    // 本地删除图片列表
    let fileList = this.state.fileList.filter(item =>
      item.data ? file.data.id !== id : file.uid !== id
    );
    this.setState({
      fileList
    });
    // 将文件列表回显给父组件
    this.props.fileList(this.props.data.type, fileList);
  };

  //格式校验
  beforeUpload = file => {
    // 1. 父级传递过来的isLoading方法，上传图片中
    if (this.props && this.props.isLoading) {
      this.props.isLoading(true);
    }

    // 2. 校验上传文件的格式
    let name = file.name.split(".")[file.name.split(".").length - 1];

    const isJpgOrPng = ["png", "jpeg", "jpg"].includes(name.toLowerCase());
    if (!isJpgOrPng) {
      message.error("上传图片格式需为JPG/JPEG/PNG");
      return false;
    }

    // 3. 校验图片上传大小限制
    // 3.1 父组件传递过来的自定义校验图片大小的
    let { getUploadSizeError } = this.props;
    if (typeof getUploadSizeError === "function") {
      let uploadSizeError = getUploadSizeError(file.size);
      if (uploadSizeError) {
        message.error(uploadSizeError);
        return false;
      }
    } else {
      // 3.2 默认上传大小限制
      const isLt5M = file.size <= 1024 * 1024 * 5;
      if (!isLt5M) {
        message.error("您上传的图片不能大于5MB");
        return false;
      }
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    // 上传按钮
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className={`clearfix ${this.props.className || ""}`}>
        {this.props.data && this.props.data.num ? (
          <Upload
            disabled={this.props.disabled}
            action={this.props.actionUrl || actionUrl}
            headers={{
              UTOKEN: Storage.get("token")
            }}
            data={this.props.data}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={this.beforeUpload}
            onPreview={this.fnHandlePreview}
            onChange={this.fnHandleChange}
            onRemove={this.fnRemove}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        ) : (
          <Upload
            disabled={this.props.disabled}
            action={this.props.actionUrl || actionUrl}
            headers={{
              UTOKEN: Storage.get("token")
            }}
            data={this.props.data}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={this.beforeUpload}
            onPreview={this.fnHandlePreview}
            onChange={this.fnHandleChange}
            onRemove={this.fnRemove}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        )}
        {/* 图片预览 */}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.fnHandleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default DuploadPreview;
