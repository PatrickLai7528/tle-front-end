import React, { FunctionComponent, memo } from "react";
import { IRequirementDescription } from "../../../types";
import { createUseStyles } from "react-jss";
import { Typography, Badge, Card } from "antd";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

export interface IRequirementDetailProps {
  description: IRequirementDescription;
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
  }
});

const bodyStyle = { padding: "8px 12px" };

const RequirementDetail: FunctionComponent<IRequirementDetailProps> = memo(
  (props: IRequirementDetailProps) => {
    const { description } = props;
    const styles = useStyles();
    const { t } = useTranslation();
    const { text, traced, relatedImplementIds } = description;

    return (
      <Typography className={styles.requirementDetail}>
        <Typography.Title level={3}>需求描述</Typography.Title>
        <ReactMarkdown source={text} />
        <Typography.Title level={3}>追踪線索</Typography.Title>
        <Badge
          status={traced ? "success" : "error"}
          text={traced ? t("tracing") : t("not tracing")}
        />
        <div className={styles.relatedImplements}>
          {(relatedImplementIds || []).map(id => {
            return (
              <Card
                hoverable
                bodyStyle={bodyStyle}
                className={styles.implementCard}
              >
                <Card.Meta title={`#${id}`} description="www.instagram.com" />
              </Card>
            );
          })}
        </div>
      </Typography>
    );
  }
);

export default RequirementDetail;
