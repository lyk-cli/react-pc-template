//确认框
import { Modal } from "antd";

const confirm = Modal.confirm;

export const Confirm = (title = "", content = "", onOk, onCancel) =>
  confirm({
    title: title,
    content: content,
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    }
  });
