import { getServerUrl } from "./../../configs/get-url";
import { IBranch, ICommit, IFileTreeNode } from "../../types";
import {
  Blobs,
  cloneManyBranch,
  cloneManyCommit,
  cloneManyTree
} from "../../utils/import-github";
import { ProgramLanguage } from "../../utils/language-color";
import { AppThunk } from "../store";
import { IGHBlobRes } from "./../../types/github-api/blob";
import { IGHRepositoryRes } from "./../../types/github-api/repository";
import { IImportedRepository, ShaFileContentMap } from "./../../types/index";
import {
  FINISH_CLONE_BRANCES,
  FINISH_CLONE_COMMITS,
  FINISH_CLONE_FILE_STRUCTURE,
  IImportRepositorySuccessAction,
  ImportRepositoryActionTypes,
  IMPORT_REPOSITORY_FAILURE,
  IUpdateImportingRepositoryAction,
  SEND_IMPORTED_REPOSITORY,
  SEND_IMPORTED_REPOSITORY_FAILURE,
  SEND_IMPORTED_REPOSITORY_SUCCESS,
  START_IMPORT_REPOSITORY,
  UPDATE_IMPORTING_REPOSITORY,
  IStopImportAction
} from "./types";

export const stopImport = (): IStopImportAction => ({ type: "STOP_IMPORT" });

export const isRepoImported = (
  repoName: string
): AppThunk<void, ImportRepositoryActionTypes> => async dispatch => {
  dispatch({ type: "IS_REPOSITORY_IMPORTED" });
  try {
    await new Promise(resolve => setTimeout(resolve, 1300));
    const res = await fetch(
      `${getServerUrl()}/api/repository/if_imported?repoName=${repoName}`
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: "IS_REPOSITORY_IMPORTED_SUCCESS",
        payload: res.payload
      });
    } else {
      dispatch({ type: "IS_REPOSITORY_IMPORTED_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IS_REPOSITORY_IMPORTED_FAILURE" });
  }
};

