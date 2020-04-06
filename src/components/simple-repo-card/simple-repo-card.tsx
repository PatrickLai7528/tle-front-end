import React, { FC, memo } from "react";
import { Card, Typography } from "antd";
import { RepositoryAvatar } from "../repository-avatar";
import { createUseStyles } from "react-jss";
import { ProgramLanguage } from "../../utils/language-color";
import moment from "moment";

export interface IStateProps {}

export interface IDispatchProps {}

export interface IOwnProps {
  repositoryName: string;
  language: ProgramLanguage;
  description: string;
  lastUpdateAt: number;
  lastUpdateBy: string;
}

export interface ISimpleRepoCardProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  simpleRepoCard: {
    height: "100%"
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardTitle: {
    display: "inline-block",
    margin: { left: "10px" }
  },
  cardDescription: {
    margin: { top: "10px", bottom: "10px" }
  },
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  updateDate: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

const SimpleRepoCard: FC<ISimpleRepoCardProps> = memo(
  (props: ISimpleRepoCardProps) => {
    const {
      description,
      repositoryName,
      language,
      lastUpdateAt,
      lastUpdateBy
    } = props;
    const styles = useStyles();
    return (
      <Card
        hoverable
        className={styles.simpleRepoCard}
        bodyStyle={{
          height: "100%",
          padding: "12px"
        }}
      >
        <div className={styles.cardHeader}>
          <RepositoryAvatar
            size={"small"}
            repositoryName={repositoryName}
            language={language}
          />
          <Typography.Text className={styles.cardTitle}>
            {repositoryName}
          </Typography.Text>
        </div>
        <Typography.Paragraph className={styles.cardDescription}>
          {description}
        </Typography.Paragraph>
        <div className={styles.cardBottom}>
          <Typography.Text type="secondary">{lastUpdateBy}</Typography.Text>
          <Typography.Text type="secondary" className={styles.updateDate}>
            {moment(lastUpdateAt).fromNow()}
          </Typography.Text>
        </div>
      </Card>
    );
  }
);

export default SimpleRepoCard;
