/* eslint-disable */
/**
 * 菜单
 */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd"; // Avatar
import siderMenuClass from "./style";
import menu_1 from "Static/images/2.1.svg";
import menu_2 from "Static/images/2.2.svg";
import menu_3 from "Static/images/2.3.svg";
import menu_4 from "Static/images/2.4.svg";
import menu_5 from "Static/images/2.5.svg";
import menu_6 from "Static/images/2.6.svg";
import menu_7 from "Static/images/2.7.svg";
import menu_8 from "Static/images/2.8.svg";
import menu_9 from "Static/images/2.9.svg";
import menu_10 from "Static/images/2.10.svg";
import menu_11 from "Static/images/2.11.svg";
import menu_12 from "Static/images/2.12.svg";
import menu_13 from "Static/images/2.13.svg";
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: []
  };

  componentDidMount() {
    this.fnMenu();
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fnMenu();
    }
    return null;
  }

  fnOpenChange = openKeys => {
    const { data = [] } = this.props;
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (data.map(item => item.id).indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  fnMenu = () => {
    const { data = [] } = this.props;
    const {
      location: { pathname }
    } = this.props;

    // console.log("xxxx", pathname.split("/"), data);
    let name = pathname.split("/");

    const openKeys = [];
    const selectedKeys = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (openKeys.length !== 0) break;
      if (name.includes(item.url)) {
        if (item.children && item.children.length > 0) {
          for (let j = 0; j < item.children.length; j++) {
            const subItem = item.children[j];
            // if (pathname.indexOf(subItem.link) != -1) {
            if (name.includes(subItem.url)) {
              openKeys.push(item.id);
              selectedKeys.push(subItem.id);
              break;
            }
          }
        } else {
          // if (pathname.indexOf(item.link) != -1) {
          if (name.includes(item.url)) {
            openKeys.push(item.id);
            selectedKeys.push(item.id);
            break;
          }
        }
      }
    }

    this.setState({ openKeys, selectedKeys });
  };

  render() {
    const { data = [] } = this.props;
    const { openKeys, selectedKeys } = this.state;
    const defaultProps = this.props.collapsed ? {} : { openKeys };
    // console.log("xxxx", openKeys, selectedKeys);
    return (
      <Menu
        className={siderMenuClass.leftMenuBar}
        selectedKeys={selectedKeys}
        onOpenChange={this.fnOpenChange}
        subMenuOpenDelay={0}
        subMenuCloseDelay={0.1}
        theme="dark"
        style={{ height: "100%", borderRight: 0 }}
        {...defaultProps}
        mode={this.props.collapsed ? "vertical" : "inline"}
      >
        {data &&
          data.map(item => {
            if (!item.children) {
              return (
                <Menu.Item key={item.id}>
                  <Link to={`/${item.link || item.url}`}>
                    {/* <Icon type={"user"} /> */}
                    {/* <img src={ReportSvg} style={{ marginRight: 10 }} /> */}
                    <span>{item.name}</span>
                  </Link>
                </Menu.Item>
              );
            } else {
              return (
                <SubMenu
                  className={siderMenuClass.subMenu}
                  key={item.id}
                  title={
                    <div className={siderMenuClass.menuName}>
                      {/* <Icon type={"menu-unfold"} /> */}
                      {item.icon == "talentPool" ? (
                        <img src={menu_1} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "mcs" ? (
                        <img src={menu_3} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "evaluation" ? (
                        <img src={menu_4} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "Interview" ? (
                        <img src={menu_5} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "offer" ? (
                        <img src={menu_6} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "lptc" ? (
                        <img src={menu_7} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "material" ? (
                        <img src={menu_8} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "reportstatistics" ? (
                        <img src={menu_10} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "contentManage" ? (
                        <img src={menu_2} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "systemConfig" ? (
                        <img src={menu_11} style={{ margin: "0 5px 5px 0" }} />
                      ) : null}
                      {item.icon == "materialmanage" ? (
                        <img
                          src={menu_12}
                          style={{ margin: "0 5px 5px 0", width: "24px" }}
                        />
                      ) : null}
                      {item.icon == "employeeStyle" ? (
                        <img
                          src={menu_13}
                          style={{ margin: "0 5px 5px 0", width: "24px" }}
                        />
                      ) : null}
                      {item.icon == "uncommon" ? (
                        <img
                          src={menu_1}
                          style={{ margin: "0 5px 5px 0", width: "24px" }}
                        />
                      ) : null}

                      {/* <Avatar
                      className={siderMenuClass.icon}
                      size={24}
                      // icon="user"
                      style={{
                        fontSize: 24,
                        backgroundColor: "transparent",
                        verticalAlign: "middle"
                      }}
                      src={require("./images/talentPool.png")}
                    /> */}
                      <span>{item.name}</span>
                    </div>
                  }
                >
                  {item.children.map(child => {
                    return (
                      <Menu.Item
                        key={child.id}
                        className={siderMenuClass.childMenu}
                      >
                        <Link
                          to={`/${item.link || item.url}/${child.link ||
                            child.url}`}
                        >
                          {child.name}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            }
          })}
      </Menu>
    );
  }
}

export default withRouter(SiderMenu);
