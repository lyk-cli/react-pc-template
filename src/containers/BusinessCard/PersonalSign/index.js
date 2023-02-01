/* eslint-disable */
/**
 * 个性签名
 */
import React, { Component } from "react";
import { Button, Input, Row, Col, Card } from "antd";
import { Table } from "Components";
import personalSignStyle from "./style";

class PersonalSign extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    records: [],
    vo: null,
    selectedRowKeys: [],
    choseexpired: null,
    username: "",
    name: "",
    orgType: "",
    phoneNo: "",
    deleted: "0",
    userId: "", // 用户id   给用户分配权限
    overdueData: {
      // 设置过期时间
      show: false,
      dateTime: null
    }
  };

  componentDidMount() {}

  /**
   * 表头
   */
  columns = [
    {
      title: "序号",
      dataIndex: "id",
      render: (text, records, index) => index + 1
    },
    {
      title: "姓名",
      dataIndex: "username"
    },
    {
      title: "手机号",
      dataIndex: "phoneNo"
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: text => (text == "1" ? "女" : "男")
    },
    {
      title: "操作",
      dataIndex: "opt",
      render: (text, records) => (
        <div className={personalSignStyle.editStyle}>
          <Permission id="mapi:security:user:findById">
            <a
              onClick={() =>
                this.setState({ vo: { ...records, title: "查看" } })
              }
            >
              查看
            </a>
          </Permission>
          <a
            // className="disabled"
            onClick={() => {
              this.setState({ userId: records.id });
            }}
          >
            角色分配
          </a>
          <a
            onClick={async () => {
              const response = await (records.isLocked
                ? unlock(records.id)
                : lock(records.id));
              response.status && this.fnCheckTable();
            }}
          >
            {records.isLocked ? "解锁" : "锁定"}
          </a>
        </div>
      )
    }
  ];

  render() {
    const { records, total, currentPage, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div className={personalSignStyle.userStyle}>
        <Card type="inner">
          <div className="panel-search" style={{ margin: "10px 0" }}>
            <Row style={{ marginBottom: "16px" }}>
              <Col span={8}>
                <label style={{ marginRight: "0px" }}>姓名: </label>
                <Input
                  value={this.state.username}
                  autoComplete="off"
                  onChange={e => {
                    this.setState({
                      username: e.target.value
                    });
                  }}
                  style={{ width: 150 }}
                  placeholder="请输入用户名"
                />
              </Col>
              <Col span={8}>
                <label style={{ marginRight: "0px" }}>手机号: </label>

                <Input
                  value={this.state.phoneNo}
                  onChange={e => {
                    this.setState({
                      phoneNo: e.target.value
                    });
                  }}
                  autoComplete="off"
                  style={{ width: 150 }}
                  placeholder="请输入手机号"
                />
              </Col>
              <Col span={8}>
                <div style={{ float: "left" }}>
                  <Button type="primary" onClick={this.fnCheckTable}>
                    查询
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        <div className={personalSignStyle.continer}>
          <div className={personalSignStyle.tableHead}>
            <p>个性签名</p>
          </div>
          <Table
            columns={this.columns}
            dataSource={records}
            current={currentPage}
            total={total}
            // onChangePage={this.onChangePage.bind(this)}
            // onChangePageSize={this.fnChangePageSize}
            rowSelection={rowSelection}
          />
        </div>
      </div>
    );
  }
}

export default PersonalSign;
