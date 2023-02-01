import * as React from "react";
import { connect } from "react-redux";
import "./style";
import Header from "@/components/Header";

interface Props {} // props接口类型

// Home组件
const Home = function (props: Props) {
  return (
    <div>
      <Header></Header>
    </div>
  );
};
export default connect()(Home);
