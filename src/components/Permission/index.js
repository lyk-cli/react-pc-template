/**
 * 权限
 */
import React from "react";
import { withPermission } from "Contexts/PermissionContext";

function Button(props) {
  const { permission, id, children } = props;
  return <>{permission.includes(id) && children}</>;
}

export default withPermission(Button);
