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
          components={this.props.components}
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          rowSelection={this.props.rowSelection}
          pagination={false}
          title={this.props.onheader}
          rowKey={this.props.rowKey ? this.props.rowKey : "id"}
          // locale={{ emptyText: "暂无数据" }} //   console.log("123", record, index, event) // onRowClick={(record, index, event) =>
          loading={this.props.loading}
          onRow={this.props.onRow}
          scroll={this.props.scroll}
          bordered={this.props.bordered}
          // }
          // onRow={record => {
          //   return {
          //     onClick: () => {
          //       this.props.fnNav(record);
          //       // console.log(record);
          //     }
          //   }; // 点击行
          // }}
          footer={() =>
            this.props.notPaginationFlag ? (
              <></>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Pagination
                  current={this.props.current}
                  bordered
                  total={
                    this.props.total // showQuickJumper
                  }
                  defaultPageSize={this.props.defaultPageSize}
                  pageSizeOptions={
                    this.props.pageSizeOptions || ["10", "20", "50", "100"]
                  }
                  hideOnSinglePage={this.props.hideOnSinglePage}
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
            )
          }
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
