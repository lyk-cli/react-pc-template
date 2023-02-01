/* eslint-disable */
import React, { Component } from "react";
import { Upload, Icon, Modal, message, Button } from "antd";
import Cropper from "react-cropper";
// import lrz from "lrz";
import { Session as Storage } from "Utils/storage";
import axios from "axios";
import { BASE_API } from "Config";
import API from "Utils/api";
import {
  findFileByObjectIdAndType,
  findFilePathById,
  deleteFileById,
  downFile
} from "./server";

//将base64转换为文件
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n),
    suffix = mime.split("/")[1];
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let theBlob = new Blob([u8arr], { type: mime });
  theBlob.lastModifiedDate = new Date();
  theBlob.name = `${filename}.${suffix}`;
  return {
    file: theBlob,
    name: `${filename}.${suffix}`
  };
}

class Dupload extends Component {
  state = {
    previewVisible: false, // 弹出预览图片的框
    previewImage: "", // 预览的图片路劲
    imgStatu: false, //当前上传图片的状态
    fileList: [], // 文件列表
    selectImgSize: "0",
    selectImgName: "",
    selectedImageFile: "",
    editImageModalVisible: false,
    srcCropper: "",
    filename: "",
    aspectRatio: 75 / 75,
    loadings: false
  };

  // 组件挂载完成
  async componentDidMount() {
    this.getFileList();
  }

  // 获取已经上传的文件列表
  getFileList = async () => {
    // 根据ObjectId和类型获取上传的文件列表
    const response = await findFileByObjectIdAndType(this.props.data);
    // console.log(111111111, response);
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
    //固定比例
    let type = this.props.data.type;
    // console.log(11121, type);
    if (type === "NPLUS_INDUSTRY_JIN") {
      this.setState({
        aspectRatio: 512 / 704
      });
    }
    if (type === "NPLUS") {
      this.setState({
        aspectRatio: 1024 / 704
      });
    }
    if (type === "NPLUS_INDUSTRY_CUL") {
      this.setState({
        aspectRatio: 1024 / 352
      });
    }
    if (
      type === "NPLUS_INDUSTRY_SUB" ||
      type === "NPLUS_INDUSTRY_RET" ||
      type === "NPLUS_INDUSTRY_EDU" ||
      type === "NPLUS_INDUSTRY_MAN" ||
      type === "NPLUS_INDUSTRY_CAR" ||
      type === "NPLUS_INDUSTRY_IT" ||
      type === "NPLUS_INDUSTRY_FOO" ||
      type === "NPLUS_INDUSTRY_MED"
    ) {
      this.setState({
        aspectRatio: 512 / 352
      });
    }
    if (type === "NPLUS_INTRODUCTION_IMG") {
      //简介页缩略图
      this.setState({
        aspectRatio: 440 / 280
      });
    }
    if (
      //图标
      type === "NPLUS_SECTION_ONE_IMG" ||
      type === "NPLUS_SECTION_TWO_IMG" ||
      type === "NPLUS_SECTION_THR_IMG"
    ) {
      this.setState({
        aspectRatio: 100 / 100
      });
    }
    if (type === "NPLUS_BACKGROUND_IMG") {
      //简介页背景
      this.setState({
        aspectRatio: 2048 / 700
      });
    }
    if (type === "NPLUS_INTRODUCTION_ONE_IMG") {
      this.setState({
        aspectRatio: 857 / 700
      });
    }
    if (
      type === "NPLUS_INTRODUCTION_TWO_IMG" ||
      type === "NPLUS_INTRODUCTION_THR_IMG"
    ) {
      this.setState({
        aspectRatio: 900 / 910
      });
    }
  };

