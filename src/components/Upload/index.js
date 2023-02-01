/**
 * Upload 上传组件
 * 1.文件类型: 1图片 2文件
 * 2.上传方式： 1前台上传  2后台上传
 * 3.判断: 大小 类型
 * 4.是否可上传
 */

import React from "react";
import { Upload as AntUpload, message, Button, Modal, Icon } from "antd";
import Requset from "Utils/request";
import API from "Utils/api";
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fileList: props.value || [],
      previewImage: null
    };
  }

  /**
   * validate
   */
  beforeUpload = file => {
    const { type } = this.props;
    if (type === "image") {
      if (!file.type.includes("image")) {
        message.error("请上传图片！");
        return false;
      }
    } else if (type === "excel") {
      if (!file.type.includes("application/excel")) {
        message.error("请上传excel！");
        return false;
      }
    } else {
      message.error("非法上传");
      return false;
    }
  };

  /**
   * upload
   */
  fnUpload = async e => {
    let file = e.file;
    console.log(file);
    if (!file) return;

    this.setState({ loading: true });
    // token
    let tokenResponse = await Requset({
      url: API.common.uploadToken
    });

    let result = await Requset({
      method: "post",
      url: API.common.upload,
      data: {
        file,
        token: tokenResponse.data,
        key: "test/" + file.name
      },
      headers: {
        "Content-Type": "multipart/form-data", //???
        Accept: "application/json"
      }
    });

    // if (result.code === 200) {
    this.setState(
      state => ({
        loading: false,
        // fileList: [...state.fileList, result.data]
        fileList: [
          ...state.fileList,
          { url: "http://jay.aliyuntao.top/" + result.key, uid: result.hash }
        ]
      }),
      () => this.props.onChange(this.state.fileList)
    );
    // }
  };

  /**
   * preview
   */
  fnPreview = file => {
    this.setState({
      previewImage: file
    });
  };

  /**
   * cancle preview
   */
  fnPreviewCancle = () => {
    this.setState({ previewImage: null });
  };

  /**
   * remove
   */
  fnRemove = file => {
    const { fileList } = this.state;
    const index = fileList.findIndex(item => item.url === file.url);
    fileList.splice(index, 1);
    this.setState({ fileList }, () => this.props.onChange(this.state.fileList));
  };

  render() {
    const { number, type, disabled } = this.props;
    const { fileList = [], loading, previewImage } = this.state;
    // uid
    fileList.map(
      item => (item.uid = item.uid ? item.uid : item.id || item._id)
    );

    return (
      <div>
        {/* upload */}
        <AntUpload
          fileList={fileList}
          listType={type === "image" ? "picture-card" : "text"}
          beforeUpload={this.beforeUpload}
          // eslint-disable-next-line react/jsx-handler-names
          customRequest={this.fnUpload}
          onRemove={this.fnRemove}
          onPreview={type === "image" && this.fnPreview}
          showUploadList={{
            showRemoveIcon: !disabled,
            showPreviewIcon: true
          }}
        >
          {/* 上传按钮 */}
          {/* 判断是图片还是文件，如果是图片，超过上传个数则隐藏上传按钮，如果是文件，超过个数则disable按钮 */}
          {type === "image" ? (
            fileList.length < number && (
              <div>
                <Icon type={loading ? "loading" : "plus"} />
                <div>上传</div>
              </div>
            )
          ) : (
            <Button disabled={disabled || fileList.length >= number}>
              <Icon type={loading ? "loading" : "upload"} />
              上传
            </Button>
          )}
        </AntUpload>

        {/* preview */}
        {previewImage && (
          <Modal visible={true} footer={null} onCancel={this.fnPreviewCancle}>
            <img
              alt={previewImage.name}
              style={{ width: "100%" }}
              src={previewImage.url}
            />
          </Modal>
        )}
      </div>
    );
  }
}

Upload.defaultProps = {
  number: 1,
  type: "image",
  disabled: false
};

export default Upload;
