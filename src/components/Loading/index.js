/**
 * loading component
 */
import React from "react";
import { Spin } from "antd";
import "./style";

export default function Loading() {
  // return <div className="loading">loading...</div>;
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
}
