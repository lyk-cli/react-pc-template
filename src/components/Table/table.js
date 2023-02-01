/**
 * 表格
 */
import React, { Component } from "react";
import { Table, Pagination } from "antd";
import "./style";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-component">
        <Table
          //bordered
          //rowSelection={this.props.rowSelection}
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          pagination={false}
          title={this.props.onheader}
          //rowKey={record => record.id}
          locale={{ emptyText: "暂无数据" }} //   console.log("123", record, index, event) // onRowClick={(record, index, event) =>
          loading={this.props.loading}
          // }
          // onRow={record => {
          //   return {
          //     onClick: () => {
          //       this.props.fnNav(record);
          //       // console.log(record);
          //     }
          //   }; // 点击行
          // }}
          footer={() => (
            <div style={{ textAlign: "center" }}>
              <Pagination
                current={this.props.current}
                bordered
                total={
                  this.props.total // showQuickJumper
                }
                defaultPageSize={this.props.defaultPageSize}
                pageSizeOptions={["10", "20", "50", "100"]}
                showTotal={total => `记录总数:${total}`}
                onChange={
                  page => this.props.onChangePage(page) // hideOnSinglePage={true}
                }
                showSizeChanger={true}
                onShowSizeChange={(current, size) => {
                  this.props.onChangePageSize(current, size);
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default TableComponent;

//例子
{
  /* <Atable
  dataSource={dataSource}
  columns={columns}
  rowKey={(itme, index) => index}
  total={6}
  onChangePage={this.fnChangePage}
  onChangePageSize={this.fnChangePageSize}
  current={1}
  onheader={() => "招募对象列表"}
  loading={false}
/> */
}
