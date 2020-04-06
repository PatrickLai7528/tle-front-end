import React, { FunctionComponent, memo, useMemo, CSSProperties } from "react";
import { Card, Row, Col } from "antd";
import { SimpleRepoCard } from "../../components/simple-repo-card";
import { createUseStyles } from "react-jss";
import { ProgramLanguage } from "../../utils/language-color";

export interface IRecentRepo {
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

const RecentRepos: FunctionComponent<IRecentReposProps> = memo(
  (props: IRecentReposProps) => {
    const styles = useStyles();
    const { repos } = props;

    const [firstRow, secondRow] = useMemo(() => {
      const firstRow = repos.slice(0, 3);
      const secondRow = repos.slice(3, 6);
      return [firstRow, secondRow];
    }, [repos]);

    return (
      <Card
        style={props.style}
        extra={<a>全部項目</a>}
        title={"常用項目"}
        bodyStyle={{ padding: 0 }}
        className={styles.recentRepository}
      >
        <Row>
          {firstRow.map((repo, index) => {
            return (
              <Col span={8} key={index}>
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
        <Row>
          {secondRow.map((repo, index) => {
            return (
              <Col span={8} key={index}>
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
