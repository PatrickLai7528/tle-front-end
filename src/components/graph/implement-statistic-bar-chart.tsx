import { Axis, Chart, Geom, Tooltip, Coord, Label } from "bizcharts";
import React, { FC, memo } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { fetchFileStatistic } from "../../store/statistic/actions";
import { StatisticActions } from "../../store/statistic/types";
import { AppDispatch } from "../../store/store";
import { IStatistic } from "../../types";
import { ChartTitle } from "./chart-title";
import { Spin } from "antd";

export interface IImplementStatisticBarChartProps {
  style?: React.CSSProperties;
  onClick?: (fullyQualifiedName: string) => void;
}

const cols = {
  sales: {
    tickInterval: 20
  }
};

export const ImplementStatisticBarChart: FC<IImplementStatisticBarChartProps> = memo(
  (props: IImplementStatisticBarChartProps) => {
    const { style, onClick } = props;

    const data = useSelector<RootState, IStatistic[]>(state =>
      state.statisticReducer.fileStatistics.sort((a, b) => b.value - a.value)
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
        dispatch(fetchFileStatistic(repoId));
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
          onClick={handleClick}
          style={style}
          height={400}
          data={data}
          scale={cols}
          forceFit
        >
          <ChartTitle text={"需求/每類或方法"} />
          <Axis
            name="label"
            label={
              {
                rotate: 75,
                formatter(text: string) {
                  let arr = text.split("/");
                  return arr[arr.length - 1];
                }
              } as any
            }
          />
          <Axis name="value" />
          <Tooltip />
          <Geom type="interval" position="label*value" />
        </Chart>
      </Spin>
    );
  }
);

ImplementStatisticBarChart.defaultProps = { style: {} };
