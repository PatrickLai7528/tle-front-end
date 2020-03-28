import { IGHBlobRes } from "./../../types/github-api/blob";
import { IGHRepositoryRes } from "./../../types/github-api/repository";
import { IBranch, ICommit, IFileTreeNode } from "../../types";
import {
  cloneManyBranch,
  cloneManyCommit,
  cloneManyTree
} from "../../utils/import-github";
import { AppThunk } from "../store";
import {
  IFinishCloneBranchesAction,
  IFinishCloneFileContentAction,
  ImportRepositoryActionTypes,
  IToggleImportProccessModalAction,
  IStartImportRepositoryAction
} from "./types";

export const toggleImportProccessModal = (): IToggleImportProccessModalAction => {
  return {
    type: "TOGGLE_IMPORT_PROCESS_MODAL"
  };
};

export const startImportRepository = (
  importThis: IGHRepositoryRes
): IStartImportRepositoryAction => {
  return {
    type: "START_IMPORT_REPOSITORY",
    payload: importThis
  };
};

export const cloneBranches = (): AppThunk<
  void,
  ImportRepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "START_CLONE_BRANCHES" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken },
      importRepositoryReducer: { repositoryResponse: repository }
    } = getState();
    if (repository) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let branches: IBranch[] = [];
      /* clone branches start */
      const commitUrlsFromOtherBranchs: string[] = [];
      if (!!repository.branches_url) {
        let {
          branches_url: branchesUrl,
          default_branch: defaultBranch
        } = repository;
        // fetch all branch
        branchesUrl = branchesUrl.replace("{/branch}", "");
        const [clonedBranches, otherCommitUrls] = await cloneManyBranch(
          branchesUrl,
          headers,
          defaultBranch
        );
        branches = [...clonedBranches];
        commitUrlsFromOtherBranchs.push(...otherCommitUrls);

        dispatch({
          type: "FINISH_CLONE_BRANCHES",
          payload: { branches: branches, otherCommitUrls: otherCommitUrls }
        } as IFinishCloneBranchesAction);
      } else {
        /* clone branches end */
        dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
      }
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
  }
};

export const cloneCommits = (): AppThunk<
  void,
  ImportRepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "START_CLONE_COMMITS" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken },
      importRepositoryReducer: { repositoryResponse: repository }
    } = getState();
    if (repository) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let commits: ICommit[] = [];
      /* clone commits */
      if (!!repository.commits_url) {
        let { commits_url: commitsUrl } = repository;
        // fetch all commits from default branch
        commitsUrl = commitsUrl.replace("{/sha}", "");
        const manyClonedCommits = await cloneManyCommit(commitsUrl, headers);
        commits = manyClonedCommits;
      }
      dispatch({ type: "FINISH_CLONE_COMMITS", payload: { commits } });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
  }
};

export const cloneFileStructure = (): AppThunk<
  void,
  ImportRepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "START_CLONE_FILE_STRUCTURE" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken },
      importRepositoryReducer: { repositoryResponse: repository, branches }
    } = getState();
    if (repository) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let masterHeadSha = "";
      for (const branch of branches || []) {
        if (branch.name === repository.default_branch) {
          masterHeadSha = branch.commitHeadSha;
          break;
        }
      }
      const updater = (
        nodes: IFileTreeNode[],
        blobs: { sha: string; url: string }[]
      ) => {
        dispatch({
          type: "UPDATE_IMPORTING_REPOSITORY",
          payload: { files: nodes }
        });
      };
      // const { importRepositoryReducer: { commits } } = getState();
      // for (const commit of (commits || [])) {
      let { trees_url: treesUrl } = repository;
      treesUrl = treesUrl.replace("{/sha}", "");
      const [trees, blobs] = await cloneManyTree(
        `${treesUrl}/${masterHeadSha}`,
        headers,
        updater
      );
      dispatch({
        type: "FINISH_CLONE_FILE_STRUCTURE",
        payload: { files: trees, shaNodes: blobs }
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
  }
};

