import {
  Alert,
  Button,
  Col,
  Input,
  PageHeader,
  Row,
  Tabs,
  Tooltip,
  Result,
  Modal
} from "antd";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { ImportProcessStep } from "../../components/import-process-step";
import {
  ImportProccess,
  ImportProccess as ImportProccessType
} from "../../store/import-repository/types";
import {
  IImportedRepository,
  IRequirement,
  IRequirementDescription,
  ITraceLinkMatrix,
  ITraceLink,
  IFileTreeNode
} from "../../types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { TraceLinkCard } from "./../../components/trace-link-card";
import BasicInfoDescriptions from "./basic-info-descriptions";
import { ConnectedEditInitTraceLinkModal } from "../../components/edit-init-trace-link-modal";
import { classifyTraceLinksByRequirement } from "../../utils/trace-links";
import { v4 as uuid } from "uuid";
import { RequirementForm } from "../../components/requirement/requirement-form";
import { RequirementCard } from "../../components/requirement/requirement-card";
import { TraceLinkTabsContent } from "./trace-link-tabs-content";

export interface IStateProps {
  repositoryRes: IGHRepositoryRes;
  importProccess?: ImportProccessType;
  importDone: boolean;
  importedRepostiroy?: Partial<IImportedRepository>;
  initTraceLinkMatrix?: ITraceLinkMatrix;
  initTraceLinkConfirmed: boolean;
  confirmImportLoading: boolean;
}

export interface IDispatchProps {
  startImport: (repositoryRes: IGHRepositoryRes) => void;
  confirmImport: (
    repo: Omit<IImportedRepository, "_id">,
    requirement: Omit<IRequirement, "_id">,
    matrix: Omit<ITraceLinkMatrix, "_id">
  ) => void;
  stopImport: () => void;
}

export interface IOwnProps extends RouteComponentProps<{ id: string }> {}

export interface IImportRepositoryProcessProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  importProcessContent: {
    background: "#fff",
    padding: "16px"
  },
  importProcess: {
    width: "100%"
  },
  tabs: {},
  steps: {},
  initRequirementAlert: {
    margin: { bottom: "16px" }
  },
  initRequirementTextArea: {
    margin: { bottom: "16px" }
  },
  confirmImportButton: {
    margin: { top: "24px" }
  }
});

const toCurrentStep = (process: ImportProccess | undefined) => {
  if (process)
    return {
      BRANCHES: 1,
      COMMITS: 2,
      FILE_STUCTURE: 3,
      FILE_CONTENT: 4
    }[process];
  else return 0;
};

const ImportRepositoryProcess: FC<IImportRepositoryProcessProps> = memo(
  (props: IImportRepositoryProcessProps) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const {
      importProccess,
      importDone,
      startImport,
      importedRepostiroy,
      match: {
        params: { id }
      },
      initTraceLinkConfirmed,
      repositoryRes,
      initTraceLinkMatrix,
      confirmImport,
      confirmImportLoading,
      stopImport,
      history
    } = props;

    const [isBlocking, setIsBlocking] = useState<boolean>(
      !!importProccess && !importDone
    );

    useEffect(() => setIsBlocking(!!importProccess && !importDone), [
      importProccess,
      importDone
    ]);

    const routes = useMemo(() => {
      return [
        {
          path: "/",
          breadcrumbName: "首頁"
        },
        {
          path: "/authed/repository",
          breadcrumbName: "倉庫"
        },
        {
          path: `/authed/import_process/${id}`,
          breadcrumbName: "導入"
        }
      ];
    }, [id]);

    const currentStep = toCurrentStep(importProccess);

    const [activeTabKey, setActiveTabKey] = useState<
      "BASIC_INFO" | "INIT_TRACE_LINKS"
    >("BASIC_INFO");

    const [descriptions, setDescriptions] = useState<
      Omit<IRequirementDescription, "_id">[]
    >([]);

    useEffect(() => {
      startImport(repositoryRes);
    }, [startImport, repositoryRes]);

    const confirmImportButtonDisable =
      !initTraceLinkConfirmed || !importDone || !initTraceLinkMatrix;

    const confirmImportButton = (
      <Button
        block
        className={styles.confirmImportButton}
        loading={confirmImportLoading}
        type="primary"
        onClick={async () => {
          confirmImport(
            importedRepostiroy as IImportedRepository,
            {
              relatedRepoName: importedRepostiroy!.name!,
              descriptions: descriptions as any
            },
            {
              ...initTraceLinkMatrix,
              relatedRepoName: importedRepostiroy!.name!
            } as ITraceLinkMatrix
          );
        }}
        disabled={confirmImportButtonDisable}
      >
        確認導入
      </Button>
    );

    return (
      <div className={styles.importProcess}>
        <Prompt
          when={isBlocking}
          message={() => {
            if (!isBlocking) {
              return true;
            }
            Modal.warning({
              title: "警告",
              content: "正在導入中，確定離開?",
              cancelText: "取消",
              okText: "確認",
              onOk: () => {
                setIsBlocking(false);
                stopImport();
                history.goBack();
              }
            });
            return false;
          }}
        />
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          title={t("導入倉庫")}
        />
        <Row className={styles.importProcessContent} gutter={[16, 16]}>
          <Col span={24}>
            <div className={styles.steps}>
              <ImportProcessStep currentStep={currentStep} done={importDone} />
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.tabs}>
              <Tabs
                type="card"
                activeKey={activeTabKey}
                onChange={setActiveTabKey as (str: string) => void}
              >
                <Tabs.TabPane tab={"基本信息"} key={"BASIC_INFO"}>
                  <BasicInfoDescriptions repo={importedRepostiroy} />
                  {confirmImportButtonDisable ? (
                    <Tooltip title="等待導入或初始化追踪線索">
                      {confirmImportButton}
                    </Tooltip>
                  ) : (
                    confirmImportButton
                  )}
                </Tabs.TabPane>
                <Tabs.TabPane tab={"追踪線索"} key={"INIT_TRACE_LINK"}>
                  <TraceLinkTabsContent
                    onDescriptionsConfirmed={descriptions =>
                      setDescriptions(descriptions)
                    }
                    initTraceLinkMatrix={initTraceLinkMatrix}
                    repositoryRes={repositoryRes}
                    importedRepository={importedRepostiroy}
                  />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
);

export default ImportRepositoryProcess;
