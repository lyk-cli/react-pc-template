import * as React from "react";
import "./style";
import { Props } from "@/store/types"; // 引入组件的Props接口类型
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import logo from "@/images/logo.png";
declare function require(url: string): any;
const logo = require("@/images/logo.png").default;
console.log(logo);
// Header组件
const Header = function (props: Props) {
  return (
    <div>
      header
      <img src={logo}></img>
    </div>
  );
};
export default connect()(Header);
