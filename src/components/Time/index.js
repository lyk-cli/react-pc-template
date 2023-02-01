/**
 * @author DF
 * @date 2019-10-11
 * @description calendar
 */
/* eslint-disable */
import React, { Component } from "react";
import {
  findWeekDate,
  findInterviewSetTime,
  saveEnableTime,
  saveDisabelTime,
  disableWeek,
  enableWeek,
  settingDay,
  getWeekState
} from "./server";
import moment from "moment";
import "./style";
import { Button, message, Radio, Switch } from "antd";
import Permission from "Components/Permission/index.js";
export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [],
      num: 0,
      defaultValue: "09:00 18:00",
      toDay: moment(new Date()).format("YYYY-MM-DD"),
      dtime: [],
      showdate: [],
      showswitch: []
    };
  }

  componentWillMount() {
    this.date(this.state.defaultValue, this.state.toDay, "one");
    //this.getWeekState(this.state.defaultValue, this.state.toDay);
  }
  getWeekState = async (date, toDay) => {
    let param = {
      startDate: toDay,
      period: date == "09:00 18:00" ? 2 : date == "00:00 09:00" ? 1 : 3
    };
    const response = await getWeekState(param);
    if (response.status === true) {
      this.setState({
        showswitch: response.data
      });
    }
  };
  findInterviewSetTime = async day => {
    let param = {
      startDate: day,
      period:
        this.state.defaultValue == "09:00 18:00"
          ? 2
          : this.state.defaultValue == "00:00 09:00"
          ? 1
          : 3
    };
    const response = await findInterviewSetTime(param);
    if (response.status === true) {
      this.setState({
        showdate: response.data
      });
    }
  };
  date = async (date, toDay, type) => {
    var start = date.split(" ")[0];
    var end = date.split(" ")[1];
    let param = {
      startDate: toDay,
      period:
        this.state.defaultValue == "09:00 18:00"
          ? 2
          : this.state.defaultValue == "00:00 09:00"
          ? 1
          : 3
    };
    const response = await findWeekDate(param);
    if (response.status === true) {
      this.setState(
        {
          dateList: response.data.dateList,
          week: response.data.week,
          yearMonth: response.data.yearMonth
        },
        () => {
          if (type == "one") {
            this.time(start, end);
          }
          this.findInterviewSetTime(this.state.dateList[0].dayDate);
        }
      );
    }
  };
  appendZero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
  }
  time(str, end) {
    const { dateList } = this.state;
    if (dateList) {
      for (var i = 0; i < 8; i++) {
        if (i % 8 == 0) {
          this.istime(str, end);
        }
        // console.log(`${dateList[6 - (i % 7)]} ${str}`);
        //this.state.dtime = [];
        this.state.dtime.push({
          dateTime: `${dateList[6 - (i % 7)].dayDate} ${str}`
        });
        this.setState({
          time: this.state.dtime
        });
      }
    }
  }
  istime(star, end) {
    var arr = star.split(":");
    var hour = Number(arr[0]);
    var fen = Number(arr[1]) + 30;
    if (fen == 60) {
      fen = "00";
      hour = hour + 1;
    }
    hour = this.appendZero(hour);
    if (`${hour}:${fen}` !== end) {
      this.time(`${hour}:${fen}`, end);
    }
  }
  rearr(array) {
    let newArr = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArr[newArr.length] = array[i];
    }
    return newArr;
  }
  // 点击时间1111
  click = async (e, item, index) => {
    console.log("click", item);
    if (
      index % 8 !== 0 &&
      item.type !== "MS1" &&
      item.type !== "MS2" &&
      item.state !== "0"
    ) {
      var id = e.target.getAttribute("id");
      var className = e.target.getAttribute("class");
      let param = {
        startDate: item.dateTime
      };
      var date = item.dateTime.replace(/-/g, "/");
      var djtime = new Date(date).getTime();
      var dqtime = new Date().getTime();
      console.log(111, date);
      console.log(123, djtime, dqtime);
      if (className.indexOf("color") !== -1) {
        if (djtime > dqtime) {
          //console.log(123, item.dateTime);
          let response = await saveDisabelTime(param);
          if (response.status === true) {
            document.getElementById(id).setAttribute("class", "item");
            this.setState(
              {
                dtime: []
              },
              () => {
                this.date(
                  this.state.defaultValue,
                  this.state.dateList[0].dayDate
                );
              }
            );
          }
        } else {
          message.error("不可设置过期时间");
        }
      } else {
        if (djtime > dqtime) {
          let response = await saveEnableTime(param);
          if (response.status === true) {
            document.getElementById(id).setAttribute("class", "item color");
            this.setState(
              {
                dtime: []
              },
              () => {
                this.date(
                  this.state.defaultValue,
                  this.state.dateList[0].dayDate
                );
              }
            );
          }
        } else {
          message.error("不可设置过期时间");
        }
      }
    } else {
      message.error("不可设置过期时间");
    }
  };
  show(data) {
    return (
      this.state.showdate &&
      this.state.showdate.map(item => {
        if (item.disableTime == data) {
          return item.type;
        }
      })
    );
  }
  allWeek = async type => {
    const { dateList } = this.state;
    let param = {
      startDate: dateList[0].dayDate,
      period:
        this.state.defaultValue == "09:00 18:00"
          ? 2
          : this.state.defaultValue == "00:00 09:00"
          ? 1
          : 3
    };
    if (type == "start") {
      const response = await enableWeek(param);
      if (response.status === true) {
        //this.findInterviewSetTime(dateList[0].dayDate);
        this.date(this.state.defaultValue, dateList[0].dayDate);
        message.success("全周启用成功");
      }
    } else {
      const response = await disableWeek(param);
      if (response.status === true) {
        //this.findInterviewSetTime(dateList[0].dayDate);
        this.date(this.state.defaultValue, dateList[0].dayDate);
        message.success("全周禁用成功");
      }
    }
  };
  changeTime(e) {
    var date = e.target.value;
    var start = date.split(" ")[0];
    var end = date.split(" ")[1];
    this.setState(
      {
        dtime: [],
        defaultValue: e.target.value
      },
      () => {
        this.date(
          this.state.defaultValue,
          this.state.dateList[0].dayDate,
          "one"
        );
      }
    );
  }
  Week(type) {
    let dateTime = "";
    if (type == "down") {
      dateTime = new Date(this.state.dateList[6].dayDate);
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      dateTime = new Date(dateTime);
    } else {
      dateTime = new Date(this.state.dateList[0].dayDate);
      dateTime = dateTime.setDate(dateTime.getDate() - 1);
      dateTime = new Date(dateTime);
    }
    dateTime = moment(dateTime).format("YYYY-MM-DD");
    console.log(123123123, dateTime);
    this.setState(
      {
        dtime: []
      },
      () => {
        this.date(this.state.defaultValue, dateTime, "one");
      }
    );
  }
  zhou(i) {
    switch (i) {
      case 0:
        return "Mon";
      case 1:
        return "Tue";
      case 2:
        return "Wed";
      case 3:
        return "Thu";
      case 4:
        return "Fri";
      case 5:
        return "Sat";
      case 6:
        return "Sun";
    }
  }
  changeSwicth = async (e, v) => {
    console.log("开关", e, v);
    let param = {
      startDate: v,
      period:
        this.state.defaultValue == "09:00 18:00"
          ? 2
          : this.state.defaultValue == "00:00 09:00"
          ? 1
          : 3,
      state: e ? "1" : "0"
    };
    const response = await settingDay(param);
    if (response.status === true) {
      this.date(this.state.defaultValue, v);
    }
  };
  render() {
    const {
      time,
      yearMonth,
      showdate,
      dateList,
      week,
      showswitch
    } = this.state;
    let xtime = this.rearr(time);
    xtime.map(item => {
      item.show = null;
      showdate &&
        showdate.map(v => {
          if (v.disableTime == item.dateTime) {
            item.show = true;
            item.type = v.type;
            item.state = v.state;
          }
        });
    });
    console.log(12313, xtime);
    return (
      <div className="calendar">
        <div className="timeType"></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "45px",
            lineHeight: "45px",
            padding: "0 30px"
          }}
        >
          <span
            style={{ width: "10%", textAlign: "center" }}
            onClick={() => this.Week("up")}
          >
            上一周
          </span>
          <span style={{ width: "30%", textAlign: "center" }}>
            {yearMonth}&nbsp;&nbsp;全年第{week}周
          </span>
          <span
            style={{ width: "10%", textAlign: "center" }}
            onClick={() => this.Week("down")}
          >
            下一周
          </span>
          <span style={{ width: "30%", textAlign: "center" }}>
            <Radio.Group
              defaultValue={this.state.defaultValue}
              buttonStyle="solid"
              onChange={e => this.changeTime(e)}
            >
              <Radio.Button value="00:00 09:00">0-9</Radio.Button>
              <Radio.Button value="09:00 18:00">9-18</Radio.Button>
              <Radio.Button value="18:00 24:00">18-24</Radio.Button>
            </Radio.Group>
          </span>
          <span style={{ width: "10%", textAlign: "center" }}>
            <Permission id="mapi:main:InterviewTime:enableWeek">
              <Button type="primary" onClick={() => this.allWeek("start")}>
                全周启用
              </Button>
            </Permission>
          </span>
          <Permission id="mapi:main:InterviewTime:disableWeek">
            <span style={{ width: "10%", textAlign: "center" }}>
              <Button type="primary" onClick={() => this.allWeek("disable")}>
                {" "}
                全周禁用
              </Button>
            </span>
          </Permission>
        </div>
        <div className="main">
          <div className="title">
            <div></div>
            {dateList &&
              dateList.map((v, i) => {
                return (
                  <div key={i} className="week">
                    {this.zhou(i)}
                    <div>
                      {v.dayDate.split("-")[1]}.{v.dayDate.split("-")[2]}
                      <Switch
                        checked={v.state == 1 ? true : false}
                        size="small"
                        onChange={e => this.changeSwicth(e, v.dayDate)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="content">
            {xtime &&
              xtime.map((item, index) => (
                <div
                  id={`time${index}`}
                  key={index}
                  className={
                    index % 8 == 0
                      ? "xitem"
                      : item.show
                      ? item.state == 0
                        ? "item dis"
                        : "item"
                      : "item color"
                  }
                  onClick={e => this.click(e, item, index)}
                >
                  {index % 8 == 0 && item.dateTime.split(":")[1] == "00"
                    ? item.dateTime.split(" ")[1]
                    : index % 8 !== 0
                    ? this.show(item.dateTime)
                    : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
