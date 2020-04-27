import React from "react";
import { ITraceLink, IRequirementDescription, IImplement } from "../../types";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";

export interface ITraceLinkTableProps {
  traceLinks: ITraceLink[];
}

// _id: string;
//   requirementDescription: IRequirementDescription;
//   implement: IImplement;
//   lastUpdateAt?: number;

const columns: ColumnsType<ITraceLink> = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id"
  },
  {
    title: "需求",
    dataIndex: "requirementDescription",
    key: "requirementDescription",
    render: (item: IRequirementDescription) => item.name
  },
  {
    title: "實現",
    dataIndex: "implement",
    key: "implement",
    render: (item: IImplement) => item.fullyQualifiedName
  },
  {
    title: "更新日期",
    dataIndex: "lastUpdateAt",
    key: "lastUpdateAt",
    render: (item: number) => moment(item).format("YYYY-MM-DD HH:mm")
  }
];

export const TraceLinkTable: React.FunctionComponent<ITraceLinkTableProps> = React.memo(
  ({ traceLinks }: ITraceLinkTableProps) => {
    return (
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>123</p>
        }}
        dataSource={traceLinks}
      />
    );
  }
);
