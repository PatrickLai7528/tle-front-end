import { Col, Divider, Row, Statistic, Typography, BackTop } from "antd";
import React, { FunctionComponent, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { ICommit } from "../../../types";
import { HighlightCode } from "../../../components/highlight-code";
import CommitChangeInfo from "../../../components/commit-change-info/commit-change-info";

export interface ICommitDetailProps {
  commit: ICommit;
}

const useStyles = createUseStyles({
  commitDetail: {
    width: "100%"
  }
});

const CommitDetail: FunctionComponent<ICommitDetailProps> = memo(
  (props: ICommitDetailProps) => {
    const styles = useStyles();
    const ref = useRef<HTMLDivElement>(null);
    const {
      commit: { changedFiles, stats }
    } = props;
    const { t } = useTranslation();
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

        <Divider />
        <Typography.Title level={3}>變更的文件</Typography.Title>
        <CommitChangeInfo
          changes={changedFiles}
          getContainer={
            ref && ref.current ? () => ref.current as HTMLElement : undefined
          }
        />
        {(changedFiles || []).map(changes => {
          const language = (changes.filename || "").split(".")[1] || "";
          return (
            <>
              <Typography.Title level={4} id={`${changes.sha}`}>
                {changes.filename}
              </Typography.Title>
              {changes.patch ? (
                <HighlightCode
                  useDiff
                  code={changes.patch}
                  language={language}
                />
              ) : (
                <Typography.Text code>{t("no change")}</Typography.Text>
              )}
            </>
          );
        })}
        <Divider />
      </div>
    );
  }
);

export default CommitDetail;
