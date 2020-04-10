import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Steps, Typography, message } from "antd";
import React, { FunctionComponent, memo, useEffect, useMemo } from "react";
import { ImportProccess as ImportProccessType } from "../../store/import-repository/types";
import { IBranch, IImportedRepository, ICommit } from "../../types";
import { ConnectedProccessiveLoadingFileTree } from "../proccessive-loading-file-tree";
import { useTranslation } from "react-i18next";

export interface IStateProps {
  repository?: IImportedRepository;
  importProccess?: ImportProccessType;
  branches?: IBranch[];
  commits?: ICommit[];
  importDone: boolean;
}

export interface IDispatchProps {
  cloneBranches: () => void;
  cloneCommits: () => void;
  cloneFileStructure: () => void;
  cloneFileContent: () => void;
  finishImport: () => void;
}

export interface IOwnProps {}

export interface IImportProccessProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const ImportProccess: FunctionComponent<IImportProccessProps> = memo(
  (props: IImportProccessProps) => {
    const { t } = useTranslation();
    const {
      repository,
      importProccess,
      cloneBranches,
      cloneCommits,
      cloneFileStructure,
      branches,
      cloneFileContent,
      commits,
      finishImport,
      importDone
    } = props;

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
      else if (currentStep === 0) cloneBranches();
      else if (currentStep === 1) cloneCommits();
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
      finishImport
    ]);

    return (
      <>
        {!repository && <Empty />}
        <Steps current={importDone ? 4 : currentStep}>
          <Steps.Step
            title="分支"
            icon={currentStep === 0 && !importDone ? <LoadingOutlined /> : null}
          />
          <Steps.Step
            title="提交"
            icon={currentStep === 1 && !importDone ? <LoadingOutlined /> : null}
          />
          <Steps.Step
            title="文件結構"
            icon={currentStep === 2 && !importDone ? <LoadingOutlined /> : null}
          />
          <Steps.Step
            title="文件內容"
            icon={currentStep === 3 && !importDone ? <LoadingOutlined /> : null}
          />
        </Steps>
        <Typography.Title level={3}>分支</Typography.Title>
        {branches &&
          branches.map(branch => (
            <Typography.Paragraph key={branch.name}>
              {branch.name}
            </Typography.Paragraph>
          ))}
        <Typography.Title level={3}>提交</Typography.Title>
        {commits &&
          commits.map(commit => (
            <Typography.Paragraph key={commit.sha}>
              {commit.sha}
            </Typography.Paragraph>
          ))}
        <Typography.Title level={3}>文件結構</Typography.Title>
        <ConnectedProccessiveLoadingFileTree />
      </>
    );
  }
);

export default ImportProccess;
