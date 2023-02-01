/**
 * Nav
 */
import React from "react";
import { withRouter } from "react-router-dom";
import "./style";

/**
 * title
 * right
 * theme
 * goBack
 */
const Nav = ({
  title,
  left = true,
  right,
  theme = "blue",
  history: { goBack }
}) => (
  <div className={`nav-${theme} nav`}>
    {left && (
      <a className={left ? "left back" : "left"} onClick={goBack}>
        back
      </a>
    )}
    <span className="title">{title}</span>
    <span className="right">{right}</span>
  </div>
);

export default withRouter(Nav);
