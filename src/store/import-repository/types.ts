import {
  IBranch,
  ICommit,
  IFileTreeNode,
  GitHubAPIRepositoryResponse
} from "./../../types/index";
import { IImportedRepository } from "../../types";

export const START_IMPORT_REPOSITORY = "START_IMPORT_REPOSITORY";
export const IMPORT_REPOSITORY_SUCCESS = "IMPORT_REPOSITORY_SUCCESS";
export const IMPORT_REPOSITORY_FAILURE = "IMPORT_REPOSITORY_FAILURE";

export const UPDATE_IMPORTING_REPOSITORY = "UPDATE_IMPORTING_REPOSITORY";

export const START_CLONE_BRANCHES = "START_CLONE_BRANCHES";
export const FINISH_CLONE_BRANCES = "FINISH_CLONE_BRANCHES";

export const START_CLONE_COMMITS = "START_CLONE_COMMITS";
export const FINISH_CLONE_COMMITS = "FINISH_CLONE_COMMITS";

export const START_CLONE_FILE_STRUCTURE = "START_CLONE_FILE_STRUCTURE";
export const FINISH_CLONE_FILE_STRUCTURE = "FINISH_CLONE_FILE_STRUCTURE";

export const START_CLONE_FILE_CONTENT = "START_CLONE_FILE_CONTENT";
export const FINISH_CLONE_FILE_CONTENT = "FINISH_CLONE_FILE_CONTENT";

export const TOGGLE_IMPORT_PROCESS_MODAL = "TOGGLE_IMPORT_PROCESS_MODAL";

export type ImportProccess =
  | "BRANCHES"
  | "COMMITS"
  | "FILE_STUCTURE"
  | "FILE_CONTENT";

export interface IImportRepositoryState {
  importProccess?: ImportProccess;

  importedRepository?: IImportedRepository;
  repositoryResponse?: GitHubAPIRepositoryResponse;

  importProcessModalVisible?: boolean;

  importDone?: boolean;

  error?: boolean | string;
  branches?: IBranch[];
  commits?: ICommit[];
  files?: IFileTreeNode[];
  shaContentMap?: { [key: string]: string };
  otherCommitUrls?: string[];
  blobs?: { sha: string; url: string }[];
}

export interface IStartImportRepositoryAction {
  type: typeof START_IMPORT_REPOSITORY;
  payload: GitHubAPIRepositoryResponse;
}

export interface IImportRepositorySuccessAction {
  type: typeof IMPORT_REPOSITORY_SUCCESS;
}

export interface IImportRepositoryFailureAction {
  type: typeof IMPORT_REPOSITORY_FAILURE;
}

export interface IUpdateImportingRepositoryAction {
  type: typeof UPDATE_IMPORTING_REPOSITORY;
  payload: { files: IFileTreeNode[] };
}

export interface IToggleImportProccessModalAction {
  type: typeof TOGGLE_IMPORT_PROCESS_MODAL;
}

export interface IStartCloneBranchesAction {
  type: typeof START_CLONE_BRANCHES;
}

export interface IFinishCloneBranchesAction {
  type: typeof FINISH_CLONE_BRANCES;
  payload: { branches: IBranch[]; otherCommitUrls: string[] };
}

export interface IStartCloneCommitsAction {
  type: typeof START_CLONE_COMMITS;
}

export interface IFinishCloneCommitsAction {
  type: typeof FINISH_CLONE_COMMITS;
  payload: { commits: ICommit[] };
}

export interface IStartCloneFileStructureAction {
  type: typeof START_CLONE_FILE_STRUCTURE;
}

export interface IFinishCloneFileStructureAction {
  type: typeof FINISH_CLONE_FILE_STRUCTURE;
  payload: { files: IFileTreeNode[]; shaNodes: { sha: string; url: string }[] };
}

export interface IStartCloneFileContentAction {
  type: typeof START_CLONE_FILE_CONTENT;
}

export interface IFinishCloneFileContentAction {
  type: typeof FINISH_CLONE_FILE_CONTENT;
  payload: { shaContentMap: { [key: string]: string } };
}

export type ImportRepositoryAcitons =
  | IStartImportRepositoryAction
  | IImportRepositorySuccessAction
  | IImportRepositoryFailureAction
  | IUpdateImportingRepositoryAction
  | IToggleImportProccessModalAction
  | IStartCloneBranchesAction
  | IFinishCloneBranchesAction
  | IStartCloneCommitsAction
  | IFinishCloneCommitsAction
  | IStartCloneFileContentAction
  | IFinishCloneFileContentAction
  | IStartCloneFileStructureAction
  | IFinishCloneFileStructureAction;

export type ImportRepositoryActionTypes =
  | typeof START_IMPORT_REPOSITORY
  | typeof IMPORT_REPOSITORY_SUCCESS
  | typeof IMPORT_REPOSITORY_FAILURE
  | typeof UPDATE_IMPORTING_REPOSITORY
  | typeof TOGGLE_IMPORT_PROCESS_MODAL
  | typeof START_CLONE_BRANCHES
  | typeof FINISH_CLONE_BRANCES
  | typeof START_CLONE_COMMITS
  | typeof FINISH_CLONE_COMMITS
  | typeof START_CLONE_FILE_CONTENT
  | typeof FINISH_CLONE_FILE_CONTENT
  | typeof START_CLONE_FILE_STRUCTURE
  | typeof FINISH_CLONE_FILE_STRUCTURE;
