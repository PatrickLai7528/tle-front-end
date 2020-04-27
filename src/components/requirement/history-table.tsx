import { Table } from "antd";
import { flatten } from "lodash";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { fetchDescriptionHistory } from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";
import { AppDispatch } from "../../store/store";
import { IDescriptionHistory, IRequirementDescription } from "../../types";

export interface IHistoryTableProps {
  requirementId: string;
  descriptionId: string;
}

type DescriptionKeys = keyof IRequirementDescription;
type TableData = {
  field: string;
  after: string;
  before: string;
  createAt: string;
};

export const HistoryTable: React.FC<IHistoryTableProps> = React.memo(
  (props: IHistoryTableProps) => {
    const { t } = useTranslation();
    const columns = React.useMemo(() => {
      return [
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
          ellipsis: true,
          render: (text: string) => t(`description ${text}`)
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
    }, [t]);
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
        pagination={false}
        size={"small"}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    );
  }
);