export const sendImportedRepository = (
  importedRepo: IImportedRepository
): AppThunk<void, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
  dispatch({ type: SEND_IMPORTED_REPOSITORY });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/repository`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(importedRepo)
    }).then(res => res.json());

    if (res && res.success) {
      dispatch({ type: SEND_IMPORTED_REPOSITORY_SUCCESS });
    } else {
      dispatch({ type: "SEND_IMPORTED_REPOSITORY_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: SEND_IMPORTED_REPOSITORY_FAILURE });
  }
};

export const updateImportingRepository = (
  repo: Partial<IImportedRepository>
): IUpdateImportingRepositoryAction => {
  return {
    type: UPDATE_IMPORTING_REPOSITORY,
    payload: repo
  };
};

export const startImportRepository = (
  importThis: IGHRepositoryRes
): AppThunk<void, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
  dispatch({ type: START_IMPORT_REPOSITORY });
  try {
    let importedRepo: Partial<IImportedRepository> = {
      name: importThis.name,
      currentBranch: importThis.default_branch,
      ownerId: importThis.owner.login,
      language: importThis.language as ProgramLanguage,
      description: importThis.description
    };
    dispatch(updateImportingRepository(importedRepo));

    if (getState().importRepositoryReducer.stop) return;

    const branches: IBranch[] = await dispatch(cloneBranches(importThis));
    importedRepo = { ...importedRepo, branches: [...branches] };
    dispatch(updateImportingRepository(importedRepo));

    if (getState().importRepositoryReducer.stop) return;

    const commits: ICommit[] = await dispatch(cloneCommits(importThis));
    importedRepo = { ...importedRepo, commits: [...commits] };
    dispatch(updateImportingRepository(importedRepo));

    if (getState().importRepositoryReducer.stop) return;

    const { trees, blobs } = await dispatch(
      cloneFileStructure(importThis, branches)
    );
    importedRepo = { ...importedRepo, trees: [...trees] };
    dispatch(updateImportingRepository(importedRepo));

    if (getState().importRepositoryReducer.stop) return;

    const shaFileContentMap: ShaFileContentMap = await dispatch(
      cloneFileContent(importThis, blobs)
    );
    importedRepo = {
      ...importedRepo,
      shaFileContentMap: { ...shaFileContentMap }
    };
    dispatch(updateImportingRepository(importedRepo));

    const action: IImportRepositorySuccessAction = {
      type: "IMPORT_REPOSITORY_SUCCESS",
      payload: importedRepo as IImportedRepository
    };

    dispatch(action);
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: IMPORT_REPOSITORY_FAILURE });
  }
};

export const cloneBranches = (
  ghRepoRes: IGHRepositoryRes
): AppThunk<Promise<IBranch[]>, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
  // dispatch({ type: "START_CLONE_BRANCHES" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken }
    } = getState();
    if (ghRepoRes && !!ghRepoRes.branches_url) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let branches: IBranch[] = [];
      /* clone branches start */
      const commitUrlsFromOtherBranchs: string[] = [];
      let {
        branches_url: branchesUrl,
        default_branch: defaultBranch
      } = ghRepoRes;
      // fetch all branch
      branchesUrl = branchesUrl.replace("{/branch}", "");
      const [clonedBranches, otherCommitUrls] = await cloneManyBranch(
        branchesUrl,
        headers,
        defaultBranch
      );
      branches = [...clonedBranches];
      commitUrlsFromOtherBranchs.push(...otherCommitUrls);
      dispatch({ type: FINISH_CLONE_BRANCES });

      return branches;
    } else {
      /* clone branches end */
      dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
      return [];
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
    return [];
  }
};

export const cloneCommits = (
  ghRepoRes: IGHRepositoryRes
): AppThunk<Promise<ICommit[]>, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
  // dispatch({ type: "START_CLONE_COMMITS" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken }
    } = getState();
    if (ghRepoRes && ghRepoRes.commits_url) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let commits: ICommit[] = [];
      /* clone commits */
      let { commits_url: commitsUrl } = ghRepoRes;
      // fetch all commits from default branch
      commitsUrl = commitsUrl.replace("{/sha}", "");
      const manyClonedCommits = await cloneManyCommit(commitsUrl, headers);
      commits = manyClonedCommits;
      dispatch({ type: FINISH_CLONE_COMMITS });

      return commits;
    } else {
      dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
      return [];
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
    return [];
  }
};

export const cloneFileStructure = (
  ghRepoRes: IGHRepositoryRes,
  branches: IBranch[]
): AppThunk<
  Promise<{ trees: IFileTreeNode[]; blobs: Blobs }>,
  ImportRepositoryActionTypes
> => async (dispatch, getState) => {
  // dispatch({ type: "START_CLONE_FILE_STRUCTURE" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken }
    } = getState();
    if (ghRepoRes) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let masterHeadSha = "";
      for (const branch of branches || []) {
        if (branch.name === ghRepoRes.default_branch) {
          masterHeadSha = branch.commitHeadSha;
          break;
        }
      }
      let { trees_url: treesUrl } = ghRepoRes;
      treesUrl = treesUrl.replace("{/sha}", "");
      const [trees, blobs] = await cloneManyTree(
        `${treesUrl}/${masterHeadSha}`,
        headers
      );
      dispatch({ type: FINISH_CLONE_FILE_STRUCTURE });
      return { trees: trees, blobs: blobs };
    } else {
      dispatch({ type: IMPORT_REPOSITORY_FAILURE });
      return { trees: [], blobs: [] };
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
    return { trees: [], blobs: [] };
  }
};

export const cloneFileContent = (
  ghRepoRes: IGHRepositoryRes,
  blobs: Blobs
): AppThunk<Promise<ShaFileContentMap>, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
  // dispatch({ type: "START_CLONE_FILE_CONTENT" });
  try {
    const {
      authReducer: { gitHubAccessToken: accessToken }
    } = getState();
    if (ghRepoRes) {
      const headers = {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      };
      let shaFileContentMap: any = {};
      const fetchPromises: Promise<IGHBlobRes>[] = [];
      for (const blob of blobs || []) {
        const fetchPromise = fetch(blob.url, {
          headers
        }).then(res => res.json());
        fetchPromises.push(fetchPromise);
      }
      const blobsRes: IGHBlobRes[] = await Promise.all(fetchPromises);
      blobsRes.forEach(({ sha, content, encoding }) => {
        shaFileContentMap[sha] =
          encoding === "base64" ? atob(content) : content;
      });
      dispatch({ type: "FINISH_CLONE_FILE_CONTENT" });
      return shaFileContentMap;
    } else {
      dispatch({ type: IMPORT_REPOSITORY_FAILURE });
      return {};
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "IMPORT_REPOSITORY_FAILURE" });
    return {};
  }
};
