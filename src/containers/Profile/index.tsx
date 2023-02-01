import * as React from "react";
import { connect } from "react-redux";
import "./style";

interface Props {} // props接口类型

// Profile组件
const Profile = function (props: Props) {
  return <div>Profile</div>;
};
export default connect()(Profile);
