/* eslint-disable no-unused-vars */
/**
 * Main
 */
import React, { Suspense, lazy } from "react";
import { Layout, Modal, Icon } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "Components/Loading";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { menuAction } from "./action";
import { logoutAction } from "../Login/action";
import { Session as Storage } from "Utils/storage";
import Request from "Utils/request";
import API from "Utils/api";

import { DictContext } from "Contexts/DictContext";
import { PermissionContext } from "Contexts/PermissionContext";
import { Session } from "Utils/storage";

const { Header, Sider, Content } = Layout;
import Menu from "./component/Menu";
import Bread from "./component/Bread";
import HeaderNav from "./component/Header";
import { menuConfig } from "./menu.js";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../Home"));
//系统配置      一级菜单
const SystemConfig = lazy(() =>
  import(/* webpackChunkName: "systemConfig" */ "../SystemConfig")
);
//个人名片      一级菜单
const BusinessCard = lazy(() =>
  import(/* webpackChunkName: "systemConfig" */ "../BusinessCard")
);

import Style from "./style";
class Main extends React.Component {
  state = {
    collapsed: false,
    menu: menuConfig, // 菜单按钮配置
    permission: [] // 控制菜单按钮权限
  };

  async componentDidMount() {
    this.loadMenu();
    this.loadDcit();
  }
  // 加载菜单
  loadMenu = async () => {
    // let response = await Request({
    //   url: API.common.menu,
    //   method: "POST"
    // });
    // if (response.status) {
    //   this.setState({ menu: response.data });
    // }
  };
  // 加载字典
  loadDcit = async () => {
    // load dict
    // const dict = Session.get("dict");
    // let response2 = await Request({
    //   url: API.common.dict
    // });
    // if (response2.status) {
    //   this.setState({ dict: response2.data });
    //   Session.set("dict", response2.data);
    // } else {
    //   this.setState({ dict });
    // }
  };

  fnToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  fnLogout = () => {
    Modal.confirm({
      title: "提示信息",
      content: "确认退出吗?",
      onOk: () => {
        Storage.clear();
        this.props.logoutAction();
        this.props.history.replace("/login");
      }
    });
  };

  render() {
    const { menu = [], permission = [] } = this.state;
    return (
      <div className={Style.main}>
        <DictContext.Provider value={this.state.dict}>
          <PermissionContext.Provider value={{ permission }}>
            <HeaderNav onLogout={this.fnLogout}></HeaderNav>
            <Layout className={Style.layout}>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                className={Style.menu}
              >
                <Menu data={menu} collapsed={this.state.collapsed} />
              </Sider>
              <Layout>
                <Header style={{ background: "#fff", padding: 0, height: 0 }}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.fnToggle}
                    style={{
                      display: "inline-block",
                      position: "absolute",
                      fontSize: "26px",
                      color: "#3e8fd4"
                    }}
                  />
                </Header>
                <Content
                  style={{
                    padding: "0 24px",
                    minHeight: "85vh"
                  }}
                >
                  <Bread data={menu} />
                  <Suspense fallback={<Loading />}>
                    <Switch>
                      <Route path={`/home`} component={Home} />
                      <Route path={`/systemConfig`} component={SystemConfig} />
                      <Route path={`/businessCard`} component={BusinessCard} />
                      <Redirect to={`/${menu && (menu[0] && menu[0].url)}`} />
                    </Switch>
                  </Suspense>
                </Content>
              </Layout>
            </Layout>
          </PermissionContext.Provider>
        </DictContext.Provider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menus: state.mainReducer.menus,
  userInfo: state.loginReducer.userInfo
});

const mapDispatchToProps = dispatch => ({
  menuAction: bindActionCreators(menuAction, dispatch),
  logoutAction: bindActionCreators(logoutAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
