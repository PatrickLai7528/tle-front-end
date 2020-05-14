import React, { FunctionComponent, memo } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Row, Col } from "antd";
import { CustomTheme } from "../../theme";
import { RequirementStatisticBarChart } from "../graph/requirement-statistic-bar-chart";
import { ImplementStatisticBarChart } from "../graph/implement-statistic-bar-chart";
import { CommitStatisticLineChart } from "./commit-link-change-chart";
import { CodeCouplingChart } from "./code-coupling-chart";

export interface IAllGraphProps {}

const useStyle = createUseStyles<CustomTheme>(theme => ({
  graph: {}
}));

export const AllGraph: FunctionComponent<IAllGraphProps> = memo(
  (props: IAllGraphProps) => {
    const theme = useTheme();
    const styles = useStyle({ theme });
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ImplementStatisticBarChart />
        </Col>
        <Col span={24}>
          <RequirementStatisticBarChart />
        </Col>
        <Col span={24}>{/* <CodeCouplingChart /> */}</Col>
        <Col span={24}>
          <CommitStatisticLineChart />
        </Col>
      </Row>
    );
  }
);
