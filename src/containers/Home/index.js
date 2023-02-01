/**
 * Home container
 */
import React, { Component } from "react";
// import Request from "Utils/request";
// import API from "Utils/api";
import Banner from "./component/Banner";
import Process from "./component/Process";
import Charts from "./component/Charts";
import Calendar from "./component/Calendar";
import Message from "./component/Message";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    // const {} = this.state;

    return (
      <div className="home" data-spm="spm-a-home">
        <Banner />
        <Process />
        <Charts />
        <Calendar />
        <Message />
      </div>
    );
  }
}

export default Home;
