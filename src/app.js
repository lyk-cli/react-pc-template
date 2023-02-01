/* eslint-disable no-unused-vars */
/**
 * app
 */
import React from "react";
import { Provider } from "react-redux";
import AppContainer from "./containers";
import ErrorBoundary from "@/components/ErrorBoundary";
import { hot } from "react-hot-loader/root"; //HMR
import createStore from "./store";
import { ConfigProvider } from "antd";
const store = createStore();

// i18n
import intl from "react-intl-universal";
// common locale data
require("intl/locale-data/jsonp/en.js");
require("intl/locale-data/jsonp/zh.js");
// customer locale
const locales = {
  en_US: require("./locales/en-US.json"),
  zh_CN: require("./locales/zh-CN.json")
};
import "./styles";

// ant design i18n
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";

const antLocales = {
  zh_CN: zhCN,
  en_US: enUS
};

class App extends React.Component {
  state = {
    initDone: true
  };

  async componentDidMount() {
    // load locale
    this.loadLocales();
  }

  loadLocales = () => {
    intl
      .init({
        currentLocale: localStorage.getItem("lang") || "zh_CN",

        locales
      })
      .then(() => {
        this.setState({ initDone: true });
      });
  };

  render() {
    return (
      this.state.initDone && (
        <ErrorBoundary>
          <ConfigProvider
            locale={antLocales[localStorage.getItem("lang") || "zh_CN"]}
          >
            <Provider store={store}>
              <AppContainer />
            </Provider>
          </ConfigProvider>
        </ErrorBoundary>
      )
    );
  }
}

export default hot(App);
