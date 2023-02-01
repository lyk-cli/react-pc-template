/* eslint-disable */
import React, { Component } from "react";
import { Upload, Icon, Modal, message, Button, Spin } from "antd";
import Cropper from "react-cropper";
// import lrz from "lrz";
import { Session as Storage } from "Utils/storage";
import axios from "axios";
import { BASE_API } from "Config";
import API from "Utils/api";
import {
  findFilePathByAttachmentId,
  findFilePathByObjectId
} from "Utils/helper";
import {
  findFileByObjectIdAndType,
  findFilePathById,
  deleteFileById
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

class CropDupload extends Component {
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
    if (this.props.type === "attachmentId") {
      this.getImageByObject(this.props.data, false, "init");
    } else if (this.props.type === "objectId") {
      this.getImageByObject(this.props.data, true, "init");
    } else if (this.props.type === "fileList") {
      this.setFileList(this.props.initFileList);
    } else {
      this.getFileList();
    }
  }

  setFileList = (fileList) => {
    fileList = fileList.map(item => {
      let url = findFilePathByAttachmentId(item.id);
      return {
        uid: item.id,
        status: "done",
        url // 返回封装好的file对象
      }
    })
    this.setState({
      fileList
    }, () => {
      // this.props.fileList(this.props.data.type, this.state.fileList);
    });
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
    console.log(777777777, "getFileList");
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
    let format = this.props.data.type;
    let name = file.name.split(".")[file.name.split(".").length - 1];

    //图片格式
    if (
      format === "NPLUS_SECTION_ONE_IMG" ||
      format === "NPLUS_SECTION_TWO_IMG" ||
      format === "NPLUS_SECTION_THR_IMG"
    ) {
      const isJpgOrPng = ["svg", "png"].includes(name.toLowerCase());
      if (!isJpgOrPng) {
        message.error("不支持您所上传的图片格式");
        return false;
      }
    } else {
      // const isJpgOrPng = name === "jpg" || name === "jpeg" || name === "png";
      const isJpgOrPng = ["png", "jpeg", "jpg"].includes(name.toLowerCase());
      if (!isJpgOrPng) {
        message.error("上传图片格式需为JPG/JPEG/PNG");
        return false;
      }
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

    var reader = new FileReader();
    console.log(444444, file);
    reader.readAsDataURL(file); //开始读取文件
    // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
    reader.onload = e => {
      this.setState({
        srcCropper: e.target.result, //cropper的图片路径
        selectImgName: file.name, //文件名称
        selectImgType: file.type, // 文件类型全名
        selectImgSize: file.size / 1024 / 1024, //文件大小
        selectImgSuffix: file.type.split("/")[1], //文件类型后缀
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
          .toDataURL(this.state.selectImgType, compressionRatio);

        while (cropperData.length / 1024 > 500 && compressionRatio > 0.1) {
          compressionRatio -= 0.1;
          cropperData = this.refs.cropper
            .getCroppedCanvas()
            .toDataURL("image/*", compressionRatio);
        }

        var file = dataURLtoFile(cropperData, this.state.selectImgName);

        var formdata1 = new FormData(); // 创建form对象
        formdata1.append("file", file.file); // 通过append向form对象添加数据,可以通过append继续添加数据
        formdata1.append("objectId", this.props.data.objectId); //"16161654343464546"
        formdata1.append("type", this.props.data.type);
        formdata1.append("num", true);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            UTOKEN:
              Storage.get("token") ||
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmYWlyeWxhbmQiLCJ0eXBlIjoiaW5zaWRlIiwiZXhwIjoxNTkyMjkyOTk3MDIzLCJ1c2VySWQiOiIxMjY1ODIzNTg0MjEzNjkyNDE4IiwiaWF0IjoxNTkyMjkxMTk3MDIzfQ.EcK8D_rmE2yJo81-rYXaB7mVRg7vb1raodeCWgfZsFM"
          }
        };
        this.props.setIsUploading && this.props.setIsUploading(true);
        axios
          .post(BASE_API + API.common.uploadFile, formdata1, config)
          .then(response => {
            this.props.setIsUploading && this.props.setIsUploading(false);
            if (response.data.data) {
              const { data = {} } = response.data || {};
              const { id: uid } = data;
              let url = findFilePathByAttachmentId(uid);
              // 返回封装好的file对象
              let fileList = [
                {
                  uid,
                  status: "done",
                  url
                }
              ];
              console.log("上传成功之前:", this.state.fileList);
              let oldFileList = JSON.parse(JSON.stringify(this.state.fileList));
              this.setState({ fileList, loadings: false }, async () => {
                console.log("上传成功之后:", this.state.fileList);
                if (this.props && this.props.fileList) {
                  this.props.fileList(
                    this.props.data.type,
                    this.state.fileList
                  );
                }
                oldFileList.length !== 0 &&
                  (await deleteFileById({ id: oldFileList[0].uid }));
              });
            }
          });
      }
    );
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

  render() {
    const { firstImag } = this.props; // 只有一张图片
    const {
      previewVisible,
      previewImage,
      fileList,
      editImageModalVisible,
      srcCropper,
      aspectRatio,
      loadings
    } = this.state;
    let width = this.props.size ? this.props.size.width : 200;
    let height = this.props.size ? this.props.size.height : 200;
    // 上传按钮
    const uploadButton = (
      <Spin spinning={loadings}>
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">点击上传</div>
        </div>
      </Spin>
    );

    return (
      <div className={`clearfix ${this.props.className || ""}`}>
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
            disabled={this.props.disabled}
          >
            {fileList.length >= 3 || this.props.disabled ? null : uploadButton}
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
            disabled={this.props.disabled}
          >
            {fileList.length >= 1 || this.props.disabled ? null : uploadButton}
          </Upload>
        )}

        {/* 裁剪弹窗 */}
        <Modal
          key="1"
          destroyOnClose={true}
          maskClosable={false}
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
            movable={true}
            //className={Style.crop}
            ref="cropper"
            src={srcCropper}
            style={{ height: "500px" }}
            // style={{ maxHeight: "100%", width: "100%" }}
            //0-默认-没有任何限制 1-限制裁剪框不超过canvas画布边缘 2-如果是长图-限制图片不超过cropper的最高可视区域-同时裁剪框不超过canvas画布边缘
            // viewMode={0}
            viewMode={1}
            dragMode="move"
            // dragMode="move"
            // minCanvasWidth={285}
            // //隐藏棋盘背景色
            background={false}
            // //裁剪框内部的横竖虚线可见
            // guides={true}
            // //裁剪框内部的十字线可见
            // center={false}
            // //可旋转原图
            // rotatable={true}
            // //可缩放原图
            // cropBoxMovable={false}
            scalable={true}
            // 裁剪比列
            aspectRatio={width / height}
            // 不可裁剪
            // cropBoxResizable={false}
            // 最小裁剪width
            minCropBoxWidth={width}
            // 最小裁剪height
            minCropBoxHeight={height}
            // 固定图片大小，不能裁剪
            data={{ width, height }}
          />
        </Modal>

        {/* 图片预览 */}
        <Modal
          visible={previewVisible}
          destroyOnClose={true}
          footer={null}
          onCancel={this.fnHandleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default CropDupload;
