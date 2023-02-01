import * as React from "react";
import { connect } from "react-redux";
import "./style";

interface Props {} // props接口类型

// Mime组件
const Mime = function (props: Props) {
  return <div>Mime</div>;
};
export default connect()(Mime);
