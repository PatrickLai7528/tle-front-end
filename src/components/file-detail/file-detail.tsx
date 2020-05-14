import { Col, Divider, Empty, Row, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect } from "react";
import { IFileTreeNode, ITraceLink } from "../../types";
import { HighlightCode } from "../highlight-code";
import { TraceLinkContent } from "./trace-link-content";

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
  repoId: string;
  fileNode: IFileTreeNode;
  fileContent: string;
}

export interface IFileDetailProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const FileDetail: FunctionComponent<IFileDetailProps> = memo(
  (props: IFileDetailProps) => {
    const {
      loading,
      fetchFileRelatedTraceLinks,
      repoName,
      traceLinks,
      fileContent,
      repoId,
      fileNode
    } = props;

    useEffect(() => {
      if (fileNode) {
        const doFetch = async () => {
          try {
            fetchFileRelatedTraceLinks(repoName, fileNode.fullyQualifiedName);
          } catch (e) {
            if (process.env.NODE_ENV === "production") {
              console.log(e);
            }
          }
        };
        doFetch();
      }
    }, [repoName, fetchFileRelatedTraceLinks, fileNode]);

    return (
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>追踪線索</Typography.Title>
          <TraceLinkContent
            repoName={repoName}
            repoId={repoId}
            traceLinks={traceLinks}
            loading={loading}
            fileNode={fileNode}
          />
          <Divider />
          <Typography.Title level={3}>源代碼</Typography.Title>
          {!!fileNode ? (
            <HighlightCode code={fileContent} language={"Java"} />
          ) : (
            <Empty />
          )}
        </Col>
      </Row>
    );
  }
);

export default FileDetail;
