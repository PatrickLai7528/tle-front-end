import React from "react";
import {
  ITraceLink,
  IRequirementDescription,
  IImplement,
  ShaFileContentMap,
  IFileTreeNode
} from "../../types";
import { Table, Empty, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { TraceLinkActions } from "../../store/trace-link/types";
import { AppDispatch } from "../../store/store";
import { fetchRepoTraceLink } from "../../store/trace-link/actions";
import { RequirementCard } from "../requirement/requirement-card";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { createUseStyles } from "react-jss";
import { HighlightCode } from "../highlight-code";
import { uniq } from "lodash";
export interface ITraceLinkTableProps {
  repoName: string;
}

const useStyles = createUseStyles({
  expandArea: {
    background: "#fff",
    margin: { left: "1rem", right: "1rem" }
  }
});

interface IExpandAreaProps {
  description: IRequirementDescription;
  implement: IImplement;
}

const ExpandArea: React.FunctionComponent<IExpandAreaProps> = React.memo(
  (props: IExpandAreaProps) => {
    const styles = useStyles();
    const { description, implement } = props;

    const { fullyQualifiedName } = implement;

    const shaFileContentMap = useSelector<
      RootState,
      ShaFileContentMap | undefined
    >(
      state =>
        state.repositoryManagementReducer.importedRepositoryDetail
          ?.shaFileContentMap
    );

    const fileNodes = useSelector<RootState, IFileTreeNode[]>(
      state =>
        state.repositoryManagementReducer.importedRepositoryDetail?.trees || []
    );

    const code: string | null = React.useMemo(() => {
      if (!shaFileContentMap) return null;

      let found: IFileTreeNode | undefined;

      const traverse = (node: IFileTreeNode) => {
        if (node.type === "FILE") {
          if (node.fullyQualifiedName === fullyQualifiedName) {
            found = node;
          }
        } else if (node.type === "FOLDER") {
          (node.subTrees || []).map(traverse);
        }
      };

      fileNodes.map(traverse);

      if (!found) return null;

      return shaFileContentMap[found.sha];
    }, [shaFileContentMap, fullyQualifiedName, fileNodes]);

    return (
      <div className={styles.expandArea}>
        <Typography.Title level={4}>需求描述</Typography.Title>
        <RequirementCard
          useCard={false}
          bordered={false}
          description={description}
        />
        <Typography.Title level={4}>實現代碼</Typography.Title>
        {code ? <HighlightCode language="Java" code={code} /> : <Empty />}
      </div>
    );
  }
);

export const TraceLinkTable: React.FunctionComponent<ITraceLinkTableProps> = React.memo(
  (props: ITraceLinkTableProps) => {
    const { t } = useTranslation();
    const { repoName } = props;
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.loading
    );

    const traceLinks = useSelector<RootState, ITraceLink[]>(
      state => state.traceLinkReducer.traceLinkMatrix?.links || []
    );

    const requirementNames: string[] = React.useMemo(() => {
      return uniq(
        traceLinks.map(traceLink => traceLink.requirementDescription.name)
      );
    }, [traceLinks]);

    const columns: ColumnsType<ITraceLink> = React.useMemo(() => {
      return [
        {
          title: "ID",
          dataIndex: "_id",
          key: "_id"
        },
        {
          title: "需求",
          dataIndex: "requirementDescription",
          key: "requirementDescription",
          filters: [
            ...requirementNames.map(name => ({
              text: name,
              value: name
            })),
            {
              text: t("description priority"),
              value: t("description priority") as string,
              children: [
                {
                  text: t("low"),
                  value: "low"
                },
                {
                  text: t("medium"),
                  value: "medium"
                },
                {
                  text: t("high"),
                  value: "high"
                }
              ]
            }
          ],
          filterMultiple: false,
          render: (item: IRequirementDescription) => item.name,
          onFilter: (value, record) => {
            const isPriority =
              value === "low" || value === "medium" || value === "high";

            if (isPriority) {
              return record.requirementDescription.priority === value;
            }

            return (
              record.requirementDescription.name.indexOf(value as string) === 0
            );
          }
        },
        {
          title: "實現",
          dataIndex: "implement",
          key: "implement",
          render: (item: IImplement) => item.fullyQualifiedName,
          onFilter: (value, record) =>
            record.implement.fullyQualifiedName.indexOf(value as string) === 0
        },
        {
          title: "更新日期",
          dataIndex: "lastUpdateAt",
          key: "lastUpdateAt",
          render: (item: number) => moment(item).format("YYYY-MM-DD HH:mm"),
          sorter: (a, b) => {
            if (a.lastUpdateAt && b.lastUpdateAt)
              return a.lastUpdateAt - b.lastUpdateAt;
            return 0;
          },
          showSorterTooltip: false
        }
      ];
    }, [t, requirementNames]);

    const dispatch = useDispatch<AppDispatch<TraceLinkActions>>();

    React.useEffect(() => {
      if (repoName) dispatch(fetchRepoTraceLink(repoName));
    }, [repoName]);

    return (
      <Table
        rowKey={"_id"}
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: link => {
            const { requirementDescription, implement, _id } = link;
            return (
              <ExpandArea
                description={requirementDescription}
                implement={implement}
                key={_id}
              />
            );
          }
        }}
        dataSource={traceLinks}
      />
    );
  }
);
