import React, { FunctionComponent, memo, useMemo, CSSProperties } from "react";
import { Card, Row, Col } from "antd";
import { SimpleRepoCard } from "../../components/simple-repo-card";
import { createUseStyles } from "react-jss";
import { ProgramLanguage } from "../../utils/language-color";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface IRecentRepo {
  id: string;
  name: string;
  language: ProgramLanguage;
  lastUpdateBy: string;
  lastUpdateAt: number;
  description: string;
}

export interface IRecentReposProps {
  repos: IRecentRepo[];
  style?: CSSProperties;
}

const useStyles = createUseStyles({
  recentRepository: {
    width: "100%"
  }
});

const bodyStyle = { padding: 0 };

const RecentRepos: FunctionComponent<IRecentReposProps> = memo(
  (props: IRecentReposProps) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { repos } = props;

    return (
      <Card
        style={props.style}
        extra={<Link to={`/authed/repository`}>{t("all repository")}</Link>}
        title={t("recent repository")}
        bodyStyle={bodyStyle}
        className={styles.recentRepository}
      >
        <Row>
          {repos.map(repo => {
            return (
              <Col span={8} key={repo.id}>
                <SimpleRepoCard
                  description={repo.description}
                  repositoryName={repo.name}
                  language={repo.language}
                  lastUpdateAt={repo.lastUpdateAt}
                  lastUpdateBy={repo.lastUpdateBy}
                />
              </Col>
            );
          })}
        </Row>
      </Card>
    );
  }
);

RecentRepos.defaultProps = { style: {} };

export default RecentRepos;
