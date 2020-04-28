import { Button, Card, Divider, Tag, Typography } from "antd";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode,
  useMemo
} from "react";
import { createUseStyles, useTheme } from "react-jss";
import { CustomTheme } from "../../theme";
import { ITraceLink } from "../../types";
import { RequirementCard } from "../requirement/requirement-card";
export interface ISimpleTraceLinkCardProps {
  traceLink: ITraceLink;
  showImplement?: boolean;
  showRequirement?: boolean;
  type?: "ADDED" | "REMOVED";
  showOperation?: boolean;
  input?: ReactNode;
  style?: CSSProperties;
}

const bodyStyle = { padding: "8px 12px" };

const useStyle = createUseStyles<CustomTheme>(theme => ({
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
  traceLinkDescription: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "flex-start",
  },
  operations: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modifyButton: {
    background: theme.confirmColor,
    height: "100%",
    color: "#fff"
  },
  deleteButton: {
    background: theme.warningColor,
    height: "100%",
    color: "#fff",
    "&:hover": {
      background: theme.warningColor,
      color: "#fff !important"
    }
  }
}));

const SimpleTraceLinkCard: FunctionComponent<ISimpleTraceLinkCardProps> = memo(
  (props: ISimpleTraceLinkCardProps) => {
    const {
      traceLink,
      showImplement,
      showRequirement,
      type,
      showOperation,
      input,
      style
    } = props;
    const theme: CustomTheme = useTheme() as CustomTheme;
    const styles = useStyle({ theme });

    const cardStyle = useMemo(() => {
      return type
        ? {
            borderLeftColor:
              type === "ADDED" ? theme.confirmColor : theme.warningColor,
            borderLeftWidth: "8px",
            ...style
          }
        : style;
    }, [type, style]);

    const cardTitle = useMemo(() => {
      return (
        <div>
          {!!type && (
            <Tag
              color={type === "ADDED" ? theme.confirmColor : theme.warningColor}
            >
              {type === "ADDED" ? "ADD" : "REMOVE"}
            </Tag>
          )}
          {`#${traceLink._id}`}
        </div>
      );
    }, [type, traceLink]);

    return (
      <Card
        hoverable
        style={cardStyle}
        bodyStyle={bodyStyle}
        className={styles.traceLinkCard}
      >
        <Card.Meta
          title={cardTitle}
          description={
            <div className={styles.traceLinkDescription}>
              {showRequirement && (
                <Typography style={{ width: "100%" }}>
                  <Typography.Text>需求描述</Typography.Text>
                  {input ? (
                    input
                  ) : (
                    // <Typography.Paragraph strong>
                    //   {traceLink.requirementDescription.name}
                    // </Typography.Paragraph>
                    <RequirementCard
                      description={traceLink.requirementDescription}
                    />
                  )}
                </Typography>
              )}
              {showImplement && showRequirement && <Divider />}
              {showImplement && (
                <>
                  <Typography style={{ width: "100%" }}>
                    <Typography.Text>實現類或函數</Typography.Text>
                    {input ? (
                      input
                    ) : (
                      <Typography.Paragraph strong>
                        {traceLink.implement.fullyQualifiedName}
                      </Typography.Paragraph>
                    )}
                  </Typography>
                </>
              )}
              {!!showOperation && (
                <div className={styles.operations}>
                  <Button type="danger">刪除</Button>
                </div>
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
  showRequirement: true,
  style: {}
};

export default SimpleTraceLinkCard;
