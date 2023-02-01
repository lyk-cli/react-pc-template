/* eslint-disable */
/**
 * 用户管理
 */
import React, { Component } from "react";
import { Button, Input, Row, Col, Card } from "antd";
import { Table } from "Components";
import UserStyle from "./style";

class User extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    records: [],
    // records: [
    //   {
    //     branchCode: "111111",
    //     cityCode: "8142",
    //     id: "123456",
    //     isLocked: false,
    //     name: "测试名称",
    //     phoneNo: "15124142341",
    //     sex: "0",
    //     username: "hahaha"
    //   }
    // ],
    total: 1,
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
      title: "登录名",
      dataIndex: "username"
    },
    {
      title: "用户名",
      dataIndex: "name"
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
        <div className={UserStyle.editStyle}>
          <a
            onClick={() => {
              //   this.setState({ vo: { ...records, title: "查看" } });
              this.props.history.push("/systemConfig/user/edit");
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              this.setState({ userId: records.id });
            }}
          >
            角色分配
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
      <div className={UserStyle.userStyle}>
        <Card type="inner">
          <div className="panel-search" style={{ margin: "10px 0" }}>
            <Row style={{ marginBottom: "16px" }}>
              <Col span={8}>
                <label style={{ marginRight: "0px" }}>登录名: </label>
                <Input
                  style={{ width: 150 }}
                  placeholder="请输入登录名"
                  value={this.state.name}
                  onChange={e =>
                    this.setState({
                      name: e.target.value
                    })
                  }
                />
              </Col>
              <Col span={8}>
                <label style={{ marginRight: "0px" }}>用户名: </label>
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
            </Row>
            <Row type="flex" justify="space-between">
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
        <div className={UserStyle.continer}>
          <div className={UserStyle.tableHead}>
            <p>用户管理</p>
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

export default User;
