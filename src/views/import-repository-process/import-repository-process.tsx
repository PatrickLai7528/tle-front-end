import { Button, PageHeader, Typography, Row, Col } from "antd";
import React, { FC, memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { ImportProcessStep } from "../../components/import-process-step";
import { ConnectedProccessiveLoadingFileTree } from "../../components/proccessive-loading-file-tree";
import { ImportProccess as ImportProccessType } from "../../store/import-repository/types";
import { IBranch, ICommit } from "../../types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import "./style.scss";
import { CommitMessage } from "../../components/commit-message";

export interface IStateProps {
  // repository?: IImportedRepository;

  repositoryRes: IGHRepositoryRes;

  importProccess?: ImportProccessType;
  branches?: IBranch[];
  commits?: ICommit[];
  importDone: boolean;
}

export interface IDispatchProps {
  startImport: (repositoryRes: IGHRepositoryRes) => void;
  cloneBranches: () => void;
  cloneCommits: () => void;
  cloneFileStructure: () => void;
  cloneFileContent: () => void;
  finishImport: () => void;
}

export interface IOwnProps extends RouteComponentProps<{ id: string }> {}

export interface IImportRepositoryProcessProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const ImportRepositoryProcess: FC<IImportRepositoryProcessProps> = memo(
  (props: IImportRepositoryProcessProps) => {
    const { t } = useTranslation();
    const {
      importProccess,
      cloneBranches,
      cloneCommits,
      cloneFileStructure,
      branches,
      cloneFileContent,
      commits,
      finishImport,
      importDone,
      startImport,
      match: {
        params: { id }
      },
      repositoryRes
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

    const currentStep = useMemo(() => {
      if (importProccess)
        return {
          BRANCHES: 1,
          COMMITS: 2,
          FILE_STUCTURE: 3,
          FILE_CONTENT: 4
        }[importProccess];
      else return 0;
    }, [importProccess]);

    useEffect(() => {
      if (importDone) return;
      else if (currentStep === 0) {
        startImport(repositoryRes);
        cloneBranches();
      } else if (currentStep === 1) cloneCommits();
      else if (currentStep === 2) cloneFileStructure();
      else if (currentStep === 3) cloneFileContent();
      else if (currentStep === 4) finishImport();
    }, [
      t,
      importDone,
      currentStep,
      cloneCommits,
      cloneBranches,
      cloneFileStructure,
      cloneFileContent,
      finishImport,
      startImport,
      repositoryRes
    ]);

    return (
      <div className={"import-repository-process"}>
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          title={t("導入倉庫")}
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
            </Button>
          ]}
        >
          <ImportProcessStep currentStep={currentStep} done={importDone} />
          <Typography className={"import-result"}>
            <Typography.Title level={3}>分支</Typography.Title>
            {branches &&
              branches.map(branch => (
                <Typography.Paragraph key={branch.name}>
                  {branch.name}
                </Typography.Paragraph>
              ))}
            <Typography.Title level={3}>提交</Typography.Title>
            {commits &&
              commits.map(commit => {
                return (
                  <CommitMessage
                    key={commit.sha}
                    sha={commit.sha}
                    message={commit.message}
                    committedAt={commit.committedAt}
                    committerId={commit.committer?.id || ""}
                  />
                );
              })}
            <Typography.Title level={3}>文件結構</Typography.Title>
            <ConnectedProccessiveLoadingFileTree />
          </Typography>
        </PageHeader>
      </div>
    );
  }
);

export default ImportRepositoryProcess;