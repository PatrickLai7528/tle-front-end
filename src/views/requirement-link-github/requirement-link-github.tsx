import React, { memo, FunctionComponent } from "react";

export interface IStateProps {}

export interface IDispatchProps {}

export interface IOwnProps {}

export interface IRequirementLinkGitHubProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const RequirementLinkGitHub: FunctionComponent<IRequirementLinkGitHubProps> = memo(
  (props: IRequirementLinkGitHubProps) => {
    return null;
  }
);

export default RequirementLinkGitHub;
