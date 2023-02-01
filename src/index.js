/**
 * this is entry file
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "whatwg-fetch";
import "es6-promise";
// analytics
// eslint-disable-next-line no-unused-vars
// import analytics from "./utils/analytics";

ReactDOM.render(<App />, document.getElementById("root"));
