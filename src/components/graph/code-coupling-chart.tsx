import DataSet from "@antv/data-set";
import { Chart, Coord, Geom, Label, Tooltip, View } from "bizcharts";
import _ from "lodash";
import React, { FunctionComponent, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { fetchRepoTraceLink } from "../../store/trace-link/actions";
import {
  GraphData,
  GraphLink,
  GraphNode,
  ITraceLink,
  ITraceLinkMatrix,
  IFileTreeNode
} from "../../types";
import { ChartTitle } from "./chart-title";
import { flatten } from "../../utils/trees";

export interface ICodeCouplingChartProps {}

const toGraphData = (
  traceLinks: ITraceLink[],
  files: IFileTreeNode[]
): GraphData => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  for (const traceLink of traceLinks) {
    const {
      requirementDescription: { name },
      implement: { fullyQualifiedName }
    } = traceLink;
    nodes.push({
      id: name,
      name: name,
      value: 30
    });
    nodes.push({
      id: fullyQualifiedName,
      name: fullyQualifiedName,
      value: 30
    });
    links.push({
      source: fullyQualifiedName,
      target: name,
      targetWeight: 20,
      sourceWeight: 20
    });
  }
  return {
    links,
    nodes: _.uniqBy(
      [
        ...nodes,
        ...files.map(file => ({
          id: file.fullyQualifiedName,
          name: file.fullyQualifiedName,
          value: 30
        }))
      ],
      node => node.id
    )
  };
};

export const CodeCouplingChart: FunctionComponent<ICodeCouplingChartProps> = memo(
  (props: ICodeCouplingChartProps) => {
    const ds = new DataSet();
    const dispatch = useDispatch<AppDispatch<any>>();

    const repoName = useSelector<RootState, string | undefined>(
      state => state.repositoryReducer.importedRepositoryDetail?.name
    );

    const files = useSelector<RootState, IFileTreeNode[]>(state =>
      flatten(state.repositoryReducer.importedRepositoryDetail?.trees || [])
    );

    const traceLinkMatrix = useSelector<
      RootState,
      ITraceLinkMatrix | undefined
    >(state => state.traceLinkReducer.traceLinkMatrix);

    React.useEffect(() => {
      if (repoName && !traceLinkMatrix) {
        dispatch(fetchRepoTraceLink(repoName));
      }
    }, [traceLinkMatrix, repoName]);

    const data = toGraphData(traceLinkMatrix?.links || [], files);

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
      <Chart data={data} forceFit={true} height={600} scale={scale}>
        <ChartTitle text={"追踪線索"} />
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
