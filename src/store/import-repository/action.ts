import io from "socket.io-client";
import { IBranch, ICommit, IFileTreeNode } from "../../types";
import { ProgramLanguage } from "../../utils/language-color";
import { AppThunk } from "../store";
import { getServerUrl } from "./../../configs/get-url";
import { IGHRepositoryRes } from "./../../types/github-api/repository";
import { IImportedRepository, ShaFileContentMap } from "./../../types/index";
import {
  ImportRepositoryActionTypes,
  IStopImportAction,
  IUpdateImportingRepositoryAction,
  SEND_IMPORTED_REPOSITORY,
  SEND_IMPORTED_REPOSITORY_FAILURE,
  SEND_IMPORTED_REPOSITORY_SUCCESS,
  UPDATE_IMPORTING_REPOSITORY
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
  importedRepo: Omit<IImportedRepository, "_id">
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
  const {
    authReducer: { gitHubAccessToken }
  } = getState();

  if (!gitHubAccessToken) throw new Error("no token");

  dispatch({ type: "START_IMPORT_REPOSITORY" });

  let importedRepo: Partial<IImportedRepository> = {
    name: importThis.name,
    currentBranch: importThis.default_branch,
    ownerId: importThis.owner.login,
    language: importThis.language as ProgramLanguage,
    description: importThis.description
  };

  dispatch(updateImportingRepository(importedRepo));
  const socket = io.connect("http://localhost:3002");
  socket.emit("startImport", importThis, gitHubAccessToken);

  socket.on("importBranchDone", (branches: IBranch[]) => {
    dispatch({
      type: "FINISH_CLONE_BRANCHES",
      payload: { branches }
    });
  });

  socket.on("importCommitDone", (commits: ICommit[]) => {
    dispatch({
      type: "FINISH_CLONE_COMMITS",
      payload: { commits }
    });
  });

  socket.on("importFileStructureDone", (trees: IFileTreeNode[]) => {
    dispatch({
      type: "FINISH_CLONE_FILE_STRUCTURE",
      payload: { files: trees }
    });
  });

  socket.on("importFileContentDone", (shaFileContentMap: ShaFileContentMap) => {
    dispatch({
      type: "FINISH_CLONE_FILE_CONTENT",
      payload: { map: shaFileContentMap }
    });
  });

  socket.on("allDone", () => dispatch({ type: "IMPORT_REPOSITORY_SUCCESS" }));
};
