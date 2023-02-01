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

import Request from "Utils/request";
import API from "Utils/api";

export class Charts extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let data = await Request({
      url: API.analytics.track.query,
      method: "post"
    });

    console.log(data);
    const xData = data.data.map(item => item._id);
    const yData = data.data.map(item => item.total);

    console.log(xData);

    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "analytics report"
      },
      tooltip: {},
      xAxis: {
        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        data: xData,
        axisLabel: {
          // interval: 0,
          rotate: 10,
          height: 300
        }
      },
      yAxis: {},

      // axisLabel: {
      //   //坐标轴刻度标签的相关设置。
      //   formatter: function(params) {
      //     var newParamsName = ""; // 最终拼接成的字符串
      //     var paramsNameNumber = params.length; // 实际标签的个数
      //     var provideNumber = 19; // 每行能显示的字的个数
      //     var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
      //     /**
      //      * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
      //      */
      //     // 条件等同于rowNumber>1
      //     if (paramsNameNumber > provideNumber) {
      //       /** 循环每一行,p表示行 */
      //       for (var p = 0; p < rowNumber; p++) {
      //         var tempStr = ""; // 表示每一次截取的字符串
      //         var start = p * provideNumber; // 开始截取的位置
      //         var end = start + provideNumber; // 结束截取的位置
      //         // 此处特殊处理最后一行的索引值
      //         if (p == rowNumber - 1) {
      //           // 最后一次不换行
      //           tempStr = params.substring(start, paramsNameNumber);
      //         } else {
      //           // 每一次拼接字符串并换行
      //           tempStr = params.substring(start, end) + "\n";
      //         }
      //         newParamsName += tempStr; // 最终拼成的字符串
      //       }
      //     } else {
      //       // 将旧标签的值赋给新标签
      //       newParamsName = params;
      //     }
      //     //将最终的字符串返回
      //     return newParamsName;
      //   }
      // },
      series: [
        {
          name: "count",
          type: "bar",
          data: yData
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div id="main" style={{ height: 300 }} />
      </div>
    );
  }
}

export default Charts;
