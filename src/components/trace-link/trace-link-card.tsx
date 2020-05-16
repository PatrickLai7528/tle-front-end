import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, List, Typography } from "antd";
import React, { FunctionComponent, memo, useState } from "react";
import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";
import { IRequirementDescription, ITraceLink, IImplement } from "../../types";

export interface ITraceLinkCardProps {
  requirement: IRequirementDescription;
  tracelinks: ITraceLink[];
  onDeleteLink?: (traceLink: ITraceLink) => void;
  onAddLink?: (traceLink: ITraceLink) => void;
  editable: boolean;
}

const useStyles = createUseStyles({
  traceLinkCard: {
    margin: { bottom: "24px" },
    width: "100%"
  },
  implementList: {},
  implementTitle: {
    margin: { top: "16px" }
  },
  plusIcon: {
    margin: { left: "8px" }
  }
});

const bodyStyle = { padding: "12px" };

const TraceLinkCard: FunctionComponent<ITraceLinkCardProps> = memo(
  (props: ITraceLinkCardProps) => {
    const styles = useStyles();
    const {
      requirement,
      tracelinks,
      onAddLink,
      onDeleteLink,
      editable
    } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    const [newImplValue, setNewImplValue] = useState<string>("");

    return (
      <Card bodyStyle={bodyStyle} className={styles.traceLinkCard}>
        <Card.Meta
          description={
            <Typography>
              <Typography.Title level={4}>需求描述</Typography.Title>
              <Typography.Paragraph>{requirement.name}</Typography.Paragraph>
            </Typography>
          }
        />
        <Typography.Title level={4} className={styles.implementTitle}>
          與需求關聯的類或函數
          {editable && (
            <PlusCircleOutlined
              className={styles.plusIcon}
              onClick={() => setShowInput(true)}
            />
          )}
        </Typography.Title>
        {showInput && (
          <Input
            autoFocus
            value={newImplValue}
            onChange={e => setNewImplValue(e.target.value)}
            addonAfter={
              <Button
                size="small"
                type="link"
                onBlur={() => {
                  setShowInput(false);
                }}
                onClick={() => {
                  if (newImplValue && newImplValue !== "" && onAddLink) {
                    onAddLink({
                      _id: uuidv4(),
                      requirementDescription: requirement,
                      implement: {
                        type: "CLASS",
                        fullyQualifiedName: newImplValue
                      } as IImplement
                    });
                    // onAddImplement(traceLink, newImplValue);
                    setNewImplValue("");
                  }
                }}
              >
                確認
              </Button>
            }
          />
        )}
        <List
          className={styles.implementList}
          itemLayout="horizontal"
          dataSource={tracelinks}
          renderItem={link => (
            <List.Item
              actions={
                editable
                  ? [
                      <Button
                        onClick={() => {
                          if (onDeleteLink) {
                            onDeleteLink(link);
                          }
                        }}
                        type={"danger"}
                        size={"small"}
                      >
                        刪除
                      </Button>
                    ]
                  : []
              }
            >
              <List.Item.Meta
                description={link.implement._id ? `#${link.implement._id}` : ""}
                title={link.implement.fullyQualifiedName}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
);

export default TraceLinkCard;
