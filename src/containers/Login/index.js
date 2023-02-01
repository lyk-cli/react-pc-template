/* eslint-disable  */
/**
 * login
 */
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";
import { Form, Input, Button, Avatar, Modal, Row, Col } from "antd";
import { Toast } from "Components";
import intl from "react-intl-universal";
import Style from "./style";
import { Session as Storage } from "Utils/storage";
import { send, validate } from "./service";

const { Search } = Input;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: props.token || false,
      maskPhoneNo: "",
      phoneNo: "",
      visible: false,
      code: ""
    };
  }
  /**
   * login
   */
  fnLogin = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        // hard code
        values.type = "INSIDE";

        await this.props.loginAction(values, async () => {});
        //如图是管理员进行手机号验证
        let info = Storage.get("info");
        this.setState({
          maskPhoneNo: info && info.maskPhoneNo,
          phoneNo: info && info.phoneNo
        });

        this.setState({ redirectToReferrer: true });
        // if (info && info.isAdmin == "N") {
        //   this.setState({ redirectToReferrer: true });
        // }
        // if (info && info.isAdmin == "Y") {
        //   this.setState({ visible: true, redirectToReferrer: false });
        // }
      }
    });
  };

  /**
   * change language
   */
  fnChangeLanguage = e => {
    localStorage.setItem("lang", e.target.value);
    window.location.reload();
  };
  getCode(code) {
    this.setState({
      code
    });
  }
  fnOK = async () => {
    let params = {
      mobile: this.state.phoneNo,
      code: this.state.code
    };
    let response = await validate(params);
    if (response.code == 0) {
      let info = Storage.get("info");
      Storage.set("token", info.utoken);
      this.setState({ visible: false, redirectToReferrer: true });
      window.location.reload();
    }
  };

  render() {
    const { redirectToReferrer, maskPhoneNo, phoneNo } = this.state;

    if (redirectToReferrer) {
      const { from } = this.props.location.state || {
        from: { pathname: "/" } // default site
      };
      return <Redirect to={from} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={Style.login}>
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#fff"
          }}
        >
          {/* <select
            onChange={this.fnChangeLanguage}
            className="changeLanguage"
            style={{ width: 150 }}
          >
            <option value="" disabled="">
              {intl.get("changeLanguage")}
            </option>
            <option value="zh_CN">中文</option>
            <option value="en_US">English</option>
          </select> */}
        </div>
        <div className={Style.center}>
          <div className={Style.rightimg}>
            <img src={require("./image/left.png")} />
          </div>
          <div className={Style.leftform}>
            <Form
              onSubmit={this.fnLogin}
              className={Style.loginform}
              autoComplete="off"
            >
              <div className={Style.logo}>
                <img src={require("Static/images/logo.jpg")} />
              </div>
              <div className={Style.title}>后端管理系统</div>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: intl.get("please.input") + intl.get("username")
                    }
                  ],
                  initialValue: ""
                })(
                  <Input
                    autocomplete="off"
                    autoComplete="off"
                    prefix={
                      <Avatar
                        size={18}
                        icon="user"
                        shape="square"
                        style={{
                          color: "rgba(0,0,0,.25)",
                          fontSize: 18,
                          background: "#fff"
                        }}
                      />
                    }
                    placeholder={intl.get("username")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: intl.get("please.input") + intl.get("password")
                    }
                  ]
                })(
                  <Input
                    autocomplete="off"
                    autoComplete="off"
                    prefix={
                      <Avatar
                        size={18}
                        icon="lock"
                        style={{
                          color: "rgba(0,0,0,.25)",
                          fontSize: 18,
                          background: "#fff"
                        }}
                      />
                    }
                    type="password"
                    placeholder={intl.get("password")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={Style.button}
                >
                  {intl.get("login")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Modal
          title="登录"
          visible={this.state.visible}
          footer={
            <div style={{ textAlign: "center" }}>
              <Button onClick={() => this.setState({ visible: false })}>
                取消
              </Button>
              <Button type="primary" onClick={() => this.fnOK()}>
                确认
              </Button>
            </div>
          }
          onCancel={() => {
            this.setState({
              visible: false
            });
          }}
        >
          <Row>
            <Col span={4}>手机号：</Col>
            <Col span={16}>
              <Input
                name="mobile"
                moneyKeyboardAlign="right"
                type="phone"
                placeholder="请输入"
                value={maskPhoneNo}
                disabled={true}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col span={4}>验证码：</Col>
            <Col span={16}>
              <Clock getCode={this.getCode.bind(this)} phoneNo={phoneNo} />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch)
});
// 验证码倒计时组件
let timeChange;
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      time: 60,
      btnContent: "获取验证码",
      smsCode: ""
    };
  }
  sendCode = async () => {
    console.log("this.props.mobile", this.props.phoneNo);
    if (!this.props.phoneNo) {
      Toast.fail("请输入手机号");
      return;
    }
    if (this.state.time >= 60) {
      var params = {
        mobile: this.props.phoneNo
      };
      let response = await send(params);
      if (response.code == 0) {
        this.setState({
          btnDisable: true,
          btnContent: "60s"
        });
        timeChange = setInterval(this.clock, 1000);
      }
    }
  };
  clock = () => {
    const { time } = this.state;
    let ti = time;
    if (ti > 0) {
      //当ti>0时执行更新方法
      ti = ti - 1;
      this.setState({
        time: ti,
        btnContent: ti + "s"
      });
    } else {
      //当ti=0时执行终止循环方法
      clearInterval(timeChange);
      this.setState({
        btnDisable: false,
        time: 60,
        btnContent: "获取验证码"
      });
    }
  };
  getCode = e => {
    console.log(e.target.value);
    this.props.getCode(e.target.value);
  };
  render() {
    return (
      <div className="resume">
        <Search
          placeholder="请输入验证码"
          enterButton={
            <span
              disabled={this.state.btnDisable}
              type="primary"
              style={{
                fontSize: "14px",
                height: "30px",
                lineHeight: "30px",
                padding: "0px 8px"
              }}
            >
              {this.state.btnContent}
            </span>
          }
          onChange={e => this.getCode(e)}
          onSearch={() => this.sendCode()}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "login" })(Login));
