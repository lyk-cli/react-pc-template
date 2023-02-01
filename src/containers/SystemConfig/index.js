/* eslint-disable */
import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import User from "./User";
const UserEdit = lazy(() =>
  import(/* webpackChunkName: "UserEdit" */ "./User/UserEdit")
);

function SystemRouter({ match: { path } }) {
  console.log(path, 22222222);
  return (
    <Switch>
      <Route path={`${path}/user/edit`} component={UserEdit} />
      <Route path={`${path}/user`} component={User} />
      <Redirect to={`${path}/user`} />
    </Switch>
  );
}

export default SystemRouter;
