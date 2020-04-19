import { Card, Col, Row, Progress, Tooltip } from "antd";
import moment from "moment";
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { IImportedRepository } from "../../types";
import PropertyItem from "./property-item";
import { LinkOutlined } from "@ant-design/icons";
import { toGitHubCommitPage } from "../../configs/github-auth.config";
import { Link } from "react-router-dom";
import { RouteConstants } from "../../routes/constants";

export interface IRepositoryCardProps {
  repo: IImportedRepository;
}

const useStyles = createUseStyles({
  repoCard: {
    width: "100%",
    margin: { bottom: "16px" }
  }
});

const bodyStyle = { padding: "8px" };

const RepositoryCard: FunctionComponent<IRepositoryCardProps> = memo(
  (props: IRepositoryCardProps) => {
    const { repo } = props;
    const { name, ownerId, currentBranch, commits, lastUpdateAt, _id } = repo;
    const styles = useStyles();

    const lastCommitSha = commits[0].sha;
    const shortLastCommitSha = lastCommitSha.substr(0, 6);

    return (
      <Card className={styles.repoCard} bodyStyle={bodyStyle}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <PropertyItem
              property={ownerId}
              value={
                <Link to={RouteConstants.REPOSITORY_DETAIL(_id)}>{name}</Link>
              }
            />
          </Col>
          <Col span={6}>
            <PropertyItem property={"DEFAULT BRANCH"} value={currentBranch} />
          </Col>
          <Col span={6}>
            <PropertyItem
              property={"COMMIT"}
              value={
                <Tooltip title="View in GitHub">
                  <a href={toGitHubCommitPage(ownerId, name, lastCommitSha)}>
                    {shortLastCommitSha}
                    <LinkOutlined />
                  </a>
                </Tooltip>
              }
            />
          </Col>
          <Col span={6}>
            <PropertyItem
              property={"UPDATED"}
              value={moment(lastUpdateAt).fromNow()}
            />
          </Col>
        </Row>
        <Progress percent={50} showInfo={false} />
      </Card>
    );
  }
);

export default RepositoryCard;
