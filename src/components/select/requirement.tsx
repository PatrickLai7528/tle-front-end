import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImplementationActions } from "../../store/implementation/types";
import { RootState } from "../../store/reducers";
import { fetchRepoRequirement } from "../../store/requirement/actions";
import { AppDispatch } from "../../store/store";
import { BaseSelect, IBaseSelectProps } from "./base";
import { IRequirement, IRequirementDescription } from "../../types";

export interface IRequirementSelectProps extends IBaseSelectProps {
  repoName: string;
}

export const RequirementAutoComplete: React.FunctionComponent<IRequirementSelectProps> = React.memo(
  (props: IRequirementSelectProps) => {
    const { repoName, ...baseProps } = props;

    const descriptions: IRequirementDescription[] | null = useSelector<
      RootState,
      IRequirementDescription[] | null
    >(state => {
      const {
        requirementReducer: { requirement }
      } = state;
      if (!requirement) return null;
      else {
        return requirement.descriptions;
      }
    });

    const dispatch = useDispatch<AppDispatch<ImplementationActions>>();

    React.useEffect(() => {
      if (!descriptions) dispatch(fetchRepoRequirement(repoName));
    }, [repoName, descriptions]);

    const descriptionNames: string[] = React.useMemo(
      () => (descriptions || []).map(description => description.name),
      [descriptions]
    );

    return (
      <>
        {descriptions && (
          <BaseSelect {...baseProps} options={descriptionNames} />
        )}
      </>
    );
  }
);
