import {
  Alert,
  Button,
  Col,
  Input,
  PageHeader,
  Row,
  Tabs,
  Tooltip
} from "antd";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import { ImportProcessStep } from "../../components/import-process-step";
import {
  ImportProccess,
  ImportProccess as ImportProccessType
} from "../../store/import-repository/types";
import {
  IImportedRepository,
  IRequirement,
  IRequirementDescription,
  ITraceLinkMatrix
} from "../../types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { TraceLinkCard } from "./../../components/trace-link-card";
import BasicInfoDescriptions from "./basic-info-descriptions";
import { ConnectedEditInitTraceLinkModal } from "../../components/edit-init-trace-link-modal";

export interface IStateProps {
  repositoryRes: IGHRepositoryRes;
  importProccess?: ImportProccessType;
  importDone: boolean;
  importedRepostiroy: Partial<IImportedRepository>;
  initTraceLinkMatrix?: ITraceLinkMatrix;
  genInitTraceLinkLoading: boolean;
  initTraceLinkConfirmed: boolean;
  confirmImportLoading: boolean;
}

export interface IDispatchProps {
  startImport: (repositoryRes: IGHRepositoryRes) => void;
  generateInitTraceLinkMatrix: (requirement: IRequirement) => void;
  toggleInitTraceLinkModal: () => void;
  confirmImport: (repo: IImportedRepository, matrix: ITraceLinkMatrix) => void;
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
      genInitTraceLinkLoading,
      generateInitTraceLinkMatrix,
      toggleInitTraceLinkModal,
      confirmImport,
      confirmImportLoading
    } = props;

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

    const [initRequirement, setInitRequirement] = useState<string>("");

    useEffect(() => {
      if (importDone) return;
      else if (currentStep === 0) startImport(repositoryRes);
    }, [importDone, currentStep, startImport, repositoryRes]);

    const confirmImportButtonDisable = !initTraceLinkConfirmed || !importDone;

    const confirmImportButton = (
      <Button
        block
        className={styles.confirmImportButton}
        loading={confirmImportLoading}
        type="primary"
        onClick={async () => {
          confirmImport(
            importedRepostiroy as IImportedRepository,
            initTraceLinkMatrix as ITraceLinkMatrix
          );
        }}
        disabled={confirmImportButtonDisable}
      >
        確認導入
      </Button>
    );

    return (
      <div className={styles.importProcess}>
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
                  <BasicInfoDescriptions
                    repo={importedRepostiroy as IImportedRepository}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab={"追踪線索"} key={"INIT_TRACE_LINK"}>
                  {!initTraceLinkConfirmed ? (
                    <>
                      <Alert
                        className={styles.initRequirementAlert}
                        message="數據格式"
                        description="用;分隔需求描述"
                        type="info"
                        showIcon
                      />
                      <Input.TextArea
                        className={styles.initRequirementTextArea}
                        value={initRequirement}
                        onChange={e => setInitRequirement(e.target.value)}
                        autoSize={{ minRows: 10 }}
                      />
                      <Button
                        loading={genInitTraceLinkLoading}
                        onClick={async () => {
                          const requirement: IRequirement = {
                            relatedRepoName:
                              importedRepostiroy.name || repositoryRes.name,
                            descriptions: initRequirement
                              .split(";")
                              .map(desc => {
                                return {
                                  text: desc
                                } as IRequirementDescription;
                              })
                          };
                          await generateInitTraceLinkMatrix(requirement);
                          toggleInitTraceLinkModal();
                        }}
                      >
                        生成追踪線索
                      </Button>
                      <ConnectedEditInitTraceLinkModal
                        width={"80vw"}
                        traceLinkMatrix={initTraceLinkMatrix}
                      />
                    </>
                  ) : (
                    (initTraceLinkMatrix?.links || []).map(link => (
                      <TraceLinkCard
                        key={link.id}
                        traceLink={link}
                        editable={false}
                      />
                    ))
                  )}
                </Tabs.TabPane>
              </Tabs>
              {confirmImportButtonDisable ? (
                <Tooltip title="等待導入或初始化追踪線索">
                  {confirmImportButton}
                </Tooltip>
              ) : (
                confirmImportButton
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
);

export default ImportRepositoryProcess;
