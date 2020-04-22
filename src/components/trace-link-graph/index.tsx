import React, { FunctionComponent, memo } from "react";
import { ResponsiveNetworkCanvas } from "@nivo/network";
import { data } from "./data";

export interface ITraceLinkGraphProps {}

export const TraceLinkGraph: FunctionComponent<ITraceLinkGraphProps> = memo(
  (props: ITraceLinkGraphProps) => {
    return (
      <ResponsiveNetworkCanvas
        nodes={data.nodes}
        links={data.links}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        repulsivity={6}
        iterations={60}
        nodeColor={function(t) {
          return t.color;
        }}
        nodeBorderWidth={1}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 0.8]]
        }}
        linkThickness={function(t) {
          return 2 * (2 - t.source.depth);
        }}
      />
    );
  }
);
