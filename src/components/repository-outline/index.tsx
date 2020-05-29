import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Spin, Statistic } from "antd";
import moment from "moment";
import React from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { RootState } from "../../store/reducers";
import { fetchRepoRequirement } from "../../store/requirement/actions";
import { AppDispatch } from "../../store/store";
import { fetchRepoTraceLink } from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import { IRequirementDescription, ITraceLink } from "../../types";
import { ImplementStatisticBarChart } from "../graph/implement-statistic-bar-chart";
import { RequirementStatisticBarChart } from "../graph/requirement-statistic-bar-chart";
import { CodeCouplingChart } from "../graph/code-coupling-chart";

export interface IRepositoryOutlineProps {}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    height: "100%"
  },

  topSmallCardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "10px"
  },

  smallCard: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  iconContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer"
  },
  statisticContainer: {
    width: "100%",
    margin: { top: "16px" }
  }
});

interface ISmallCardProps {
  title: string;
  value: string | number;
  data: number[];
}

const SmallCard: React.FunctionComponent<ISmallCardProps> = React.memo<
  ISmallCardProps
>(props => {
  const styles = useStyles();
  const { title, value, data } = props;
  return (
    <Card className={styles.smallCard}>
      <div className={styles.iconContainer}>
        <InfoCircleOutlined />
      </div>
      <Statistic title={title} value={value} />
      <Sparklines data={data}>
        <SparklinesLine color="blue" />
      </Sparklines>
    </Card>
  );
});

function countItemByDate<Item>(items: Item[], dateField: keyof Item): number[] {
  const map: any = {};

  for (const item of items) {
    const dateValue = item[dateField];
    const dateStr = moment(dateValue).format("YYYY-MM-DD");
    if (map[dateStr]) {
      map[dateStr] = map[dateStr] + 1;
    } else {
      map[dateStr] = 1;
    }
  }
  const data = Object.keys(map).map(key => map[key]);
  return data.length > 5 ? data : [0, 0, 0, ...data];
}

export const RepositoryOutline: React.FunctionComponent<IRepositoryOutlineProps> = React.memo<
  IRepositoryOutlineProps
>(props => {
  const styles = useStyles();
  const dispatch = useDispatch<AppDispatch<TraceLinkActions>>();

  const repoName = useSelector<RootState, string | undefined>(
    state => state.repositoryReducer.importedRepositoryDetail?.name
  );

  const loading = useSelector<RootState, boolean>(
    state => state.traceLinkReducer.loading || state.requirementReducer.loading
  );

  const descriptions = useSelector<
    RootState,
    IRequirementDescription[] | undefined
  >(state => state.requirementReducer.requirement?.descriptions);

  const traceLinks = useSelector<RootState, ITraceLink[] | undefined>(
    state => state.traceLinkReducer.traceLinkMatrix?.links
  );

  React.useEffect(() => {
    if (!descriptions && repoName) {
      dispatch(fetchRepoRequirement(repoName));
    }
    if (!traceLinks && repoName) {
      dispatch(fetchRepoTraceLink(repoName));
    }
  }, [traceLinks, descriptions]);

  const descriptionData: number[] = React.useMemo(
    () =>
      descriptions
        ? countItemByDate(
            descriptions.sort((d2, d1) => d2.createAt - d1.createAt),
            "createAt"
          )
        : [],
    [descriptions]
  );

  const traceLinkData: number[] = React.useMemo(
    () =>
      traceLinks
        ? countItemByDate(
            traceLinks.sort(
              (t1, t2) => (t2.lastUpdateAt || 0) - (t1.lastUpdateAt || 0)
            ),
            "lastUpdateAt"
          )
        : [],
    [traceLinks]
  );

  return (
    <Spin spinning={loading}>
      {descriptions && traceLinks && (
        <div className={styles.container}>
          <div className={styles.topSmallCardsContainer}>
            <SmallCard
              title={"需求數量"}
              value={descriptions.length}
              data={descriptionData}
            />
            <SmallCard
              title="追踪線索數量"
              value={traceLinks.length}
              data={traceLinkData}
            />
          </div>
          <div className={styles.statisticContainer}>
            <Card
              title="需求的統計"
              bodyStyle={{ padding: "16px 0px 0px 0px" }}
            >
              <RequirementStatisticBarChart />
            </Card>
          </div>
          <div className={styles.statisticContainer}>
            <Card
              title="實現類的統計"
              bodyStyle={{ padding: "16px 0px 0px 0px" }}
            >
              <ImplementStatisticBarChart />
            </Card>
          </div>
          <div className={styles.statisticContainer}>
            <Card title="追踪線索" bodyStyle={{ padding: "16px 0px 0px 0px" }}>
              <CodeCouplingChart />
            </Card>
          </div>
        </div>
      )}
    </Spin>
  );
});
