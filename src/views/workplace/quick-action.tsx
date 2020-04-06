import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { Typography, Row, Col, Card } from "antd";

export interface IAction {
  name: string;
  url: string;
}

export interface IQuickActionProps {
  actions: IAction[];
}

const useStyles = createUseStyles({
  quickAction: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  link: {
    display: "inline-block",
    width: "25%",
    marginBottom: "13px",
    color: "rgba(0, 0, 0, 0.65)",
    fontSize: "14px"
  }
});

const QuickAction: FunctionComponent<IQuickActionProps> = memo(
  (props: IQuickActionProps) => {
    const styles = useStyles();
    const { actions } = props;
    return (
      <Card title={"快速操作"}>
        <Typography.Paragraph>
          <Row className={styles.quickAction} gutter={[8, 8]}>
            {actions.map(action => {
              return (
                <Col span={8} key={action.name}>
                  <a href={action.url}>{action.name}</a>
                </Col>
              );
            })}
          </Row>
        </Typography.Paragraph>
      </Card>
    );
  }
);

export default QuickAction;
