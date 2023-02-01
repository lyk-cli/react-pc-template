/* eslint-disable */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PersonalSign from "./PersonalSign";

/**
 * 个人名片
 * @param {*} param  路由参数
 * @returns
 */
function BusinessCardRouter({ match: { path } }) {
  return (
    <Switch>
      <Route path={`${path}/personalSign`} component={PersonalSign} />
      <Redirect to={`${path}/personalSign`} />
    </Switch>
  );
}

export default BusinessCardRouter;
