import {
  Card,
  Col,
  Row,
  Progress,
  Tooltip,
  Typography,
  Button,
  Popconfirm
} from "antd";
import moment from "moment";
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { IImportedRepository } from "../../types";
import PropertyItem from "./property-item";
import { LinkOutlined } from "@ant-design/icons";
import { toGitHubCommitPage } from "../../configs/github-auth.config";
import { Link } from "react-router-dom";
import { RouteConstants } from "../../routes/constants";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppThunk, AppDispatch } from "../../store/store";
import { RepositoryActions } from "../../store/repository/types";
import { deleteRepository } from "../../store/repository/action";
import { RootState } from "../../store/reducers";

export interface IRepositoryCardProps {
  repo: IImportedRepository;
}

const useStyles = createUseStyles({
  repoCard: {
    width: "100%",
    margin: { bottom: "16px" }
  },
  operationTitle: {
    display: "block"
  },
  deleteButton: {
    margin: { top: "8px", bottom: "8px" }
  }
});

const bodyStyle = { padding: "8px" };

const RepositoryCard: FunctionComponent<IRepositoryCardProps> = memo(
  (props: IRepositoryCardProps) => {
    const { t } = useTranslation();
    const { repo } = props;
    const { name, ownerId, currentBranch, commits, lastUpdateAt, _id } = repo;
    const styles = useStyles();

    const lastCommitSha = commits[0].sha;
    const shortLastCommitSha = lastCommitSha.substr(0, 6);

    const deleteLoading = useSelector<RootState, boolean>(
      state => !!state.repositoryReducer.deleteRepoLoading
    );
    const dispatch = useDispatch<AppDispatch<RepositoryActions>>();

    const onConfirm = () => dispatch(deleteRepository(_id));

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
        <Typography.Text className={styles.operationTitle} type="secondary">
          {t("operation")}
        </Typography.Text>
        <Popconfirm
          title={t("confirm delete?")}
          onConfirm={onConfirm}
          okText={t("confirm")}
          cancelText={t("cancel")}
        >
          <Button
            loading={deleteLoading}
            size="small"
            type="danger"
            className={styles.deleteButton}
          >
            {t("delete")}
          </Button>
        </Popconfirm>
      </Card>
    );
  }
);

export default RepositoryCard;
