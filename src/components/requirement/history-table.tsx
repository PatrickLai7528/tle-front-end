import React from "react";
import { IDescriptionHistory, IRequirementDescription } from "../../types";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { AppThunk, AppDispatch } from "../../store/store";
import { RequirementActions } from "../../store/requirement/types";
import { fetchDescriptionHistory } from "../../store/requirement/actions";
import { flatten } from "lodash";
import moment from "moment";

export interface IHistoryTableProps {
  requirementId: string;
  descriptionId: string;
}

const columns = [
  {
    title: "更新時間",
    dataIndex: "createAt",
    key: "createAt",
    ellipsis: true
  },
  {
    title: "字段",
    dataIndex: "field",
    key: "field",
    ellipsis: true
  },
  {
    title: "更新前",
    dataIndex: "before",
    key: "before",
    ellipsis: true
  },
  {
    title: "更新後",
    dataIndex: "after",
    key: "after",
    ellipsis: true
  }
];

type DescriptionKeys = keyof IRequirementDescription;
type TableData = {
  field: string;
  after: string;
  before: string;
  createAt: string;
};

export const HistoryTable: React.FC<IHistoryTableProps> = React.memo(
  (props: IHistoryTableProps) => {
    const { descriptionId, requirementId } = props;

    const loading = useSelector<RootState, boolean>(
      state => state.requirementReducer.loading
    );

    const histories = useSelector<RootState, IDescriptionHistory[]>(
      state => state.requirementReducer.histories || []
    );

    const dispatch = useDispatch<AppDispatch<RequirementActions>>();

    const data: TableData[] = React.useMemo(() => {
      return flatten(
        histories.map(history => {
          const { oldDescription, newDescription } = history;
          const changesFields: DescriptionKeys[] = Object.keys(
            newDescription
          ) as DescriptionKeys[];
          return changesFields
            .filter(field => field !== "_id")
            .map(field => ({
              key: history._id + field,
              field,
              createAt: moment(history.createAt).format("YYYY-MM-DD HH:mm:SS"),
              before: oldDescription[field] as string,
              after: newDescription[field] as string
            }));
        })
      );
    }, [histories]);

    React.useEffect(() => {
      dispatch(fetchDescriptionHistory(requirementId, descriptionId));
    }, [descriptionId, requirementId]);

    return (
      <Table
        size={"small"}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    );
  }
);
