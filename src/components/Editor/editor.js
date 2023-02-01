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
    this.setState({ editorState });
    let html = editorState.toHTML();
    // this.setState({ editorState, html });
    this.props.cbReceiver(html);
  };

  // blockExportFn = (contentState, block) => {
  //   const previousBlock = contentState.getBlockBefore(block.key);

  //   if (block.type === "unstyled" && previousBlock && previousBlock.getType() === "atomic") {
  //     return {
  //       start: "",
  //       end: "",
  //     };
  //   }
  // };
  render() {
    const { uploadParam } = this.props;
    const { editorState, defaultValue } = this.state;

    console.log("-----defaultValue", defaultValue);
    const set = [
      "undo",
      "redo",
      "separator",
      "font-size",
      "font-family",
      "line-height",
      "letter-spacing",
      "separator",
      "text-color",
      "bold",
      "italic",
      "underline",
      "strike-through",
      "separator",
      "superscript",
      "subscript",
      "remove-styles",
      // "emoji",//bug-12227-cwj liujiadan 让去掉的
      "separator",
      "text-indent",
      "text-align",
      "separator",
      "headings",
      "list-ul",
      "list-ol",
      "blockquote",
      "code",
      "separator",
      "link",
      "separator",
      "hr",
      "separator",
      "media",
      "separator",
      "clear"
    ];

    let fontFamilies = [];
    var agent = navigator.userAgent.toLowerCase();
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (
      agent.indexOf("win32") >= 0 ||
      agent.indexOf("wow32") >= 0 ||
      agent.indexOf("win64") >= 0 ||
      agent.indexOf("wow64") >= 0
    ) {
      fontFamilies = [
        {
          name: "Araial",
          family: "Arial, Helvetica, sans-serif"
        },
        {
          name: "Georgia",
          family: "Georgia, serif"
        },
        {
          name: "Impact",
          family: "Impact, serif"
        },
        {
          name: "Monospace",
          family: '"Courier New", Courier, monospace'
        },
        {
          name: "Tahoma",
          family: 'tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif'
        },
        {
          name: "黑体",
          family: "SimHei, 黑体"
        },
        {
          name: "宋体",
          family: "SimSun, 宋体"
        },
        {
          name: "仿宋",
          family: "FangSong, 仿宋"
        },
        {
          name: "新宋体",
          family: "NSimSun, 新宋体"
        },
        {
          name: "楷体",
          family: "KaiTi, 楷体, Helvetica, sans-serif"
        },
        {
          name: "微软雅黑",
          family: "微软雅黑, Microsoft YaHei , Helvetica, sans-serif"
        },
        {
          name: "微软正黑体",
          family: "微软正黑体, Microsoft JhengHei , Helvetica, sans-serif"
        }
      ];
    }
    if (isMac) {
      fontFamilies = [
        {
          name: "Araial",
          family: "Arial, Helvetica, sans-serif"
        },
        {
          name: "Georgia",
          family: "Georgia, serif"
        },
        {
          name: "Impact",
          family: "Impact, serif"
        },
        {
          name: "Monospace",
          family: '"Courier New", Courier, monospace'
        },
        {
          name: "Tahoma",
          family: 'tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif'
        },
        {
          name: "华文黑体",
          family: "STHeiti, 华文黑体"
        },
        {
          name: "华文宋体",
          family: "STSong, 华文宋体"
        },
        {
          name: "华文仿宋",
          family: "STFangsong, 华文仿宋"
        },
        {
          name: "华文楷体",
          family: "STKaiti, 华文楷体"
        },
        {
          name: "冬青黑体简",
          family: "Hiragino Sans GB, 冬青黑体简"
        },
        {
          name: "兰亭黑",
          family: "Lantinghei SC, 兰亭黑"
        },
        {
          name: "宋体",
          family: "Songti SC, 宋体"
        },
        {
          name: "娃娃体",
          family: "Wawati SC, 娃娃体"
        }
      ];
    }

    const fontSizes = [
      // 1,
      // 4,
      // 8,
      12,
      14,
      16,
      18,
      20,
      24,
      28,
      30,
      32,
      36,
      40,
      48,
      56,
      64,
      72,
      96,
      120,
      144
    ];

    // const myBlockExport = (contentState, block) => {
    // const previousBlock = contentState.getBlockBefore(block.key);
    //
    // if (
    //   block.type === "unstyled" &&
    //   previousBlock &&
    //   previousBlock.getType() === "atomic"
    // ) {
    //   return {
    //     start: "",
    //     end: ""
    //   };
    // }
    // };
    const myUploadFn = param => {
      const { uploadParam } = this.props;

      const serverURL = uploadParam.host;
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      // 文件名时间戳
      const time = new Date().getTime();
      const fileName = `${param.id + time}.${
        param.file.name.split(".")[param.file.name.split(".").length - 1]
      }`;
      fd.append("name", param.file.name);
      fd.append("Filename", `${uploadParam.dir}/${fileName}`);
      fd.append("key", `${uploadParam.dir}/${fileName}`);
      fd.append("policy", uploadParam.policy);
      fd.append("OSSAccessKeyId", uploadParam.accessid);
      fd.append("success_action_status", "200");
      fd.append("signature", uploadParam.signature);
      fd.append("file", param.file);
      xhr.open("POST", serverURL, true);
      xhr.send(fd);

      const successFn = response => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
          url: `${uploadParam.host}/${uploadParam.dir}/${fileName}`,
          meta: {
            id: "1",
            title: "1",
            alt: "image"
          }
        });
      };

      const errorFn = response => {
        // 上传发生错误时调用param.error
        param.error({
          msg: "unable to upload."
        });
      };

      // 上传成功的时候
      xhr.addEventListener("load", successFn, false);
      // 上传失败
      xhr.addEventListener("error", errorFn, false);
      xhr.addEventListener("failed ", errorFn, false);
    };

    return (
      <BraftEditor
        imageResizable
        // converts={{ blockExportFn: myBlockExport }}
        // forceNewLine={false}
        media={{ uploadFn: myUploadFn }}
        className={styles.edit}
        //value={editorState} //动态赋值会造成光标位移
        defaultValue={defaultValue}
        fontFamilies={fontFamilies}
        fontSizes={fontSizes}
        controls={set}
        onChange={this.handleEditorChange}
        // onSave={this.submitContent}
        readOnly={this.props.readOnly ? true : false}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    uploadParam: state.uploadParam.param
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gupfetch: () => dispatch(gupfetch())
  };
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Editor);
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
