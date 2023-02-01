/**
 * 面包屑
 */
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadMap = {
  add: "新增",
  sign: "签到",
  edit: "修改",
  detail: "查看",
  entry: "录入入班情况",
  train: "录入培训情况",
  details: "查看",
  managementcity: "城市信息配置",
  baseInfo: "去面试",
  mslabel: "面谈",
  basicInfo: "基础信息"
};

class MenuBreadcrumb extends React.PureComponent {
  render() {
    console.log(BreadMap);
    const { location, data } = this.props;

    const breadcrumbNameMap = {};
    data &&
      data.map(item => {
        breadcrumbNameMap[`/${item.url}`] = item.name;
        if (item.children && item.children.length > 0) {
          item.children.map(children => {
            breadcrumbNameMap[`/${item.url}/${children.url}`] = children.name;
          });
        }
      });
    console.log("breadcrumbNameMap", breadcrumbNameMap);

    let pathSnippets = location.pathname.split("/").filter(i => i);

    console.log("pathSnippets", pathSnippets);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      let url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      console.log("url", url);
      return (
        // 存在才渲染
        breadcrumbNameMap[url] && (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>
        )
      );
    });

    const third = pathSnippets[2] && BreadMap[pathSnippets[2]];
    console.log("zxvxcv", third);
    return (
      <Breadcrumb style={{ margin: 10 }}>
        <div>
          {/* 当前位置： {extraBreadcrumbItems[extraBreadcrumbItems.length - 1]} */}
          {extraBreadcrumbItems}
          {third}
          {pathSnippets.length >= 3 && pathSnippets[3] == "vassessment"
            ? "基础力评估报告"
            : ""}
          {pathSnippets.length >= 3 && pathSnippets[3] == "summaryassessment"
            ? "胜任力评估报告"
            : ""}
        </div>
      </Breadcrumb>
    );
  }
}

export default withRouter(MenuBreadcrumb);
