import DataSet from "@antv/data-set";
import { Chart, Coord, Geom, Label, Tooltip, View } from "bizcharts";
import React, { FunctionComponent, memo } from "react";
import { ChartTitle } from "./chart-title";

let data: any;

fetch(
  "https://alifd.alibabausercontent.com/materials/@bizcharts/relation-chord/0.2.8/mock.json"
)
  .then(res => res.json())
  .then(res => (data = res));

export interface ICodeCouplingChartProps {}

export const CodeCouplingChart: FunctionComponent<ICodeCouplingChartProps> = memo(
  (props: ICodeCouplingChartProps) => {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: "graph",
      edges: d => d.links
    });
    dv.transform({
      type: "diagram.arc",
      sourceWeight: e => e.sourceWeight,
      targetWeight: e => e.targetWeight,
      weight: true,
      marginRatio: 0.3
    });
    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };
    return (
      <Chart
        data={data}
        forceFit={true}
        height={window.innerHeight}
        scale={scale}
      >
        <ChartTitle text={"代碼耦合度"} />
        <Tooltip showTitle={false} />
        <View data={dv.edges}>
          <Coord type="polar" reflect="y" />
          <Geom
            type="edge"
            position="x*y"
            shape="arc"
            color="source"
            opacity={0.5}
            tooltip={"source*target*value"}
          />
        </View>
        <View data={dv.nodes}>
          <Coord type="polar" reflect="y" />
          <Geom type="polygon" position="x*y" color="id">
            <Label
              content="name"
              labelEmit={true}
              textStyle={{
                fill: "black"
              }}
            />
          </Geom>
        </View>
      </Chart>
    );
  }
);
