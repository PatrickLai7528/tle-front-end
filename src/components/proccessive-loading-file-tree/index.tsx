import ProccessiveLoadingFileTree, {
  IStateProps,
  IOwnProps
} from "./proccessive-loading-file-tree";
import { MapStateToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  const {
    importRepositoryReducer: { files }
  } = state;
  return {
    treeData: files ? files || [] : []
  };
};

export const ConnectedProccessiveLoadingFileTree = connect(mapStateToProps)(
  ProccessiveLoadingFileTree
);
