import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImplNames } from "../../store/implementation/actions";
import { ImplementationActions } from "../../store/implementation/types";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { BaseSelect, IBaseSelectProps } from "./base";

export interface IImplementationSelectProps extends IBaseSelectProps {
  repoId: string;
}

export const ImplementationSelect: React.FunctionComponent<IImplementationSelectProps> = React.memo(
  (props: IImplementationSelectProps) => {
    const { repoId, ...baseProps } = props;

    const filenames: string[] = useSelector<RootState, string[]>(
      state => state.implementationReducer.names
    );

    const dispatch = useDispatch<AppDispatch<ImplementationActions>>();

    React.useEffect(() => {
      dispatch(fetchAllImplNames(repoId));
    }, [repoId]);

    return <BaseSelect {...baseProps} options={filenames} />;
  }
);
