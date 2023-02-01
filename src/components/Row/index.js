/**
 * Row 列布局
 */

import React from "react";
import { Col, Row } from "antd";
import PropType from "prop-types";

/**
 * 布局
 */
const wrapperCol = {
  1: {
    lg: {
      span: 24
    }
  },
  2: {
    sm: {
      span: 24
    },
    md: {
      span: 12
    }
  },
  3: {
    sm: {
      span: 24
    },
    md: {
      span: 12
    },
    lg: {
      span: 8
    }
  },
  4: {
    sm: {
      span: 24
    },
    md: {
      span: 12
    },
    lg: {
      span: 6
    }
  }
};

function Rows({ items, children, ...rest }) {
  const number = React.Children.count(children);
  return (
    <Row gutter={5}>
      {React.Children.map(children, child => (
        <Col {...wrapperCol[items || number]} {...rest}>
          {child}1
        </Col>
      ))}
    </Row>
  );
}

Rows.propTypes = {
  items: PropType.number //手动指定子元素数量
};

export default Rows;
