/* eslint-disable no-unused-vars */
/**
 * Banner
 */
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Request from "Utils/request";
import API from "Utils/api";
import Style from "./style";

function Statistics() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   getData(data);
  // }, []);

  // async function getData() {
  //   // let response = await Request({
  //   //   url: API.home.todayCount,
  //   //   method: "post"
  //   // });
  //   // response.status && setData(response.data);
  // }

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  return (
    <div>
      <Carousel afterChange={onChange}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  );
}

export default Statistics;
