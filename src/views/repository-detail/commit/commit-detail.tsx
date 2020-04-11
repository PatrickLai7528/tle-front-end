import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Divider, Row, Statistic, Typography } from "antd";
import React, { FunctionComponent, memo, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import CommitChangeInfo from "../../../components/commit-change-info/commit-change-info";
import { HighlightCode } from "../../../components/highlight-code";
import { ICommit } from "../../../types";

export interface ICommitDetailProps {
  commit: ICommit;
}

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
      commit: { changedFiles, stats }
    } = props;
    const { t } = useTranslation();

    const defaultActiveKeys = useMemo(
      () => (changedFiles || []).map(changes => changes.sha),
      [changedFiles]
    );

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
