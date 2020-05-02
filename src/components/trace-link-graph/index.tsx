import React, { FunctionComponent, memo } from "react";
import { data } from "./data";
import { createUseStyles, useTheme } from "react-jss";
import { Row, Col } from "antd";
import { CustomTheme } from "../../theme";
import { RequirementStatisticBarChart } from "../graph/requirement-statistic-bar-chart";
import { ImplementStatisticBarChart } from "../graph/implement-statistic-bar-chart";
import { CodeCouplingChart } from "../graph/code-coupling-chart";
import { CommitLinkChangeChart } from "./commit-link-change-chart";

export interface ITraceLinkGraphProps {}

const useStyle = createUseStyles<CustomTheme>(theme => ({
  graph: {}
}));

export const TraceLinkGraph: FunctionComponent<ITraceLinkGraphProps> = memo(
  (props: ITraceLinkGraphProps) => {
    const theme = useTheme();
    const styles = useStyle({ theme });
    return (
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <RequirementStatisticBarChart />
        </Col>
        <Col span={12}>
          <ImplementStatisticBarChart />
        </Col>
        <Col span={12}>
          <CodeCouplingChart />
        </Col>
        <Col span={12}>
          <CommitLinkChangeChart />
        </Col>
      </Row>
    );
  }
);
