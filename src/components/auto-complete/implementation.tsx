import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImplNames } from "../../store/implementation/actions";
import { ImplementationActions } from "../../store/implementation/types";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { BaseAutoComplete, IBaseAutoCompleteProps } from "./base";

export interface IImplementationAutoCompleteProps
  extends IBaseAutoCompleteProps {
  repoId: string;
}

export const ImplementationAutoComplete: React.FunctionComponent<IImplementationAutoCompleteProps> = React.memo(
  (props: IImplementationAutoCompleteProps) => {
    const { repoId, ...baseProps } = props;

    const filenames: string[] = useSelector<RootState, string[]>(
      state => state.implementationReducer.names
    );

    const dispatch = useDispatch<AppDispatch<ImplementationActions>>();

    React.useEffect(() => {
      dispatch(fetchAllImplNames(repoId));
    }, [repoId]);

    return <BaseAutoComplete {...baseProps} options={filenames} />;
  }
);
