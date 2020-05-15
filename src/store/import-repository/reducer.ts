import { IImportedRepository } from "./../../types/index";
import {
  IImportRepositoryState,
  ImportRepositoryAcitons,
  IUpdateImportingRepositoryAction,
  ISendImportedRepositoryFailureAction,
  IIsRepoImprtedSuccessAction,
  IIsRepoImprtedFailureAction,
  IFinishCloneBranchesAction,
  IFinishCloneCommitsAction,
  IFinishCloneFileStructureAction,
  IFinishCloneFileContentAction
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
        importDone: false,
        importedRepository: undefined
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
    case "FINISH_CLONE_BRANCHES": {
      const {
        payload: { branches }
      } = action as IFinishCloneBranchesAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "BRANCHES",
        importedRepository: { ...repo, branches }
      };
    }
    case "FINISH_CLONE_COMMITS": {
      const {
        payload: { commits }
      } = action as IFinishCloneCommitsAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "COMMITS",
        importedRepository: { ...repo, commits }
      };
    }
    case "FINISH_CLONE_FILE_STRUCTURE": {
      const {
        payload: { files }
      } = action as IFinishCloneFileStructureAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "FILE_STUCTURE",
        importedRepository: { ...repo, trees: files }
      };
    }
    case "FINISH_CLONE_FILE_CONTENT": {
      const {
        payload: { map }
      } = action as IFinishCloneFileContentAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "FILE_CONTENT",
        importedRepository: { ...repo, shaFileContentMap: map }
      };
    }
    default:
      return { ...state };
  }
};
