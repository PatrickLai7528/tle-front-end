import { IGHTreeRes } from "./../types/github-api/tree";
import { IGHCommitRes } from "./../types/github-api/commit";
import { IGHDetailCommitRes } from "./../types/github-api/detail-commit";
import { IGHBranchesRes } from "./../types/github-api/branch";
import moment from "moment";
import {
  IBranch,
  ICommit,
  ICommitChanges,
  IFileTreeNode
} from "./../types/index";

export const cloneOneCommit = async (url: string, headers: any) => {
  const res: IGHDetailCommitRes = await fetch(url, {
    headers
  }).then(res => res.json());
  const fetchRawContentPromises: Promise<ICommitChanges>[] = (
    res.files || []
  ).map(file =>
    fetch(file.contents_url, { headers })
      .then(res => res.json())
      .then(res => {
        return {
          sha: file.sha,
          filename: file.filename,
          status: file.status,
          additions: file.additions,
          deletions: file.deletions,
          patch: file.patch,
          rawContent:
            res.encoding === "base64" ? atob(res.content) : res.content
        };
      })
  );

  const changedFiles: ICommitChanges[] = await Promise.all<ICommitChanges>(
    fetchRawContentPromises
  );

  return {
    sha: res.sha,
    message: res.commit.message,
    stats: {
      total: res.stats.total,
      additions: res.stats.additions,
      deletions: res.stats.deletions
    },
    author:
      res.author && (res.author as any).login
        ? {
            id: (res.author as any).login
          }
        : null,
    committer:
      res.committer && (res.committer as any).login
        ? {
            id: (res.author as any).login
          }
        : null,
    parents: res.parents.map(parent => {
      return {
        sha: parent.sha
      };
    }),
    committedAt: moment(res.commit.committer.date)
      .toDate()
      .getTime(),
    changedFiles
  };
};

export const cloneManyCommit = async (url: string, headers: any) => {
  let manyCommitResponse: IGHCommitRes[] = await fetch(url, {
    headers
  }).then(res => res.json());
  const commitList: ICommit[] = [];
  for (const res of manyCommitResponse) {
    const oneCommit = await cloneOneCommit(res.url, headers);
    commitList.push({
      ...oneCommit,
      committer: res.committer,
      author: res.author
    } as any);
  }
  return commitList;
};

export const cloneManyBranch = async (
  url: string,
  headers: any,
  defaultBranch = "master"
): Promise<[IBranch[], string[]]> => {
  const branchesResponse: IGHBranchesRes = await fetch(url, {
    headers
  }).then(res => res.json());
  const clonedBranches: IBranch[] = [];
  const commitUrlsFromOtherBranchs: string[] = [];
  for (const branch of branchesResponse) {
    clonedBranches.push({
      name: branch.name,
      commitHeadSha: branch.commit.sha
    } as IBranch);
    if (defaultBranch !== branch.name) {
      commitUrlsFromOtherBranchs.push(branch.commit.url);
    }
  }
  return [clonedBranches, commitUrlsFromOtherBranchs];
};

type Blobs = { sha: string; url: string }[];
export const cloneManyTree = async (
  url: string,
  headers: any,
  update?: (nodes: IFileTreeNode[], blobs: Blobs) => void
): Promise<[IFileTreeNode[], Blobs]> => {
  const res: IGHTreeRes = await fetch(url, { headers }).then(res => res.json());
  const { tree: trees } = res;
  let rootNode: IFileTreeNode[] = [];
  let blobs: Blobs = [];
  for (const tree of trees) {
    //"path": ".travis.yml",
    // "mode": "100644",
    // "type": "blob",
    // "sha": "45d37ed412e7eac04bf7ba3d5e2d9eb87e072f09",
    // "size": 182,
    // "url": "https://api.github.com/r
    const { path, url: treeUrl, type, sha } = tree;
    if (type === "blob") {
      blobs.push({ sha, url: treeUrl });
      rootNode.push({
        type: "FILE",
        path,
        sha,
        subTrees: []
      });
    } else if (type === "tree") {
      const [subTrees, subBlobs] = await cloneManyTree(treeUrl, headers);

      const folderTreeNode: IFileTreeNode = {
        subTrees,
        type: "FOLDER",
        path,
        sha
      };
      rootNode = [folderTreeNode, ...rootNode];
      blobs = [...subBlobs, ...blobs];
      // if (update) {
      //    update(rootNode, blobs)
      // }
    }
  }
  return [rootNode, blobs];
};
