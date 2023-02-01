import * as React from "react";
import * as ReactDOM from "react-dom";

import store from "./store"; // 引入store仓库
import { Provider } from "react-redux"; // redux和react的桥梁

import { ConnectedRouter } from "connected-react-router"; // 联接react-router和redux的桥梁    (替代BrowserRouter as Router)
import history from "./store/history"; // 指定history对象
import App from "./app";
import "./common/index";

ReactDOM.render(
  // 提供store
  <Provider store={store}>
    {/* 连接redux的路由 */}
    <ConnectedRouter history={history}>
      <App></App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
