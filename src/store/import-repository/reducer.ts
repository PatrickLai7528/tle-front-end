import { IImportedRepository } from "./../../types/index";
import {
  IFinishCloneBranchesAction,
  IFinishCloneCommitsAction,
  IFinishCloneFileContentAction,
  IFinishCloneFileStructureAction,
  IImportRepositoryState,
  ImportRepositoryAcitons,
  IToggleImportProccessModalAction,
  IUpdateImportingRepositoryAction,
  IStartImportRepositoryAction
} from "./types";

const initialState: IImportRepositoryState = {};

export const importRepositoryReducer = (
  state = initialState,
  action: ImportRepositoryAcitons
): IImportRepositoryState => {
  switch (action.type) {
    case "TOGGLE_IMPORT_PROCESS_MODAL":
      // const { payload: { repository } } = action as IToggleImportProccessModalAction;
      return {
        ...state,
        importProcessModalVisible: !state.importProcessModalVisible,
        importDone: false
        // repositoryResponse: repository ? { ...repository } : undefined,
        // importedRepository: repository ? {
        //    name: repository.name,
        //    currentBranch: repository.default_branch,
        //    ownerId: repository.owner.login,
        //    commits: [],
        //    trees: [],
        //    branches: [],
        //    shaFileContentMap: {}
        // } : undefined
      };
    case "START_IMPORT_REPOSITORY":
      const { payload: repository } = action as IStartImportRepositoryAction;
      return {
        ...state,
        importProcessModalVisible: true,
        repositoryResponse: repository,
        importedRepository: repository
          ? {
              name: repository.name,
              currentBranch: repository.default_branch,
              ownerId: repository.owner.login,
              commits: [],
              trees: [],
              branches: [],
              shaFileContentMap: {}
            }
          : undefined
      };
    case "IMPORT_REPOSITORY_SUCCESS":
      const {
        importedRepository,
        branches,
        shaContentMap,
        files,
        commits
      } = state;
      return {
        ...state,
        importedRepository:
          importedRepository && branches && shaContentMap && files && commits
            ? {
                ...importedRepository,
                trees: files,
                commits,
                branches,
                shaFileContentMap: shaContentMap
              }
            : undefined
      };

    case "IMPORT_REPOSITORY_FAILURE":
      return {
        ...state,
        importProccess: undefined,
        error: true
      };
    case "UPDATE_IMPORTING_REPOSITORY":
      return {
        ...state,
        files: [
          ...(state.files || []),
          ...(action as IUpdateImportingRepositoryAction).payload.files
        ]
      };
    case "START_CLONE_BRANCHES":
      return {
        ...state,
        commits: undefined,
        branches: undefined,
        files: undefined,
        shaContentMap: undefined,
        importProccess: undefined,
        blobs: undefined,
        otherCommitUrls: undefined
      };
    case "FINISH_CLONE_BRANCHES":
      return {
        ...state,
        importProccess: "BRANCHES",
        branches: (action as IFinishCloneBranchesAction).payload.branches,
        otherCommitUrls: (action as IFinishCloneBranchesAction).payload
          .otherCommitUrls
      };
    case "START_CLONE_COMMITS":
      return {
        ...state
      };
    case "FINISH_CLONE_COMMITS":
      return {
        ...state,
        importProccess: "COMMITS",
        commits: (action as IFinishCloneCommitsAction).payload.commits
      };
    case "START_CLONE_FILE_STRUCTURE":
      return {
        ...state
      };
    case "FINISH_CLONE_FILE_STRUCTURE":
      return {
        ...state,
        importProccess: "FILE_STUCTURE",
        files: (action as IFinishCloneFileStructureAction).payload.files,
        blobs: (action as IFinishCloneFileStructureAction).payload.shaNodes
      };
    case "START_CLONE_FILE_CONTENT":
      return { ...state };
    case "FINISH_CLONE_FILE_CONTENT":
      return {
        ...state,
        importProccess: "FILE_CONTENT",
        shaContentMap: (action as IFinishCloneFileContentAction).payload
          .shaContentMap
      };
    default:
      return { ...state };
  }
};
