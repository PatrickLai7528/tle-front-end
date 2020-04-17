import React, { FunctionComponent, memo } from "react";
import { IFileTreeNode, ShaFileContentMap } from "../../types";
import { Tree } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";

export interface IFileTreeProps {
  treeData: IFileTreeNode[];
  shaFileContentMap: ShaFileContentMap;
  defaultExpandAll?: boolean;
  showLoading?: boolean;
  onClick?: (treeNode: IFileTreeNode) => void;
}

const normalize = (
  root: IFileTreeNode[],
  shaFileContentMap: ShaFileContentMap
) => {
  if (root) {
    let res: any = [];
    let mapping: any = {};
    for (const node of root) {
      let children;
      let icon;
      if (node.type === "FOLDER") {
        let res: any[] = normalize(node.subTrees || [], shaFileContentMap);
        children = res[0];
        mapping = {
          ...mapping,
          ...res[1]
        };
      } else if (node.type === "FILE") {
        children = [];
        icon = !!shaFileContentMap[node.sha] ? (
          <CheckCircleOutlined />
        ) : (
          <LoadingOutlined />
        );
        mapping[node.sha] = { ...node };
      }
      res.push({
        key: node.sha,
        title: node.path,
        children,
        icon
      });
    }
    return [res, mapping];
  }
  return [[], {}];
};

const useStyles = createUseStyles({
  fileTrees: {}
});

const FileTree: FunctionComponent<IFileTreeProps> = memo(
  (props: IFileTreeProps) => {
    const {
      treeData,
      shaFileContentMap,
      defaultExpandAll,
      showLoading,
      onClick
    } = props;
    const styles = useStyles();

    const [newTreeData, shaMapping] = React.useMemo(
      () => normalize(treeData, shaFileContentMap),
      [treeData, shaFileContentMap]
    );

    return (
      <Tree
        onClick={(e, treeNode) => {
          if (onClick) {
            onClick(shaMapping[treeNode.key.toString()]);
          }
        }}
        selectable={false}
        checkable={false}
        className={styles.fileTrees}
        showIcon={showLoading}
        multiple
        defaultExpandAll={defaultExpandAll}
        autoExpandParent
        defaultExpandParent
        treeData={newTreeData}
      />
    );
  }
);

FileTree.defaultProps = { defaultExpandAll: true, showLoading: true };

export default FileTree;
