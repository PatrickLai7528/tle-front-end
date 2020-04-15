import {
  PageHeader,
  Row,
  Col,
  Tabs,
  Descriptions,
  Badge,
  Skeleton,
  Typography
} from "antd";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { ImportProcessStep } from "../../components/import-process-step";
import {
  ImportProccess as ImportProccessType,
  ImportProccess
} from "../../store/import-repository/types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { createUseStyles } from "react-jss";
import { IImportedRepository, IFileTreeNode } from "../../types";
import { RepositoryDescription } from "../../components/repository-description";
import { LanguageBadge } from "../../components/language-badge";

export interface IStateProps {
  repositoryRes: IGHRepositoryRes;
  importProccess?: ImportProccessType;
  importDone: boolean;
  importedRepostiroy: Partial<IImportedRepository>;
}

export interface IDispatchProps {
  startImport: (repositoryRes: IGHRepositoryRes) => void;
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
  steps: {}
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

    const currentStep = toCurrentStep(importProccess);

    const [activeTabKey, setActiveTabKey] = useState<"BASIC_INFO" | "FILES">(
      "BASIC_INFO"
    );

    useEffect(() => {
      if (importDone) return;
      else if (currentStep === 0) startImport(repositoryRes);
    }, [importDone, currentStep, startImport, repositoryRes]);

    const {
      name,
      currentBranch,
      commits,
      shaFileContentMap,
      trees,
      description,
      branches,
      language
    } = importedRepostiroy;

    console.log(commits);

    const flattedTreeNodes = useMemo(() => {
      const res: IFileTreeNode[] = [];
      if (trees) {
        const traverse = (node: IFileTreeNode) => {
          if (node) {
            res.push(node);
          }
          for (const subNode of node.subTrees || []) {
            traverse(subNode);
          }
        };
        trees.forEach(traverse);
      }
      return res;
    }, [trees]);

    console.log(flattedTreeNodes);

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
                  <Descriptions bordered>
                    <Descriptions.Item label="名稱">
                      {!!name ? <span>{name}</span> : <Skeleton.Input active />}
                    </Descriptions.Item>
                    <Descriptions.Item label="語言">
                      {!!language ? (
                        <LanguageBadge language={language} />
                      ) : (
                        <Skeleton.Input active />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="當前分支">
                      {!!currentBranch ? (
                        <span>{currentBranch}</span>
                      ) : (
                        <Skeleton.Input active />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="描述" span={3}>
                      {!!description ? (
                        <RepositoryDescription description={description} />
                      ) : (
                        <Skeleton.Input active />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="其它分支" span={3}>
                      {!!branches ? (
                        <Typography.Paragraph>
                          <ul>
                            {branches.map(branch => (
                              <li key={branch.name}>{branch.name}</li>
                            ))}
                          </ul>
                        </Typography.Paragraph>
                      ) : (
                        <Skeleton
                          active
                          paragraph={{ rows: 3 }}
                          avatar={false}
                          title={false}
                        />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("commit")} span={3}>
                      {!!commits ? (
                        <Typography.Paragraph>
                          <ul>
                            {commits.map(commit => (
                              <li key={commit.sha}>{commit.message}</li>
                            ))}
                          </ul>
                        </Typography.Paragraph>
                      ) : (
                        <Skeleton
                          paragraph={{ rows: 3 }}
                          avatar={false}
                          title={false}
                          active
                        />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label={"文件"} span={3}>
                      trees
                    </Descriptions.Item>
                  </Descriptions>
                </Tabs.TabPane>
                <Tabs.TabPane tab={"文件"} key={"FILES"}>
                  Content of Tab Pane 2
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
