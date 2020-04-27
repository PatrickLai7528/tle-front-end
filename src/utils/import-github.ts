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
    author: { id: res.commit?.author?.name || "" },
    committer: { id: res.commit?.committer?.name || "" },
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
  const commitPrs: Promise<ICommit>[] = [];
  for (const res of manyCommitResponse) {
    commitPrs.push(cloneOneCommit(res.url, headers));
  }
  return await Promise.all(commitPrs);
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

export type Blobs = { sha: string; url: string }[];
export const cloneManyTree = async (
  url: string,
  headers: any,
  dir = ""
): Promise<[IFileTreeNode[], Blobs]> => {
  const res: IGHTreeRes = await fetch(url, { headers }).then(res => res.json());
  const { tree: trees } = res;

  const allPromises: Promise<[IFileTreeNode[], Blobs]>[] = [];

  for (const tree of trees) {
    const fetchTreePromise: Promise<[IFileTreeNode[], Blobs]> = new Promise(
      (resolve, reject) => {
        try {
          let rootNode: IFileTreeNode[] = [];
          let blobs: Blobs = [];
          const { path, url: treeUrl, type, sha } = tree;
          const newDir = dir === "" ? path : `${dir}/${path}`;
          if (type === "blob") {
            blobs.push({ sha, url: treeUrl });
            rootNode.push({
              type: "FILE",
              path,
              fullyQualifiedName: newDir,
              sha,
              subTrees: []
            });
            resolve([rootNode, blobs]);
          } else if (type === "tree") {
            cloneManyTree(treeUrl, headers, newDir).then(
              ([subTrees, subBlobs]) => {
                const folderTreeNode: IFileTreeNode = {
                  subTrees,
                  type: "FOLDER",
                  fullyQualifiedName: newDir,
                  path,
                  sha
                };
                rootNode = [folderTreeNode, ...rootNode];
                blobs = [...subBlobs, ...blobs];
                resolve([rootNode, blobs]);
              }
            );
          }
        } catch (e) {
          reject(e);
        }
      }
    ); // end promise

    allPromises.push(fetchTreePromise);
  }

  const finalResult = await Promise.all(allPromises);
  const rootNode: IFileTreeNode[] = [];
  const blobs: Blobs = [];

  for (const result of finalResult) {
    rootNode.push(...result[0]);
    blobs.push(...result[1]);
  }

  return [rootNode, blobs];
};
