import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImplNames } from "../../store/implementation/actions";
import { ImplementationActions } from "../../store/implementation/types";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { BaseAutoComplete, IBaseAutoCompleteProps } from "./base";
import { fetchRepoRequirement } from "../../store/requirement/actions";

export interface IRequirementAutoCompleteProps extends IBaseAutoCompleteProps {
  repoName: string;
}

export const RequirementAutoComplete: React.FunctionComponent<IRequirementAutoCompleteProps> = React.memo(
  (props: IRequirementAutoCompleteProps) => {
    const { repoName, ...baseProps } = props;

    const requirementNames: string[] | null = useSelector<
      RootState,
      string[] | null
    >(state => {
      const {
        requirementReducer: { requirement }
      } = state;
      if (!requirement) return null;
      else {
        return (requirement.descriptions || []).map(
          description => description.name
        );
      }
    });

    console.log(requirementNames);

    const dispatch = useDispatch<AppDispatch<ImplementationActions>>();

    React.useEffect(() => {
      if (!requirementNames) dispatch(fetchRepoRequirement(repoName));
    }, [repoName, requirementNames]);

    return (
      <>
        {requirementNames && (
          <BaseAutoComplete {...baseProps} options={requirementNames} />
        )}
      </>
    );
  }
);
