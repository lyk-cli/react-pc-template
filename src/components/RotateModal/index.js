import React, { Component } from "react";
import { Modal } from "antd";
import Rotate from "Static/images/rotate.png";

export class RotateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      deg: 0,
      imgStyle: {
        width: "80%",
        verticalAlign: "middle"
      }
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ deg: 0 });
  }
  xuan() {
    var deg = this.state.deg;
    deg += 90;
    this.setState({
      deg,
      imgStyle:
        (deg / 90) % 2 != 0
          ? {
              width: "60%"
            }
          : {
              width: "80%"
            }
    });
    // transform:rotate(7deg);
    // -ms-transform:rotate(7deg);  /* IE 9 */
    // -moz-transform:rotate(7deg);     /* Firefox */
    // -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
    // -o-transform:rotate(7deg);   /* Opera */
    console.log(123, document.getElementsByClassName("preview-img"));
    document.getElementsByClassName("preview-img")[0].style.transform =
      "rotate(" + deg + "deg)";
    document.getElementsByClassName("preview-img")[0].style.WebkitTransform =
      "rotate(" + deg + "deg)";
    document.getElementsByClassName("preview-img")[0].style.MozTransform =
      "rotate(" + deg + "deg)";
    document.getElementsByClassName("preview-img")[0].style.OTransform =
      "rotate(" + deg + "deg)";
    document.getElementsByClassName("preview-img")[0].style.MsTransform =
      "rotate(" + deg + "deg)";
  }

  render() {
    const { url } = this.props;
    return (
      <div>
        <Modal {...this.props} width="80%" footer={null} destroyOnClose={true}>
          <div
            style={{
              background: "#000",
              marginTop: "20px",
              lineHeight: "700px",
              textAlign: "center",
              position: "relative"
            }}
          >
            <img
              className="preview-img"
              alt="example"
              style={this.state.imgStyle}
              src={url}
            />
            <img
              src=""
              style={{
                position: "absolute",
                width: "50px",
                top: "4px",
                left: "0",
                right: "0",
                margin: "auto",
                background: "rgba(0,0,0,.2)",
                borderRadius: "25px"
              }}
              src={Rotate}
              onClick={() => this.xuan()}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default RotateModal;
