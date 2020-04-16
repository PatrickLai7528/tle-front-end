import React, { FunctionComponent, memo, ReactNode, useState } from "react";
import { ITraceLink, IImplement } from "../../types";
import { createUseStyles } from "react-jss";
import { Card, List, Typography, Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export interface ITraceLinkCardProps {
  traceLink: ITraceLink;
  onDeleteImplement?: (
    traceLink: ITraceLink,
    implementation: IImplement
  ) => void;
  onAddImplement?: (traceLink: ITraceLink, implFilename: string) => void;
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
    const { traceLink, onDeleteImplement, onAddImplement, editable } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    const [newImplValue, setNewImplValue] = useState<string>("");

    const {
      lastUpdateAt,
      lastUpdateByCommit,
      implements: implementations,
      requirementDescription,
      id
    } = traceLink;

    return (
      <Card key={id} bodyStyle={bodyStyle} className={styles.traceLinkCard}>
        <Card.Meta
          description={
            <Typography>
              <Typography.Title level={4}>需求描述</Typography.Title>
              <Typography.Paragraph>
                {requirementDescription.text}
              </Typography.Paragraph>
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
                  if (newImplValue && newImplValue !== "" && onAddImplement) {
                    onAddImplement(traceLink, newImplValue);
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
          dataSource={implementations}
          renderItem={item => (
            <List.Item
              actions={
                editable
                  ? [
                      <Button
                        onClick={() => {
                          if (onDeleteImplement) {
                            onDeleteImplement(traceLink, item);
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
                description={`#${item.id}`}
                title={item.fullyQualifiedName}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
);

export default TraceLinkCard;
