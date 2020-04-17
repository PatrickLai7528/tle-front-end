import React, {
  FunctionComponent,
  memo,
  useState,
  useEffect,
  useMemo
} from "react";
import { Row, Col, Typography, Collapse, Empty, Spin, Card } from "antd";
import { FileTree } from "../file-tree";
import { HighlightCode } from "../highlight-code";
import { IFileTreeNode, ShaFileContentMap, ITraceLink } from "../../types";
import { createUseStyles } from "react-jss";
import { classifyTraceLinkByFile } from "../../utils/trace-links";
import { traceLinks as traceLinkStubs } from "./../../stubs/trace-link";

export interface IStateProps {
  traceLinks: ITraceLink[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchFileRelatedTraceLinks: (
    repoName: string,
    fullyQualifiedName: string
  ) => void;
}

export interface IOwnProps {
  repoName: string;
  treeData: IFileTreeNode[];
  shaFileContentMap: ShaFileContentMap;
}

export interface IRepositoryFilesProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  fileTreeArea: {
    margin: "8px"
  },
  fileContentArea: {
    margin: "8px"
  },
  implementCard: {
    margin: { top: "8px" },
    width: "100%"
  }
});
const bodyStyle = { padding: "8px 12px" };

const RepositoryFiles: FunctionComponent<IRepositoryFilesProps> = memo(
  (props: IRepositoryFilesProps) => {
    const {
      treeData,
      shaFileContentMap,
      loading,
      fetchFileRelatedTraceLinks,
      repoName,
      traceLinks
    } = props;
    const styles = useStyles();

    const [selectedNode, setSelectedNode] = useState<IFileTreeNode | null>(
      null
    );

    const [activeCollapseKeys, setActiveCollapseKeys] = useState<string[]>([]);

    useEffect(() => {
      if (selectedNode) {
        const doFetch = async () => {
          try {
            fetchFileRelatedTraceLinks(
              repoName,
              selectedNode.fullyQuilaifiedName
            );
          } catch (e) {
            if (process.env.NODE_ENV === "production") {
              console.log(e);
            }
          }
        };
        doFetch();
      }
    }, [repoName, fetchFileRelatedTraceLinks, selectedNode]);

    return (
      <Spin spinning={loading}>
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>文件夾</Typography.Title>
            <div className={styles.fileTreeArea}>
              <FileTree
                onClick={node => {
                  if (node.type === "FILE") {
                    setSelectedNode(node);
                    // select file, not folder
                    setActiveCollapseKeys([
                      "file content",
                      "trace link",
                      ...activeCollapseKeys
                    ]);
                  }
                }}
                showLoading={false}
                defaultExpandAll={false}
                treeData={treeData}
                shaFileContentMap={shaFileContentMap}
              />
            </div>
          </Col>
          <Col span={24}>
            <Collapse
              activeKey={activeCollapseKeys}
              onChange={key => {
                if (typeof key === "string") {
                  setActiveCollapseKeys([key]);
                } else if (Array.isArray(key)) {
                  setActiveCollapseKeys([...key]);
                }
              }}
            >
              <Collapse.Panel header={"文件內容"} key="file content">
                {!!selectedNode ? (
                  <HighlightCode
                    code={shaFileContentMap[selectedNode.sha]}
                    language={""}
                  />
                ) : (
                  <Empty />
                )}
              </Collapse.Panel>
              <Collapse.Panel header={"追踪線索"} key="trace link">
                {!!selectedNode && !!traceLinks ? (
                  traceLinks.map(link => {
                    return (
                      <Card
                        key={link.id}
                        hoverable
                        bodyStyle={bodyStyle}
                        className={styles.implementCard}
                      >
                        <Card.Meta
                          title={`#${link.id}`}
                          description={link.requirementDescription.text}
                        />
                      </Card>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Spin>
    );
  }
);

export default RepositoryFiles;
