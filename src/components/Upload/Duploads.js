/* eslint-disable */
import React, { Component } from "react";
import { Upload, Icon, Modal, message, Button, Popconfirm } from "antd";
import { Session as Storage } from "Utils/storage";
import {
  findFileByObjectIdAndpmanageInfo,
  findFilePathByIddown,
  deleteFileById,
  downFile,
  actionUrl,
  selectContract
} from "./server";
import { withDict } from "Contexts/DictContext";
class Duploads extends Component {
  constructor() {
    super();
    this.state = {
      fileList: [], // 文件列表
      previewVisible: false
    };
  }
  // 组件挂载完成
  async componentDidMount() {
    // console.log(" this.props.type", this.props.EontractType);
    if (this.props.EontractType) {
      this.GetSelectContract();
    } else {
      this.getFileList();
    }
    // console.log(9999, this.props);
  }

  // 获取已经上传的文件列表
  getFileList = async () => {
    // 根据ObjectId和类型获取上传的文件列表
    const response = await findFileByObjectIdAndpmanageInfo({
      id: this.props.data.objectId,
      type: this.props.data.type
    });
    if (response.status === true) {
      let fileList = response.data.map(item => {
        let { id: uid, oldName: name } = item;

        let url = findFilePathByIddown(uid); // 通过id查询图片url
        return { uid, name, status: "done", url }; // 返回封装好的file对象
      });

      this.setState({
        fileList
      });
    }
  };
  GetSelectContract = async () => {
    // 根据ObjectId和类型获取上传的文件列表
    const response = await selectContract({
      id: this.props.data.objectId
    });
    if (response.status === true) {
      var data = [response.data];
      console.log(1, data);
      let fileList = data.map(item => {
        let { id: uid, oldName: name } = item;

        let url = findFilePathByIddown(uid); // 通过id查询图片url
        return { uid, name, status: "done", url }; // 返回封装好的file对象
      });

      this.setState({
        fileList
      });
    }
  };

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
      } else {
        // message.error(file.response.msg);
        fileList.pop();
        console.log(111, fileList);
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

  // 删除图片
  fnRemove = async file => {
    // console.log("file",file)
    // this.setState({
    //   previewVisible:true,
    //   file
    // })

    const response = await deleteFileById({
      id: file.data ? file.data.id : file.uid
    });
    if (response.status === true) {
      this.getFileList();
    }
  };
  remove = async () => {
    let file = this.state.file;
    const response = await deleteFileById({
      id: file.data ? file.data.id : file.uid
    });
    if (response.status === true) {
      this.getFileList();
      this.setState({
        previewVisible: false
      });
    }
  };

  //格式校验
  beforeUpload = file => {
    const isLt20M = file.size <= 1024 * 1024 * 20;
    if (!isLt20M) {
      message.error("您上传的图片不能大于20MB");
      return false;
    }
    for (let i in this.props.attachment_type) {
      if (this.props.attachment_type[i].dictValue === this.props.data.type) {
        if (
          this.props.attachment_type[i].desc.indexOf(
            file.name
              .split(".")
              .pop()
              .toLowerCase()
          ) === -1
        ) {
          message.error("不支持您所上传的格式");
          return false;
        }
      }
    }
  };
  render() {
    //attachment_type
    const { fileList, previewVisible } = this.state;
    let disableds = this.props.disabled ? true : false;
    const UploadButton = (
      <div>
        <Button>
          <Icon type="upload" />
          点击选择文件上传
        </Button>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          name="file"
          disabled={disableds}
          action={this.props.actionUrl || actionUrl}
          headers={{
            UTOKEN: Storage.get("token")
          }}
          data={this.props.data}
          fileList={fileList}
          onChange={this.fnHandleChange}
          onRemove={this.fnRemove}
          beforeUpload={this.beforeUpload}
        >
          {fileList.length >= 30 ? null : UploadButton}
        </Upload>

        {/* 图片预览 */}
        <Modal
          visible={previewVisible}
          width={200}
          footer={
            <div style={{ textAlign: "center" }}>
              <Button onClick={() => this.setState({ previewVisible: false })}>
                取消
              </Button>
              <Button type="primary" onClick={() => this.remove()}>
                保存
              </Button>
            </div>
          }
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <p style={{ textAlign: "center" }}>确认删除？</p>
        </Modal>
      </div>
    );
  }
}

export default withDict(Duploads);
