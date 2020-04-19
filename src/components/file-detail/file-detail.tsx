import { Col, Divider, Empty, Row, Skeleton, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect, useMemo } from "react";
import { IFileTreeNode, ITraceLink } from "../../types";
import { HighlightCode } from "../highlight-code";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

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
      fileNode
    } = props;

    useEffect(() => {
      if (fileNode) {
        const doFetch = async () => {
          try {
            fetchFileRelatedTraceLinks(repoName, fileNode.fullyQuilaifiedName);
          } catch (e) {
            if (process.env.NODE_ENV === "production") {
              console.log(e);
            }
          }
        };
        doFetch();
      }
    }, [repoName, fetchFileRelatedTraceLinks, fileNode]);

    const traceLinksContent = useMemo(() => {
      if (loading) {
        return (
          <Skeleton
            title={false}
            avatar={false}
            active
            paragraph={{ rows: 5 }}
          />
        );
      } else if (
        !loading &&
        fileNode &&
        traceLinks &&
        traceLinks.length !== 0
      ) {
        return traceLinks.map(link => (
          <SimpleTraceLinkCard
            key={link.id}
            traceLink={link}
            showImplement={false}
          />
        ));
      } else {
        return <Empty />;
      }
    }, [loading, fileNode, traceLinks]);

    return (
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>追踪線索</Typography.Title>
          {traceLinksContent}
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
