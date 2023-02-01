/**
 * modal
 */
import React from "react";
import { Modal } from "antd";
import "./style";

export default function Mmodal(props) {
  return (
    <Modal
      width="60%"
      footer={null}
      maskClosable={false}
      {...props}
      className={props.className + " full-width-addModal"}
    >
      {props.children}
    </Modal>
  );
}
