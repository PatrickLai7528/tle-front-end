import React, { FunctionComponent, memo } from "react";
import { IFileTreeNode } from "../../types";
import { Tree } from "antd";

export interface IStateProps {
  treeData: IFileTreeNode[];
}

export interface IDispatchProps {}

export interface IOwnProps {}

export interface IProccessiveLoadingFileTreeProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const normalize = (root: IFileTreeNode[]) => {
  if (root) {
    let res: any = [];
    let keys: any = [];
    for (const node of root) {
      let children;
      let subKeys: any[] = [];
      if (node.type === "FOLDER") {
        let res: any[] = normalize(node.subTrees || []);
        children = res[0];
        subKeys = [...res[1], node.sha];
      } else if (node.type === "FILE") {
        children = [];
      }
      res.push({
        key: node.sha,
        title: node.path,
        children
      });
      keys = [...keys, ...subKeys];
    }
    return [res, [...keys]];
  }
  return [[], []];
};

const ProccessiveLoadingFileTree: FunctionComponent<IProccessiveLoadingFileTreeProps> = memo(
  (props: IProccessiveLoadingFileTreeProps) => {
    const { treeData } = props;

    const [newTreeData, keys] = React.useMemo(() => normalize(treeData), [
      treeData
    ]);

    console.log(keys);

    return (
      <Tree.DirectoryTree
        multiple
        defaultExpandAll
        autoExpandParent
        defaultExpandParent
        expandedKeys={keys}
        treeData={newTreeData}
      />
    );
  }
);

export default ProccessiveLoadingFileTree;
