/**
 * https://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts
 */

import React, { Component } from "react";

// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

// import Request from "Utils/request";
// import API from "Utils/api";

export class Charts extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // let data = await Request({
    //   url: API.analytics.track.query,
    //   method: "post"
    // });

    // console.log(data);

    // console.log(xData);

    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: "value",
        name: "Days"
      },
      yAxis: {
        //type: 'category',
        //inverse: true,
        data: ["Sunny", "Cloudy", "Showers"]
      },
      series: [
        {
          name: "City Gamma",
          type: "bar",
          //label: seriesLabel,
          data: [220, 82, 63]
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div id="main" style={{ height: 300, width: 400 }} />
      </div>
    );
  }
}

export default Charts;
