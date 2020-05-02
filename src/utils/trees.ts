import { IFileTreeNode } from "../types";

const flatten = (nodes: IFileTreeNode[]): IFileTreeNode[] => {
  const res: IFileTreeNode[] = [];
  const traverse = (node: IFileTreeNode) => {
    if (node.type === "FILE") {
      res.push({ ...node });
    } else if (node.type === "FOLDER") {
      (node.subTrees || []).map(traverse);
    }
  };

  (nodes || []).map(traverse);

  return res;
};

export const findNodeByName = (
  nodes: IFileTreeNode[],
  fqn: string
): IFileTreeNode | null => {
  const flattenNodes: IFileTreeNode[] = flatten(nodes);

  let found: IFileTreeNode | null = null;

  for (const node of flattenNodes) {
    if (node.fullyQualifiedName === fqn) {
      found = node;
      break;
    }
  }

  return found;
};
