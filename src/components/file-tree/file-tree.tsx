import React, { FunctionComponent, memo } from "react";
import { IFileTreeNode, ShaFileContentMap } from "../../types";
import { Tree } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";

export interface IFileTreeProps {
  treeData: IFileTreeNode[];
  shaFileContentMap: ShaFileContentMap;
}

const normalize = (
  root: IFileTreeNode[],
  shaFileContentMap: ShaFileContentMap
) => {
  if (root) {
    let res: any = [];
    let keys: any = [];
    for (const node of root) {
      let children;
      let subKeys: any[] = [];
      let icon;
      if (node.type === "FOLDER") {
        let res: any[] = normalize(node.subTrees || [], shaFileContentMap);
        children = res[0];
        subKeys = [...res[1], node.sha];
      } else if (node.type === "FILE") {
        children = [];
        icon = !!shaFileContentMap[node.sha] ? (
          <CheckCircleOutlined />
        ) : (
          <LoadingOutlined />
        );
      }
      res.push({
        key: node.sha,
        title: node.path,
        children,
        icon
      });
      keys = [...keys, ...subKeys];
    }
    return [res, [...keys]];
  }
  return [[], []];
};

const FileTree: FunctionComponent<IFileTreeProps> = memo(
  (props: IFileTreeProps) => {
    const { treeData, shaFileContentMap } = props;

    const [newTreeData, keys] = React.useMemo(
      () => normalize(treeData, shaFileContentMap),
      [treeData, shaFileContentMap]
    );

    return (
      <Tree
        showIcon
        multiple
        defaultExpandAll
        autoExpandParent
        defaultExpandParent
        treeData={newTreeData}
      />
    );
  }
);

export default FileTree;
