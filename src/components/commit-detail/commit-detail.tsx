import { CaretRightOutlined } from "@ant-design/icons";
import {
  Col,
  Collapse,
  Divider,
  Row,
  Statistic,
  Typography,
  Empty,
  Skeleton
} from "antd";
import React, {
  FunctionComponent,
  memo,
  useMemo,
  useRef,
  useEffect
} from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { ICommit, ITraceLink } from "../../types";
import { CommitChangeInfo } from "../commit-change-info";
import { HighlightCode } from "../highlight-code";
import { TraceLinkCard } from "../trace-link-card";

export interface IStateProps {
  traceLinks: ITraceLink[];
  fetchTraceLinkLoading: boolean;
}

export interface IDispatchProps {
  fetchRelatedTraceLinks: (commit: ICommit) => void;
}

export interface IOwnProps {
  commit: ICommit;
}

export interface ICommitDetailProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  commitDetail: {
    width: "100%"
  },
  collapsePanel: {
    background: "#f7f7f7",
    borderRadius: "2px",
    marginBottom: "24px",
    border: "0px",
    overflow: "hidden"
  }
});

const CommitDetail: FunctionComponent<ICommitDetailProps> = memo(
  (props: ICommitDetailProps) => {
    const styles = useStyles();
    const ref = useRef<HTMLDivElement>(null);
    const {
      commit,
      traceLinks,
      fetchRelatedTraceLinks,
      fetchTraceLinkLoading
    } = props;
    const { changedFiles, stats } = commit;
    const { t } = useTranslation();

    const defaultActiveKeys = useMemo(
      () => (changedFiles || []).map(changes => changes.sha),
      [changedFiles]
    );

    useEffect(() => {
      const doFetch = async () => {
        try {
          await fetchRelatedTraceLinks(commit);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };

      doFetch();
    }, [fetchRelatedTraceLinks, commit]);

    return (
      <div className={styles.commitDetail} ref={ref}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic title={"總修改量"} value={stats.total.toString()} />
          </Col>
          <Col span={8}>
            <Statistic
              title={"增加"}
              valueStyle={{ color: "#3f8600" }}
              value={stats.additions.toString()}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={"刪除"}
              valueStyle={{ color: "#cf1322" }}
              value={stats.deletions.toString()}
            />
          </Col>
        </Row>
        <Divider />
        <Typography.Title level={3}>關聯的需求</Typography.Title>
        {/* <div>
					{fetchTraceLinkLoading ? (
						<Skeleton
							title={false}
							avatar={false}
							active
							paragraph={{ rows: 5 }}
						/>
					) : traceLinks ? (
						(traceLinks || []).map((link) => (
							<TraceLinkCard traceLink={link} editable={false} />
						))
					) : (
						<Empty />
					)}
				</div> */}
        <Divider />
        <Typography.Title level={3}>變更的文件</Typography.Title>
        <CommitChangeInfo
          style={{ marginBottom: "16px" }}
          changes={changedFiles}
          getContainer={
            ref && ref.current ? () => ref.current as HTMLElement : undefined
          }
        />
        <Collapse
          defaultActiveKey={defaultActiveKeys}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {(changedFiles || []).map(changes => {
            const language = (changes.filename || "").split(".")[1] || "";
            return (
              <Collapse.Panel
                header={<span id={changes.sha}>{changes.filename}</span>}
                key={changes.sha}
              >
                {changes.patch ? (
                  <HighlightCode
                    useDiff
                    code={changes.patch}
                    language={language}
                  />
                ) : (
                  <Typography.Text code>{t("no change")}</Typography.Text>
                )}
              </Collapse.Panel>
            );
          })}
        </Collapse>
        <Divider />
      </div>
    );
  }
);

export default CommitDetail;
