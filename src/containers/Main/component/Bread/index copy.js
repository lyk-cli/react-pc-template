/**
 * 面包屑
 */
/* eslint-disable */
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const PageNameMap = {
  "/mcs/scene/add": "新增"
};

class MenuBreadcrumb extends React.PureComponent {
  render() {
    const { location, data } = this.props;
    const breadcrumbNameMap = {};

    for (var i = 0; i < data.length; i++) {
      let newURL = "";
      if (data[i].url == null) {
        newURL = "123";
      } else {
        newURL = data[i];
      }
      breadcrumbNameMap[`/${newURL.url}`] = newURL.name;
      if (newURL.children && newURL.children.length > 0) {
        for (var j = 0; j < newURL.children.length; j++) {
          breadcrumbNameMap[`/${newURL.children[j].url}`] =
            newURL.children[j].name;
        }
      }
    }

    let pathSnippets = location.pathname.split("/").filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((item, index) => {
      let url = `/${pathSnippets.slice(index, index + 1)}`;
      return (
        // 存在才渲染
        breadcrumbNameMap[url] && (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>
        )
      );
    });

    let abc = extraBreadcrumbItems.map((item, index) => item);

    return (
      <Breadcrumb style={{ margin: 10 }}>
        <div>
          {/* 当前位置： {extraBreadcrumbItems[extraBreadcrumbItems.length - 1]} */}
          {abc}
        </div>
      </Breadcrumb>
    );
  }
}

export default withRouter(MenuBreadcrumb);
