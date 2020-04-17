import React, { FunctionComponent, memo, useMemo } from "react";
import { ITraceLink } from "../../types";
import { Card, Divider, Typography, Tag } from "antd";
import { createUseStyles } from "react-jss";

export interface ISimpleTraceLinkCardProps {
  traceLink: ITraceLink;
  showImplement?: boolean;
  showRequirement?: boolean;
  type?: "ADDED" | "REMOVED";
}

const bodyStyle = { padding: "8px 12px" };

const useStyle = createUseStyles({
  traceLinkCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  traceLinkCardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  traceLinkDescription: {}
});

const SimpleTraceLinkCard: FunctionComponent<ISimpleTraceLinkCardProps> = memo(
  (props: ISimpleTraceLinkCardProps) => {
    const { traceLink, showImplement, showRequirement, type } = props;
    const styles = useStyle();

    const cardStyle = useMemo(() => {
      return type
        ? {
            borderLeftColor: type === "ADDED" ? "#57BC90" : "#FF3F3B",
            borderLeftWidth: "8px"
          }
        : {};
    }, [type]);

    const cardTitle = useMemo(() => {
      return (
        <div>
          {!!type && (
            <Tag color={type === "ADDED" ? "#57BC90" : "#FF3F3B"}>
              {type === "ADDED" ? "ADD" : "REMOVE"}
            </Tag>
          )}
          {`#${traceLink.id}`}
        </div>
      );
    }, [type, traceLink]);

    return (
      <Card
        key={traceLink.id}
        hoverable
        style={cardStyle}
        bodyStyle={bodyStyle}
        className={styles.traceLinkCard}
      >
        <Card.Meta
          title={cardTitle}
          description={
            <div>
              {showRequirement && (
                <Typography>
                  <Typography.Text>需求描述</Typography.Text>
                  <Typography.Paragraph strong>
                    {traceLink.requirementDescription.text}
                  </Typography.Paragraph>
                </Typography>
              )}
              {showImplement && showRequirement && <Divider />}
              {showImplement && (
                <>
                  <Typography>
                    <Typography.Text>實現類或函數</Typography.Text>
                    <Typography.Paragraph strong>
                      {traceLink.implement.fullyQualifiedName}
                    </Typography.Paragraph>
                  </Typography>
                </>
              )}
            </div>
          }
        />
      </Card>
    );
  }
);

SimpleTraceLinkCard.defaultProps = {
  showImplement: true,
  showRequirement: true
};

export default SimpleTraceLinkCard;
