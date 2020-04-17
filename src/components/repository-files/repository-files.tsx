import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { IFileTreeNode, ShaFileContentMap } from "../../types";
import { FileTree } from "../file-tree";
import PropertyCard from "../property-card/property-card";

export interface IRepositoryFilesProps {
  treeData: IFileTreeNode[];
  shaFileContentMap: ShaFileContentMap;
  onFileNodeClick: (node: IFileTreeNode) => void;
}

const useStyles = createUseStyles({
  fileTreeArea: {
    margin: { left: "8px", right: "8px" }
  },
  fileContentArea: {
    margin: "8px"
  }
});

const RepositoryFiles: FunctionComponent<IRepositoryFilesProps> = memo(
  (props: IRepositoryFilesProps) => {
    const { treeData, shaFileContentMap, onFileNodeClick } = props;
    const styles = useStyles();

    return (
      <PropertyCard titleProps={{ text: "文件" }}>
        <div className={styles.fileTreeArea}>
          <FileTree
            onClick={onFileNodeClick}
            showLoading={false}
            treeData={treeData}
            shaFileContentMap={shaFileContentMap}
          />
        </div>
      </PropertyCard>
    );
  }
);

export default RepositoryFiles;
