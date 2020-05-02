import React, { FunctionComponent, memo } from "react";
import { data } from "./data";
import { createUseStyles, useTheme } from "react-jss";
import { Row, Col } from "antd";
import { CustomTheme } from "../../theme";
import { RequirementImplementBarChart } from "./requirement-implement-bar-chart";
import { ImplementRequirementBarChart } from "../graph/implement-requirement-bar-chart";
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
          <RequirementImplementBarChart />
        </Col>
        <Col span={12}>
          <ImplementRequirementBarChart />
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