export const cloneFileContent = (): AppThunk<
  void,
  ImportRepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "START_CLONE_FILE_CONTENT" });
  console.log("here");
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken },
      importRepositoryReducer: { repositoryResponse: repository, blobs }
    } = getState();
    if (repository) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let shaFileContentMap: any = {};
      for (const blob of blobs || []) {
        const res: IGHBlobRes = await fetch(blob.url, {
          headers
        }).then(res => res.json());
        const { sha, content, encoding } = res;
        shaFileContentMap[sha] =
          encoding === "base64" ? atob(content) : content;
        console.log(shaFileContentMap);
      }
      dispatch({
        type: "FINISH_CLONE_FILE_CONTENT",
        payload: { shaContentMap: shaFileContentMap }
      } as IFinishCloneFileContentAction);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
  }
};

// export const importRepository = (accessToken: string, repository: GitHubAPIRepositoryResponse): AppThunk<void, ImportRepositoryActionTypes> => async dispatch => {
// dispatch({ type: IMPORT_REPOSITORY });
// try {
// const headers = {
//    accept: "application/json",
//    Authorization: `token ${accessToken}`
// }
// let clonedRepository: Partial<IClonedRepository> = {
//    name: repository.name,
//    currentBranch: repository.default_branch,
//    ownerId: repository.owner.login
// }

// /* clone branches start */
// const commitUrlsFromOtherBranchs: string[] = [];
// if (!!repository.branches_url) {
//    let { branches_url: branchesUrl, default_branch: defaultBranch } = repository;
//    // fetch all branch
//    branchesUrl = branchesUrl.replace("{/branch}", "");
//    const [clonedBranches, otherCommitUrls] = await cloneManyBranch(branchesUrl, headers, defaultBranch)
//    clonedRepository.branches = [...clonedBranches]
//    commitUrlsFromOtherBranchs.push(...otherCommitUrls)
// }
// /* clone branches end */

// /* clone commits */
// if (!!repository.commits_url) {
//    let { commits_url: commitsUrl } = repository;
//    // fetch all commits from default branch
//    commitsUrl = commitsUrl.replace("{/sha}", "");
//    const manyClonedCommits = await cloneManyCommit(commitsUrl, headers)
//    clonedRepository.commits = manyClonedCommits;
// }
// /* commits from non-default branch */
// if (commitUrlsFromOtherBranchs) {
//    for (const otherCommitUrl of commitUrlsFromOtherBranchs) {
//       if (clonedRepository.commits) {
//          clonedRepository.commits.push(await cloneOneCommit(otherCommitUrl, headers))
//       } else {
//          clonedRepository.commits = [await cloneOneCommit(otherCommitUrl, headers)]
//       }
//    }
// }
// // dispatch({ type: "UPDATE_IMPORTING_REPOSITORY", payload: clonedRepository })

// // const updater = (nodes: IFileTreeNode[], blobs: { sha: string, url: string }[]) => {
// //    dispatch({
// //       type: "UPDATE_IMPORTING_REPOSITORY",
// //       payload: { ...clonedRepository, trees: nodes, } as IClonedRepository
// //    })
// // }

// for (const commit of (clonedRepository.commits || [])) {
//    console.log("here");
//    let { trees_url: treesUrl } = repository;
//    treesUrl = treesUrl.replace("{/sha}", "");
//    const [trees, blobs] = await cloneManyTree(`${treesUrl}/${commit.sha}`, headers);

//    const shaFileContentMap = new Map<string, string>();
//    const promises: Promise<void>[] = [];
//    for (const blob of blobs) {
//       promises.push(fetch(blob.url, { headers }).then(res => res.json()).then((res: GitHubAPIBlobResponse) => {
//          const { sha, content, encoding } = res;
//          shaFileContentMap.set(sha, encoding === "base64" ? atob(content) : content);
//       }))
//    }
//    await Promise.all(promises);
//    clonedRepository.trees = trees;
//    clonedRepository.shaFileContentMap = shaFileContentMap;
// }

// console.log(clonedRepository)
// dispatch({ type: IMPORT_REPOSITORY_SUCCESS, payload: clonedRepository })
//    } catch (e) {
//       if (process.env.NODE_ENV === "development") {
//          console.log(e);
//       }
//       dispatch({ type: "IMPORT_REPOSITORY_FAILURE" })
//    }
// }
