import { CaretRightOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Empty,
  Modal,
  Row,
  Skeleton,
  Statistic,
  Tooltip,
  Typography,
  message
} from "antd";
import React, {
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { RootState } from "../../store/reducers";
import { ICommitRelatedTraceLinks } from "../../store/trace-link/types";
import { ICommit, IRequirementDescription, ITraceLink } from "../../types";
import { flatten } from "../../utils/trees";
import { AddTraceLink } from "../add-trace-link";
import { CommitChangeInfo } from "../commit-change-info";
import { HighlightCode } from "../highlight-code";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface IStateProps {
  traceLinks: ICommitRelatedTraceLinks;
  fetchTraceLinkLoading: boolean;
}

export interface IDispatchProps {
  fetchCommitRelatedTraceLinks: (repoName: string, commit: ICommit) => void;
  confirm: (changes: any) => void;
  addCommitRelatedTraceLink: (newLink: NewCommitTraceLink) => void;
  removeCommitRelatedTraceLink: (link: ITraceLink) => void;
}

export interface IOwnProps {
  commit: ICommit;
  repoName: string;
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

export type NewCommitTraceLink = {
  type: "added" | "removed";
  description: IRequirementDescription;
  implement: string;
};

export type RemoveCommitTraceLink = {
  type: "added" | "removed";
  link: ITraceLink;
};

const CommitDetail: FunctionComponent<ICommitDetailProps> = memo(
  (props: ICommitDetailProps) => {
    const styles = useStyles();
    const ref = useRef<HTMLDivElement>(null);
    const {
      commit,
      traceLinks,
      fetchCommitRelatedTraceLinks,
      fetchTraceLinkLoading,
      repoName,
      addCommitRelatedTraceLink,
      removeCommitRelatedTraceLink,
      confirm
    } = props;
    const { changedFiles, stats } = commit;
    const { t } = useTranslation();

    const defaultActiveKeys = useMemo(
      () => (changedFiles || []).map(changes => changes.sha),
      [changedFiles]
    );

    const fullyQualifiedNames: string[] = useSelector<RootState, string[]>(
      state =>
        flatten(
          state.repositoryReducer.importedRepositoryDetail?.trees || []
        ).map(node => node.fullyQualifiedName)
    );

    const descriptions: IRequirementDescription[] = useSelector<
      RootState,
      IRequirementDescription[]
    >(state => state.requirementReducer.requirement?.descriptions || []);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [newTraceLink, setNewTraceLink] = useState<NewCommitTraceLink>({
      type: "added",
      description: descriptions[0],
      implement: fullyQualifiedNames[0]
    });

    useEffect(() => {
      const doFetch = async () => {
        try {
          await fetchCommitRelatedTraceLinks(repoName, commit);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };

      doFetch();
    }, [fetchCommitRelatedTraceLinks, commit, repoName]);

    return (
      <div className={styles.commitDetail} ref={ref}>
        <Modal
          closable={false}
          visible={modalVisible}
          onOk={() => {
            console.log(newTraceLink);
            addCommitRelatedTraceLink(newTraceLink);
            message.success("添加成功");
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        >
          <AddTraceLink
            value={newTraceLink}
            onChange={value => {
              setNewTraceLink(value);
            }}
            fullyQualifiedNames={fullyQualifiedNames}
            descriptions={descriptions}
          />
        </Modal>
        <Typography.Title level={3}>代碼統計</Typography.Title>
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
        <Typography.Title level={3}>追踪線索統計</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic
              title={"總修改量"}
              value={
                traceLinks.added.traceLinks.length +
                traceLinks.removed.traceLinks.length
              }
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={"增加"}
              valueStyle={{ color: "#3f8600" }}
              value={traceLinks.added.traceLinks.length}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={"刪除"}
              valueStyle={{ color: "#cf1322" }}
              value={traceLinks.removed.traceLinks.length}
            />
          </Col>
        </Row>
        <Divider />
        <Typography.Title level={3}>影響的追踪線索</Typography.Title>
        <Card>
          <Card.Meta
            title="操作"
            description={
              <>
                <Tooltip title="變更需要確認後才會生效">
                  <Button
                    type="primary"
                    disabled={traceLinks.confirmed}
                    size="small"
                    onClick={() => confirm(traceLinks)}
                  >
                    確認變更
                  </Button>
                </Tooltip>
                <Button
                  type="primary"
                  size="small"
                  disabled={traceLinks.confirmed}
                  onClick={() => setModalVisible(true)}
                  style={{ marginLeft: "8px" }}
                >
                  增加追踪線索
                </Button>
              </>
            }
          ></Card.Meta>
        </Card>
        <div>
          {fetchTraceLinkLoading ? (
            <Skeleton
              title={false}
              avatar={false}
              active
              paragraph={{ rows: 5 }}
            />
          ) : traceLinks ? (
            <>
              {traceLinks.added.traceLinks.map(link => (
                <SimpleTraceLinkCard
                  key={link._id}
                  showOperation
                  onDelete={link => {
                    message.success("刪除成功");
                    removeCommitRelatedTraceLink(link);
                  }}
                  traceLink={link}
                  type={"ADDED"}
                />
              ))}
              {traceLinks.removed.traceLinks.map(link => (
                <SimpleTraceLinkCard
                  key={link._id}
                  showOperation
                  onDelete={link => {
                    message.success("刪除成功");
                    removeCommitRelatedTraceLink(link);
                  }}
                  traceLink={link}
                  type={"REMOVED"}
                />
              ))}
            </>
          ) : (
            <Empty />
          )}
        </div>
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
