import { EditOutlined } from "@ant-design/icons";
import { Badge, Card, Input, Typography } from "antd";
import React, { FunctionComponent, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import ReactMarkdown from "react-markdown";
import { IRequirementDescription } from "../../../types";

export interface IRequirementDetailProps {
  description: IRequirementDescription;
  onDescriptionUpdate: (id: string, descriptionText: string) => void;
}

const useStyles = createUseStyles({
  requirementDetail: {
    width: "100%"
  },
  relatedImplements: {
    margin: { top: "16px" },
    display: "flex",
    flexDirection: "column"
  },
  implementCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  editableArea: {
    marginBottom: "16px"
  }
});

const bodyStyle = { padding: "8px 12px" };

const RequirementDetail: FunctionComponent<IRequirementDetailProps> = memo(
  (props: IRequirementDetailProps) => {
    const { description, onDescriptionUpdate } = props;
    const styles = useStyles();
    const [editable, setEditable] = useState<boolean>(false);
    const { text, traced, relatedImplementIds, id } = description;
    const [textAreaValue, setTextAreaValue] = useState<string>(text);
    const { t } = useTranslation();

    return (
      <Typography className={styles.requirementDetail}>
        <Typography.Title level={3}>
          需求描述 <EditOutlined onClick={() => setEditable(true)} />
        </Typography.Title>
        {editable ? (
          <Input.TextArea
            autoFocus
            className={styles.editableArea}
            autoSize
            onBlur={() => {
              setEditable(false);
              onDescriptionUpdate(id, textAreaValue);
            }}
            value={textAreaValue}
            onChange={e => setTextAreaValue(e.target.value)}
          />
        ) : (
          <ReactMarkdown source={textAreaValue} />
        )}
        <Typography.Title level={3}>追踪線索</Typography.Title>
        <Badge
          status={traced ? "success" : "error"}
          text={traced ? t("tracing") : t("not tracing")}
        />
        {traced && (
          <div className={styles.relatedImplements}>
            {(relatedImplementIds || []).map(id => {
              return (
                <Card
                  key={id}
                  hoverable
                  bodyStyle={bodyStyle}
                  className={styles.implementCard}
                >
                  <Card.Meta title={`#${id}`} description="www.instagram.com" />
                </Card>
              );
            })}
          </div>
        )}
      </Typography>
    );
  }
);

export default RequirementDetail;
