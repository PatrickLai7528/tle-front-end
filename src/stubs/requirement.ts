import { requirementDescription } from "./requirement-description";
import { IRequirement } from "./../types/index";

const fromIndex = Math.round(Math.random() * requirementDescription.length);

export const requirement: IRequirement = {
  _id: "jkladjf",
  relatedRepoName: "RELATED REPO NAME",
  descriptions: requirementDescription.slice(fromIndex, fromIndex + 10)
};
