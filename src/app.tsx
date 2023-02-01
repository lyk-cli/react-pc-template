import * as React from "react";
import { Route, Redirect } from "react-router-dom"; // 引入react-router
import Counter from "./components/Counter"; // 引入Counter组件
import TodoList from "./components/TodoList"; // 引入TodoList组件
import Home from "./containers/Home"; // 引入Home组件
import Profile from "./containers/Profile"; // 引入Profile组件
import Mime from "./containers/Mime"; // 引入Mimet组件
import Tab from "./components/Tab";
// app容器组件
function App() {
    return (
        <>
            {/* <Route path="/counter" component={Counter} />
      <Route path="/todoList" component={TodoList} /> */}
            <Route exact={true} path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/mime" component={Mime} />
            <Redirect to="/"></Redirect>
            <Tab></Tab>
        </>
    );
}
export default App;
