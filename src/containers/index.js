/**
 * container
 */
import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Loading from "Components/Loading";

const Login = lazy(() => import(/* webpackChunkName: "Login" */ "./Login"));
const Main = lazy(() => import(/* webpackChunkName: "Main" */ "./Main"));

class App extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={`/login`} component={Login} />
            <PrivateRoute path={`/`} component={Main} {...this.props} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
/**
 * private route
 */
class PrivateRoute extends React.Component {
  render() {
    let { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

export default connect(
  mapStateToProps,
  null
)(App);
