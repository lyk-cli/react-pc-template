/* eslint-disable */
/**
 * 更多文档：https://www.yuque.com/braft-editor/be/
 *
 *
 * */

import React, { PureComponent } from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import styles from "./editor.less";
import { Session as Storage } from "Utils/storage";
import axios from "axios";
import { BASE_API } from "Config";
import API from "Utils/api";
import {
  findFilePathByAttachmentId,
  findFilePathByObjectId,
  fileToDataURL
} from "Utils/helper";
import {
  findFileByObjectIdAndType,
  findFilePathById,
  deleteFileById
} from "../Upload/server";
import { fontSizes, controls, fontFamilies, mediaItems } from "./constant";
import { message } from "antd";
//import { connect } from "react-redux";
//import { gupfetch } from "../UpLoad/redux/actions";

class Editor extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      editorState: "",
      defaultValue: ""
    };
  }
  componentDidMount() {
    const { importContent } = this.props;
    console.log("componentDidMount---", importContent);

    // 获取媒体库实例
    this.braftFinder = this.editorInstance.getFinderInstance();

    // 向媒体库添加图片
    // this.addMediaItem(mediaItems);

    if (importContent) {
      return {
        defaultValue: BraftEditor.createEditorState(importContent),
        importContent
      };
    }


    //this.props.gupfetch();

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { importContent } = nextProps;
    console.log("getDerivedStateFromProps---", importContent);
    if (importContent !== prevState.importContent) {
      return {
        defaultValue: BraftEditor.createEditorState(importContent),
        editorState: BraftEditor.createEditorState(importContent),
        importContent
      };
    }
    return null;
  }
  // submitContent = () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = this.state.editorState.toHTML();
  // };

  handleEditorChange = editorState => {
    // console.log(77777777, this.braftFinder.getItems());

    this.setState({ editorState });
    let html = editorState.toHTML();
    // this.setState({ editorState, html });
    this.props.cbReceiver(html);
  };

  addMediaItem = (mediaItems) => {
    // 使用braftFinder.addItems来添加媒体到媒体库
    this.braftFinder.addItems(mediaItems);
  }

  // 媒体上传
  myUploadFn = param => {
    fileToDataURL(param.file, (url) => {
      param.success({
        url,
        meta: {
          // id: "1",
          // width: "200",
          // height: "200",
          title: "1",
          alt: param.file.fileName
        }
      });
    });


    // const { uploadParam } = this.props;
    // console.log(param, 888, uploadParam);

    // var formdata1 = new FormData(); // 创建form对象
    // formdata1.append("file", param.file); // 通过append向form对象添加数据,可以通过append继续添加数据
    // formdata1.append("objectId", this.props.data.objectId); //"16161654343464546"
    // formdata1.append("type", this.props.data.type);
    // formdata1.append("num", true);
    // let config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     UTOKEN:
    //       Storage.get("token") ||
    //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmYWlyeWxhbmQiLCJ0eXBlIjoiaW5zaWRlIiwiZXhwIjoxNTkyMjkyOTk3MDIzLCJ1c2VySWQiOiIxMjY1ODIzNTg0MjEzNjkyNDE4IiwiaWF0IjoxNTkyMjkxMTk3MDIzfQ.EcK8D_rmE2yJo81-rYXaB7mVRg7vb1raodeCWgfZsFM"
    //   }
    // };
    // axios
    //   .post(BASE_API + API.common.uploadFile, formdata1, config)
    //   .then(response => {
    //     if (response.data.data) {
    //       const { data = {} } = response.data || {};
    //       const { id: uid } = data;
    //       let url = findFilePathByAttachmentId(uid);

    //       console.log(8888888, url);
    //       // 假设服务端直接返回文件上传后的地址
    //       // 上传成功后调用param.success并传入上传后的文件地址
    //       param.success({
    //         url: `
    //         `,
    //         meta: {
    //           // id: "1",
    //           width: "200",
    //           height: "200",
    //           title: "1",
    //           alt: "image"
    //         }
    //       });
    //     }
    //   });
  };

  // 图片上传之前校验
  myValidateFn = (file) => {
    let name = file.name.split(".")[file.name.split(".").length - 1];

    // 1. 校验图片格式
    const isJpgOrPng = ["png", "jpeg", "jpg"].includes(name.toLowerCase());
    if (!isJpgOrPng) {
      message.error("上传图片格式需为JPG/JPEG/PNG");
      return false;
    }

    // 2. 校验图片上传大小限制
    // 2.1 父组件传递过来的自定义校验图片大小的
    let { getUploadSizeError } = this.props;
    if (typeof getUploadSizeError === "function") {
      let uploadSizeError = getUploadSizeError(file.size);
      if (uploadSizeError) {
        message.error(uploadSizeError);
        return false;
      }
    }

    return true;
  }

  render() {
    const { uploadParam } = this.props;
    const { editorState, defaultValue } = this.state;

    console.log("-----defaultValue", defaultValue);

    return (
      <BraftEditor
        ref={instance => this.editorInstance = instance}
        imageResizable    // 是否允许拖动调整图片尺寸
        // converts={{ blockExportFn: myBlockExport }}
        // forceNewLine={false}

        // https://braft.margox.cn/demos/media
        media={{
          uploadFn: this.myUploadFn,
          validateFn: this.myValidateFn
          // items: mediaItems
        }}
        className={styles.edit}
        //value={editorState} //动态赋值会造成光标位移
        defaultValue={defaultValue}   // 默认值
        fontFamilies={fontFamilies}   // 指定编辑器可用的字体列表
        fontSizes={fontSizes}         // 指定编辑器可用的字号列表，仅支持数字
        controls={controls}           // 指定编辑器工具栏的控件列表
        onChange={this.handleEditorChange}  // 文本编辑器改变触发

        // onSave={this.submitContent}  
        readOnly={this.props.readOnly ? true : false}   // 是否只读
      />
    );
  }
}

export default Editor;
//例子

{
  /* 
  import Editor from "Components/Editor/editor.js";
receiveHtml = (html) => {
  // var { baseInfo } = this.state;
  // baseInfo.description = html;
  this.setState({
    description: html,
  });
};
  <Editor
audio={false}
video={false}
image={false}
cbReceiver={this.receiveHtml}
importContent={this.state.description}
/> */
}