  crop() {
    const _this = this;
    // lrz压缩
    // this.refs.cropper.getCroppedCanvas().toDataURL() 为裁剪框的base64的值
    // lrz(this.refs.cropper.getCroppedCanvas().toDataURL(), {
    //   quality: 0.6
    // }).then(results => {
    //   this.setState({
    //     imgbase: results.base64
    //   });
    // });
    // console.log(this.props.data)

    this.setState({
      imgbase: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  }

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
  };

  //格式校验
  fnbeforeUpload = file => {
    if (this.props && this.props.isLoading) {
      this.props.isLoading(true);
    }
    let format = this.props.data.type;
    let name = file.name.split(".")[file.name.split(".").length - 1];
    //图片格式
    if (
      format === "NPLUS_SECTION_ONE_IMG" ||
      format === "NPLUS_SECTION_TWO_IMG" ||
      format === "NPLUS_SECTION_THR_IMG"
    ) {
      const isJpgOrPng = name === "svg" || name === "png";
      if (!isJpgOrPng) {
        message.error("不支持您所上传的图片格式");
        return false;
      }
    } else {
      const isJpgOrPng = name === "jpg" || name === "png";
      if (!isJpgOrPng) {
        message.error("不支持您所上传的图片格式");
        return false;
      }
    }

    const isLt5M = file.size <= 1024 * 1024 * 5;
    if (!isLt5M) {
      message.error("您上传的图片不能大于5MB");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); //开始读取文件
    // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
    reader.onload = e => {
      this.setState({
        srcCropper: e.target.result, //cropper的图片路径
        selectImgName: file.name, //文件名称
        selectImgSize: file.size / 1024 / 1024, //文件大小
        selectImgSuffix: file.type.split("/")[1], //文件类型
        editImageModalVisible: true, //打开控制裁剪弹窗的变量，为true即弹窗
        uid: file.uid
      });
    };
    return false;
  };

  // 截图保存
  fnSave = () => {
    this.setState(
      {
        cropperData: this.state.imgbase,
        editImageModalVisible: false,
        loadings: true
      },
      () => {
        //向服务器提交base64图片数据
        let compressionRatio = 0.5;
        let cropperData = this.refs.cropper
          .getCroppedCanvas()
          .toDataURL("image/*", compressionRatio);
        while (cropperData.length / 1024 > 500 && compressionRatio > 0.1) {
          compressionRatio -= 0.1;
          cropperData = this.refs.cropper
            .getCroppedCanvas()
            .toDataURL("image/*", compressionRatio);
        }
        var file = dataURLtoFile(cropperData, this.state.selectImgName);

        var formdata1 = new FormData(); // 创建form对象
        formdata1.append("file", file.file, file.name); // 通过append向form对象添加数据,可以通过append继续添加数据
        formdata1.append("objectId", this.props.data.objectId); //"16161654343464546"
        formdata1.append("type", this.props.data.type); //
        formdata1.append("name", "jpeg");

        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            UTOKEN:
              Storage.get("token") ||
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmYWlyeWxhbmQiLCJ0eXBlIjoiaW5zaWRlIiwiZXhwIjoxNTkyMjkyOTk3MDIzLCJ1c2VySWQiOiIxMjY1ODIzNTg0MjEzNjkyNDE4IiwiaWF0IjoxNTkyMjkxMTk3MDIzfQ.EcK8D_rmE2yJo81-rYXaB7mVRg7vb1raodeCWgfZsFM"
          }
        };

        axios
          .post(BASE_API + API.common.uploadFile, formdata1, config)
          .then(response => {
            if (response.data) {
              this.setState({ loadings: false });
              this.getFileList();
            }
          });
      }
    );
  };

  // 删除图片
  fnRemove = async file => {
    const response = await deleteFileById({
      id: file.data ? file.data.id : file.uid
    });
    this.getFileList();
  };

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      editImageModalVisible,
      srcCropper,
      aspectRatio,
      loadings
    } = this.state;
    // 上传按钮
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        {this.props.data && this.props.data.num ? (
          <Upload
            headers={{
              UTOKEN: Storage.get("token")
            }}
            data={this.props.data}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={this.fnbeforeUpload}
            onPreview={this.fnHandlePreview}
            // onChange={this.fnHandleChange}
            onRemove={this.fnRemove}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
        ) : (
          <Upload
            headers={{
              UTOKEN: Storage.get("token")
            }}
            data={this.props.data}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={this.fnbeforeUpload}
            onPreview={this.fnHandlePreview} //预览图片
            // onChange={this.fnHandleChange}  //上传完成
            onRemove={this.fnRemove} //删除
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        )}

        {/* 裁剪弹窗 */}
        <Modal
          key="1"
          onCancel={() => {
            this.setState({ editImageModalVisible: false });
          }}
          visible={editImageModalVisible}
          // loading={this.props.loading}
          footer={[
            <Button
              type="primary"
              onClick={() => this.fnSave()}
              loading={loadings}
            >
              保存
            </Button>,
            <Button
              onClick={() => {
                this.setState({ editImageModalVisible: false });
              }}
            >
              取消
            </Button>
          ]}
          style={{ width: 800 }}
        >
          <Cropper
            src={srcCropper} //图片路径，即是base64的值，在Upload上传的时候获取到的
            ref="cropper"
            style={{ height: 400 }}
            aspectRatio={aspectRatio} //image的纵横比
            //guides={true} //显示在裁剪框上方的虚线
            preview=".cropper-preview"
            className="company-logo-cropper"
            // viewMode={1} //定义cropper的视图模式
            zoomable={true} //是否允许放大图像
            // guides={true} //显示在裁剪框上方的虚线
            dragMode={"none"} //不新建裁剪框
            // dragMode={"move"} //移动画布
            cropBoxResizable={false} //是否通过拖动来调整裁剪框的大小
            background={false} //是否显示背景的马赛克
            rotatable={false} //是否旋转
            crop={() => this.crop()}
          />
        </Modal>

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

export default Dupload;
