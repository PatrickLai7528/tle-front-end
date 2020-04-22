import { Axis, Chart, Geom, Tooltip } from "bizcharts";
import React, { memo, FC } from "react";
import { createUseStyles } from "react-jss";
import { ChartTitle } from "./chart-title";

const data = [
  {
    year: "1951 年",
    sales: 38
  },
  {
    year: "1952 年",
    sales: 52
  },
  {
    year: "1956 年",
    sales: 61
  },
  {
    year: "1957 年",
    sales: 145
  },
  {
    year: "1958 年",
    sales: 48
  },
  {
    year: "1959 年",
    sales: 38
  },
  {
    year: "1960 年",
    sales: 38
  },
  {
    year: "1962 年",
    sales: 38
  }
];

export interface IImplementRequirementBarChartProps {}

const useStyle = createUseStyles({
  mainTitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center"
  }
});

export const ImplementRequirementBarChart: FC<IImplementRequirementBarChartProps> = memo(
  (props: IImplementRequirementBarChartProps) => {
    const cols = {
      sales: {
        tickInterval: 20
      }
    };
    const styles = useStyle();
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
        <ChartTitle text={"需求/每類或方法"} />
        <Axis name="year" />
        <Axis name="sales" />
        <Tooltip />
        <Geom type="interval" position="year*sales" />
      </Chart>
    );
  }
);
