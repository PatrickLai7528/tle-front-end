import { IImportedRepository } from "./../../types/index";
import {
  IImportRepositoryState,
  ImportRepositoryAcitons,
  IUpdateImportingRepositoryAction,
  ISendImportedRepositoryFailureAction,
  IIsRepoImprtedSuccessAction,
  IIsRepoImprtedFailureAction
} from "./types";

const initialState: IImportRepositoryState = {
  importDone: false,
  importStarted: false,
  loading: false,
  stop: false,
  isRepoImported: false,
  checkedRepoImport: false
};

export const importRepositoryReducer = (
  state = initialState,
  action: ImportRepositoryAcitons
): IImportRepositoryState => {
  switch (action.type) {
    case "IS_REPOSITORY_IMPORTED":
      return {
        ...state,
        loading: true,
        error: false,
        checkedRepoImport: false
      };
    case "IS_REPOSITORY_IMPORTED_SUCCESS":
      return {
        ...state,
        loading: false,
        checkedRepoImport: true,
        isRepoImported: (action as IIsRepoImprtedSuccessAction).payload
      };
    case "IS_REPOSITORY_IMPORTED_FAILURE":
      return {
        ...state,
        loading: false,
        checkedRepoImport: true,
        error: (action as IIsRepoImprtedFailureAction).meta
      };
    case "STOP_IMPORT":
      return {
        ...state,
        stop: true
      };
    case "SEND_IMPORTED_REPOSITORY":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "SEND_IMPORTED_REPOSITORY_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false
      };
    case "SEND_IMPORTED_REPOSITORY_FAILURE":
      return {
        ...state,
        loading: false,
        error: (action as ISendImportedRepositoryFailureAction).meta
      };
    case "START_IMPORT_REPOSITORY":
      return {
        ...state,
        stop: false,
        importProccess: undefined,
        importStarted: true,
        importDone: false
      };
    case "IMPORT_REPOSITORY_SUCCESS":
      let newState = {
        ...state,
        importDone: true,
        importStarted: false
      };
      return newState;
    case "IMPORT_REPOSITORY_FAILURE":
      return {
        ...state,
        importProccess: undefined,
        error: true
      };
    case "UPDATE_IMPORTING_REPOSITORY":
      const newRepo = (action as IUpdateImportingRepositoryAction)
        .payload as IImportedRepository;
      return {
        ...state,
        importedRepository: {
          ...newRepo
        }
      };
    case "FINISH_CLONE_BRANCHES":
      return {
        ...state,
        importProccess: "BRANCHES"
      };
    case "FINISH_CLONE_COMMITS":
      return {
        ...state,
        importProccess: "COMMITS"
      };
    case "FINISH_CLONE_FILE_STRUCTURE":
      return {
        ...state,
        importProccess: "FILE_STUCTURE"
      };
    case "FINISH_CLONE_FILE_CONTENT":
      return {
        ...state,
        importProccess: "FILE_CONTENT"
      };
    default:
      return { ...state };
  }
};
