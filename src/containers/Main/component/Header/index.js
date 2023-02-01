/**
 * Head
 */
import React from "react";
import Style from "./style";
import { Session as Storage } from "Utils/storage";

function Head(props) {
  return (
    <div className={Style.headerNav}>
      <div className={Style.left}>
        <img
          className={Style.logoImg}
          src={require("./image/logo.jpg")}
          alt=""
          width={150}
          height={30}
        />
        <span className={Style.line}></span>
        <span className={Style.text}>后端管理平台</span>
      </div>
      <div className={Style.right}>
        <img
          className={Style.headImg}
          src={require("./image/avatar.svg")}
          alt=""
        />
        <span className={Style.name}>{Storage.get("name") || ""}</span>
        <span className={Style.linespan}></span>
        <img
          className={Style.headImg}
          src={require("./image/password.png")}
          alt=""
        />
        <span className={Style.exit} onClick={props.onLogout}>
          退出
        </span>
      </div>
    </div>
  );
}

export default Head;
