/* eslint-disable */
import React, { Component } from "react";
import { Upload, message, Modal, Divider, Button } from "antd";
import Cropper from "react-cropper";
import lrz from "lrz";
import "./avatar.less";
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// }
//将base64转换为文件
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
// function beforeUpload(file) {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// }

class Avatar extends Component {
  state = {
    loading: false,
    srcCropper: "",
    previewImage: "",
    selectImgSize: "0",
    selectImgName: "",
    selectImgSuffix: "",
    submitting: false,
    disabledUpload: true,
    previewVisible: false,
    uploadedImageFile: "",
    selectedImageFile: "",
    editImageModalVisible: false
  };

  fnHandleChange() {
    // if (info.file.status === "uploading") {
    //   this.setState({ loading: true });
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     this.setState({
    //       imageUrl,
    //       loading: false
    //     })
    //   );
    // }
    this.setState({
      imageUrl: this.state.imgbase
    });
  }
  fnbeforeUpload(file) {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      //添加文件限制
      MsgBox.error({ content: "文件大小不能超过10M" });
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
  }
  saveImg() {
    // console.log(1111, this.state.imgbase);
  }
  crop() {
    const _this = this;
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL(),"wwwwww")
    // lrz压缩
    // this.refs.cropper.getCroppedCanvas().toDataURL() 为裁剪框的base64的值
    lrz(this.refs.cropper.getCroppedCanvas().toDataURL(), {
      quality: 0.6
    }).then(results => {
      this.setState({
        imgbase: results.base64
      });
      // results为压缩后的结果
      // _this.props.uploadImgByBase64({
      //   //uploadImgByBase64为连接后台的接口
      //   imgbase: results.base64, //取base64的值传值
      //   imgsize: results.fileLen, //压缩后的图片大下
      //   suffix: _this.state.selectImgSuffix, //文件类型
      //   filename: _this.state.selectImgName //文件名
      // });
    });
  }
  render() {
    let { imgbase, editImageModalVisible, srcCropper, imageUrl } = this.state;
    const uploadButton = <div>点击上传</div>;
    return (
      <div>
        <Upload
          name="avatar"
          //listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={this.fnbeforeUpload.bind(this)}
          //onChange={this.fnHandleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        <Modal
          key="1"
          onCancel={() => {
            this.setState({ editImageModalVisible: false });
          }}
          visible={editImageModalVisible}
          loading={this.props.loading}
          footer={[
            <Button
              type="primary"
              onClick={() => this.fnHandleChange()}
              loading={this.props.loading}
            >
              保存
            </Button>,
            <Button
              onClick={() => {
                this.setState({ editImageModalVisible: false });
              }}
              loading={this.props.loading}
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
            aspectRatio={75 / 75} //image的纵横比
            //guides={true} //显示在裁剪框上方的虚线
            preview=".cropper-preview"
            className="company-logo-cropper"
            // viewMode={1} //定义cropper的视图模式
            zoomable={false} //是否允许放大图像
            // guides={true} //显示在裁剪框上方的虚线
            background={false} //是否显示背景的马赛克
            rotatable={false} //是否旋转
            crop={() => this.crop()}
          />
          {/* 图片预览 */}
          <Divider>图片预览</Divider>
          <img
            src={imgbase || ""}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </Modal>
      </div>
    );
  }
}

export default Avatar;
