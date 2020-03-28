import * as stubs from "./../stubs";

export type GitHubAPIRepositoryResponse = typeof stubs.repositories[0];

export type GitHubAPIRepositoriesResponse = typeof stubs.repositories;

export type GitHubAPITreeResponse = typeof stubs.tree;

export type GitHubAPIBlobResponse = typeof stubs.blob;

export type GitHubAPIBranchesResponse = typeof stubs.branches;

export type GitHubAPICommitsResponse = typeof stubs.commits;

export type GitHubAPIDetailCommitResponse = typeof stubs.detailCommit;

export interface IBranch {
  // 分支名稱
  name: string;
  // 提交SHA
  commitHeadSha: string;
}

export interface ICommitChanges {
  sha: string;
  // 含路徑
  filename: string;
  // 狀態
  status: string;
  additions: number;
  deletions: number;
  //https://stackoverflow.com/questions/8279602/what-is-a-patch-in-git-version-control
  patch: string;
  // 修改的文件內容
  rawContent: string;
}

export interface ICommit {
  sha: string;
  changedFiles: ICommitChanges[];
  message: string;
  committer: { id?: string } | null;
  committedAt: number;
  author: { id: string } | null;
  parents: {
    sha: string;
  }[];
  stats: { total: number; additions: number; deletions: number };
}

export interface IImportedRepository {
  // 倉庫名稱
  name: string;

  ownerId: string;

  currentBranch: string;

  branches: IBranch[];

  trees: IFileTreeNode[];

  commits: ICommit[];

  /**
   * @key file's sha
   * @value file's content
   */
  shaFileContentMap: { [key: string]: string };
}

export interface IFileTreeNode {
  // 唯一標識
  sha: string;
  // 文件名稱不含路徑
  path: string;
  // 類型
  type: "FOLDER" | "FILE";
  // 子樹
  subTrees: IFileTreeNode[] | null;
}
