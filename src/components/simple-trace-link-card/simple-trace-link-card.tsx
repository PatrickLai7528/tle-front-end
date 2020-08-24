import { Button, Card, Divider, Tag, Typography, Popconfirm } from "antd";
import React, { CSSProperties, FunctionComponent, memo, useMemo } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { TraceLinkActions } from "../../store/trace-link/types";
import { CustomTheme } from "../../theme";
import { ITraceLink } from "../../types";
import { RequirementCard } from "../requirement/requirement-card";
import { deleteTraceLink } from "../../store/trace-link/actions";
import "./styles.css";

export interface ISimpleTraceLinkCardProps {
  traceLink: ITraceLink | Omit<ITraceLink, "_id">;
  showImplement?: boolean;
  showRequirement?: boolean;
  type?: "ADDED" | "REMOVED";
  showOperation?: boolean;
  style?: CSSProperties;
  deleteType?: "FILE" | "REQUIREMENT";
  onDelete?: (traceLink: ITraceLink) => void;
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
  implementAndOperations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
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
      style,
      deleteType,
      onDelete
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

    const dispatch = useDispatch<AppDispatch<TraceLinkActions>>();

    const matrixId = useSelector<RootState, string>(
      state => state.traceLinkReducer.traceLinkMatrix?._id as string
    );

    const handleDelete = () => {
      if (onDelete) {
        onDelete(traceLink as ITraceLink);
      } else {
        if (matrixId && traceLink && deleteType)
          dispatch(
            deleteTraceLink(matrixId, traceLink as ITraceLink, deleteType)
          );
      }
    };

    const cardTitle = useMemo(() => {
      const text = (traceLink as any)._id
        ? `#${(traceLink as any)._id}`
        : "暫無";

      return (
        <div>
          {!!type && (
            <Tag
              color={type === "ADDED" ? theme.confirmColor : theme.warningColor}
            >
              {type === "ADDED" ? "ADD" : "REMOVE"}
            </Tag>
          )}
          {text}
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
            <>
              {showRequirement && (
                <Typography style={{ width: "100%" }}>
                  <Typography.Text>需求描述</Typography.Text>
                  <RequirementCard
                    useCard={false}
                    description={traceLink.requirementDescription}
                  />
                </Typography>
              )}
              {showImplement && showRequirement && <Divider />}
              <div className={styles.implementAndOperations}>
                {showImplement && (
                  <>
                    <Typography style={{ width: "100%" }}>
                      <Typography.Text>實現類或函數</Typography.Text>
                      <Typography.Paragraph strong>
                        {traceLink.implement.fullyQualifiedName}
                      </Typography.Paragraph>
                    </Typography>
                  </>
                )}
                <div className={styles.operations}>
                  {!!showOperation && (
                    <Popconfirm
                      title="確認刪除？"
                      onConfirm={handleDelete}
                      okText="確認"
                      cancelText="取消"
                    >
                      <Button type="danger">刪除</Button>
                    </Popconfirm>
                  )}
                </div>
              </div>
            </>
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
