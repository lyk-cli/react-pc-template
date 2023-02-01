/* eslint-disable */
import React, { Component } from "react";
import { Upload, message, Spin } from "antd";
import { Session as Storage } from "Utils/storage";
import { downFileByUrl } from "Utils/helper";
import {
  // findFileByObjectIdAndpmanageInfo,
  // findFilePathByIddown,
  deleteFileById,
  actionUrlH5,
} from "./server";
import { withDict } from "Contexts/DictContext";
class H5Upload extends Component {
  constructor() {
    super();
    this.state = {
      fileList: [], // 文件列表
      loading: false, // 是否加载
      loadingTips: "loading...", // 加载文字
    };
  }
  // 组件挂载完成
  async componentDidMount() {
    if (this.props.type === "fileList") {
      this.setFileList(this.props.initFileList);
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (this.props.initFileList !== nextProps.initFileList) {
  //     this.setFileList(nextProps.initFileList);
  //   }
  // }

  setFileList = (fileList) => {
    fileList = fileList.map((item) => {
      return {
        ...item,
        uid: item.id,
        name: item.oldName,
      };
    });
    this.setState(
      {
        fileList,
      },
      () => {
        this.props.fileList(this.props.data.type, this.state.fileList);
      }
    );
  };

  // 上传完成

  fnHandleChange = (info) => {
    let { fileList, file } = info;

    // 上传中
    if (file.status === "uploading") {
      fileList = fileList.map((file) => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });
      this.setState({ fileList });
    }
    // 上传完成
    if (file.status === "done") {
      fileList = fileList.map((file) => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });
      if (file.response.code == 0) {
        this.setState({ fileList }, () => {
          this.props.fileList(this.props.data.type, this.state.fileList);
        });
      } else {
        message.error(`${file.response.msg}`);
        fileList.pop();
        this.setState({ fileList }, () => {
          this.props.fileList(this.props.data.type, this.state.fileList);
        });
      }
    }
    // 上传失败
    if (file.status === "removed") {
      //this.fnRemove(file)
      fileList = fileList.map((file) => {
        if (file.response) {
          file.data = file.response.data;
        }
        return file;
      });
      this.setState({ fileList }, () => {
        this.props.fileList(this.props.data.type, this.state.fileList);
      });
    }
  };

  //格式校验
  fnbeforeUpload = (file) => {
    let name = file.name.split(".")[file.name.split(".").length - 1]; // 文件后缀名

    // console.log(7777, file);

    let { getUploadSizeError, getUploadFormatError } = this.props;

    // 2. 校验图片上传格式
    // 2.1 父组件传递过来的自定义校验图片格式的
    if (typeof getUploadFormatError === "function") {
      let uploadFormatError = getUploadFormatError(name.toLowerCase());
      if (uploadFormatError) {
        message.error(uploadFormatError);
        return false;
      }
    } else {
      // 2.2 默认上传格式
      const isJpgOrPng = ["png", "jpeg", "jpg"].includes(name.toLowerCase());
      if (!isJpgOrPng) {
        message.error("上传图片格式需为JPG/JPEG/PNG");
        return false;
      }
    }

    // 3. 校验图片上传大小限制
    // 3.1 父组件传递过来的自定义校验图片大小的
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

  // 删除图片
  fnRemove = async (file) => {
    this.setState({ loading: true });
    let { fileList } = this.state;
    let id = file.data ? file.data.id : file.uid;
    // 后端删除图片
    const response = await deleteFileById({ id });
    if (!response.status) return;
    // 本地删除图片列表
    fileList = fileList.filter((item) => {
      if (item.data) return item.data.id !== id;
      return item.uid !== id;
    });
    this.setState(
      {
        fileList,
        loading: false,
      },
      () => {
        // 将文件列表回显给父组件
        this.props.fileList(this.props.data.type, fileList);
      }
    );
  };
  render() {
    const { fileList } = this.state;

    const { placeholder = "上传H5代码包", initFileList } = this.props;

    // console.log(fileList, 888888, initFileList);
    const UploadButton = (
      <div>
        <span
          style={
            this.props.disabled
              ? { color: "#666", fontSize: "14px", lineHeight: "40px" }
              : {
                  color: "#0090da",
                  fontSize: "14px",
                  lineHeight: "40px",
                  cursor: "pointer",
                }
          }
        >
          {placeholder}
        </span>
      </div>
    );
    return (
      <Spin spinning={this.state.loading} tip={this.state.loadingTips}>
        <div style={{ display: "inline-block" }}>
          <Upload
            name="file"
            action={this.props.actionUrlH5 || actionUrlH5}
            headers={{
              UTOKEN: Storage.get("token"),
            }}
            data={this.props.data}
            // 默认已经上传的文件列表
            defaultFileList={initFileList}
            //  已经上传的文件列表（受控），使用此参数时，如果遇到 onChange 只调用一次的问题
            fileList={fileList}
            onChange={this.fnHandleChange}
            onRemove={this.fnRemove}
            beforeUpload={this.fnbeforeUpload}
            disabled={this.props.disabled}
            showUploadList={{
              showDownloadIcon: true,
              downloadIcon: "download ",
              showRemoveIcon: true,
            }}
            // 下载文件
            onDownload={(file) => {
              this.setState({
                loading: true,
              });
              if (file.originFileObj) {
                // downFileByFile(file.originFileObj);
                downFileByUrl(file.data.id, file.data.oldName, () => {
                  this.setState({
                    loading: false,
                  });
                });
              } else {
                downFileByUrl(file.id, file.name, () => {
                  this.setState({
                    loading: false,
                  });
                });
              }
            }}
          >
            {fileList.length >= 30 || this.props.disabled ? null : UploadButton}
          </Upload>
        </div>
      </Spin>
    );
  }
}

export default withDict(H5Upload);
