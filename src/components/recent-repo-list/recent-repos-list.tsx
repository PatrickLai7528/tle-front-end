import { Card, Col, Row, Skeleton, Empty } from "antd";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  ReactNode
} from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { SimpleRepoCard } from "../simple-repo-card";
import { IRecentRepo } from "../../types";

export interface IStateProps {
  repos: IRecentRepo[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchRecentRepos: () => void;
}

export interface IOwnProps {
  style?: CSSProperties;
}

export interface IRecentReposProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

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
    const { repos, style, fetchRecentRepos, loading } = props;

    useEffect(() => {
      const doIt = async () => {
        try {
          await fetchRecentRepos();
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };
      doIt();
    }, [fetchRecentRepos]);

    const contents = useMemo(() => {
      if (loading) {
        let contents: ReactNode[] = [];
        for (let i = 0; i < 6; i++) {
          contents.push(
            <Col span={8} key={i}>
              <div style={{ padding: "16px" }}>
                <Skeleton />
              </div>
            </Col>
          );
        }
        return contents;
      } else if (!repos || repos.length === 0) {
        return <Empty />;
      } else {
        return repos.map(repo => {
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
        });
      }
    }, [repos, loading]);

    return (
      <Card
        style={style}
        extra={<Link to={`/authed/repository`}>{t("all repository")}</Link>}
        title={t("recent repository")}
        bodyStyle={bodyStyle}
        className={styles.recentRepository}
      >
        <Row>{contents}</Row>
      </Card>
    );
  }
);

RecentRepos.defaultProps = { style: {} };

export default RecentRepos;
