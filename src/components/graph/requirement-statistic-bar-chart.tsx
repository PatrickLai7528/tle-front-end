import { Axis, Chart, Geom, Tooltip } from "bizcharts";
import React, { FC, memo } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { fetchRequirementStatistic } from "../../store/statistic/actions";
import { StatisticActions } from "../../store/statistic/types";
import { AppDispatch } from "../../store/store";
import { IStatistic } from "../../types";
import { ChartTitle } from "./chart-title";
import { Spin } from "antd";

export interface IRequirementStatisticBarChartProps {
  onClick?: (descriptionName: string) => void;
}

const useStyle = createUseStyles({});

const cols = {
  sales: {
    tickInterval: 20
  }
};

export const RequirementStatisticBarChart: FC<IRequirementStatisticBarChartProps> = memo(
  (props: IRequirementStatisticBarChartProps) => {
    const { onClick } = props;

    const data = useSelector<RootState, IStatistic[]>(state =>
      state.statisticReducer.requirementStatistic.sort(
        (a, b) => b.value - a.value
      )
    );

    const repoId = useSelector<RootState, string>(
      state =>
        state.repositoryManagementReducer.importedRepositoryDetail?._id || ""
    );

    const loading = useSelector<RootState, boolean>(
      state => state.statisticReducer.loading
    );

    const dispatch = useDispatch<AppDispatch<StatisticActions>>();

    React.useEffect(() => {
      if (repoId) {
        dispatch(fetchRequirementStatistic(repoId));
      }
    }, [repoId, dispatch]);

    const handleClick: any = ({ data: { _origin } }: any) => {
      if (onClick) {
        onClick(_origin.label);
      }
    };

    return (
      <Spin spinning={loading}>
        <Chart
          height={400}
          onClick={handleClick}
          data={data}
          scale={cols}
          forceFit
        >
          <ChartTitle text={"類或方法數量/每需求"} />
          <Axis name="label" />
          <Axis name="value" />
          <Tooltip />
          <Geom type="interval" position="label*value" />
        </Chart>
      </Spin>
    );
  }
);
