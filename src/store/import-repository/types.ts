import {
  IBranch,
  ICommit,
  IFileTreeNode,
  ShaFileContentMap
} from "./../../types/index";
import { IImportedRepository } from "../../types";

export const START_IMPORT_REPOSITORY = "START_IMPORT_REPOSITORY";
export const IMPORT_REPOSITORY_SUCCESS = "IMPORT_REPOSITORY_SUCCESS";
export const IMPORT_REPOSITORY_FAILURE = "IMPORT_REPOSITORY_FAILURE";

export const UPDATE_IMPORTING_REPOSITORY = "UPDATE_IMPORTING_REPOSITORY";

export const FINISH_CLONE_BRANCES = "FINISH_CLONE_BRANCHES";

export const FINISH_CLONE_COMMITS = "FINISH_CLONE_COMMITS";

export const FINISH_CLONE_FILE_STRUCTURE = "FINISH_CLONE_FILE_STRUCTURE";

export const FINISH_CLONE_FILE_CONTENT = "FINISH_CLONE_FILE_CONTENT";

export const SEND_IMPORTED_REPOSITORY = "SEND_IMPORTED_REPOSITORY";
export const SEND_IMPORTED_REPOSITORY_SUCCESS =
  "SEND_IMPORTED_REPOSITORY_SUCCESS";
export const SEND_IMPORTED_REPOSITORY_FAILURE =
  "SEND_IMPORTED_REPOSITORY_FAILURE";

export const STOP_IMPORT = "STOP_IMPORT";

export const IS_REPO_IMPORTED = "IS_REPOSITORY_IMPORTED";
export const IS_REPO_IMPORTED_SUCCESS = "IS_REPOSITORY_IMPORTED_SUCCESS";
export const IS_REPO_IMPORTED_FAILURE = "IS_REPOSITORY_IMPORTED_FAILURE";

export interface IIsRepoImportedAction {
  type: typeof IS_REPO_IMPORTED;
}
export interface IIsRepoImprtedSuccessAction {
  type: typeof IS_REPO_IMPORTED_SUCCESS;
  payload: boolean;
}
export interface IIsRepoImprtedFailureAction {
  type: typeof IS_REPO_IMPORTED_FAILURE;
  meta?: string;
}

export interface IStopImportAction {
  type: typeof STOP_IMPORT;
}

export interface ISendImportedRepositoryAction {
  type: typeof SEND_IMPORTED_REPOSITORY;
}

export interface ISendImportedRepositorSuccessAction {
  type: typeof SEND_IMPORTED_REPOSITORY_SUCCESS;
}

export interface ISendImportedRepositoryFailureAction {
  type: typeof SEND_IMPORTED_REPOSITORY_FAILURE;
  meta?: string;
}

export type ImportProccess =
  | "BRANCHES"
  | "COMMITS"
  | "FILE_STUCTURE"
  | "FILE_CONTENT";

export interface IImportRepositoryState {
  importProccess?: ImportProccess;
  importedRepository?: IImportedRepository;
  importStarted: boolean;
  importDone: boolean;

  isRepoImported: boolean;
  checkedRepoImport: boolean;

  error?: boolean | string;
  loading: boolean;
  stop: boolean;
}

export interface IStartImportRepositoryAction {
  type: typeof START_IMPORT_REPOSITORY;
}

export interface IImportRepositorySuccessAction {
  type: typeof IMPORT_REPOSITORY_SUCCESS;
  payload: IImportedRepository;
}

export interface IImportRepositoryFailureAction {
  type: typeof IMPORT_REPOSITORY_FAILURE;
}

export interface IUpdateImportingRepositoryAction {
  type: typeof UPDATE_IMPORTING_REPOSITORY;
  payload: Partial<IImportedRepository>;
}

export interface IFinishCloneBranchesAction {
  type: typeof FINISH_CLONE_BRANCES;
  payload: { branches: IBranch[]; otherCommitUrls: string[] };
}

export interface IFinishCloneCommitsAction {
  type: typeof FINISH_CLONE_COMMITS;
  payload: { commits: ICommit[] };
}

export interface IFinishCloneFileStructureAction {
  type: typeof FINISH_CLONE_FILE_STRUCTURE;
  payload: { files: IFileTreeNode[]; shaNodes: { sha: string; url: string }[] };
}

export interface IFinishCloneFileContentAction {
  type: typeof FINISH_CLONE_FILE_CONTENT;
  payload: ShaFileContentMap;
}

export type ImportRepositoryAcitons =
  | IStartImportRepositoryAction
  | IImportRepositorySuccessAction
  | IImportRepositoryFailureAction
  | IUpdateImportingRepositoryAction
  | IFinishCloneBranchesAction
  | IFinishCloneCommitsAction
  | IFinishCloneFileContentAction
  | IFinishCloneFileStructureAction
  | ISendImportedRepositoryAction
  | ISendImportedRepositorSuccessAction
  | ISendImportedRepositoryFailureAction
  | IStopImportAction
  | IIsRepoImportedAction
  | IIsRepoImprtedSuccessAction
  | IIsRepoImprtedFailureAction;

export type ImportRepositoryActionTypes =
  | typeof START_IMPORT_REPOSITORY
  | typeof IMPORT_REPOSITORY_SUCCESS
  | typeof IMPORT_REPOSITORY_FAILURE
  | typeof UPDATE_IMPORTING_REPOSITORY
  | typeof FINISH_CLONE_BRANCES
  | typeof FINISH_CLONE_COMMITS
  | typeof FINISH_CLONE_FILE_CONTENT
  | typeof FINISH_CLONE_FILE_STRUCTURE
  | typeof SEND_IMPORTED_REPOSITORY
  | typeof SEND_IMPORTED_REPOSITORY_SUCCESS
  | typeof SEND_IMPORTED_REPOSITORY_FAILURE
  | typeof STOP_IMPORT
  | typeof IS_REPO_IMPORTED
  | typeof IS_REPO_IMPORTED_SUCCESS
  | typeof IS_REPO_IMPORTED_FAILURE;
