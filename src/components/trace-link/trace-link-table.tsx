import React from "react";
import { ITraceLink, IRequirementDescription, IImplement } from "../../types";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { TraceLinkActions } from "../../store/trace-link/types";
import { AppDispatch } from "../../store/store";
import { fetchRepoTraceLink } from "../../store/trace-link/actions";

export interface ITraceLinkTableProps {
  repoName: string;
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
  (props: ITraceLinkTableProps) => {
    const { repoName } = props;
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.loading
    );

    const traceLinks = useSelector<RootState, ITraceLink[]>(
      state => state.traceLinkReducer.traceLinkMatrix?.links || []
    );

    const dispatch = useDispatch<AppDispatch<TraceLinkActions>>();

    React.useEffect(() => {
      if (repoName) dispatch(fetchRepoTraceLink(repoName));
    }, [repoName]);

    console.log(traceLinks);

    return (
      <Table
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>123</p>
        }}
        dataSource={traceLinks}
      />
    );
  }
);
