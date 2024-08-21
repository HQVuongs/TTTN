import { Table } from "antd";
import React from "react";
import Loading from "../LoadingComponent/Loading";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    isPending = false,
    columns = [],
  } = props;


  return (
    <Loading isPending={isPending}>
      <Table
        rowSelection={{
          type: selectionType,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
