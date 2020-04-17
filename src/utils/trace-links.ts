import { ITraceLink } from "./../types/index";

export type TraceLinkClassifiedByRequirement = {
  [key: string]: ITraceLink[];
};

export const classifyTraceLinksByRequirement = (
  traceLinks: ITraceLink[]
): TraceLinkClassifiedByRequirement | null => {
  let res: Partial<TraceLinkClassifiedByRequirement> = {};
  for (const link of traceLinks) {
    const { requirementDescription } = link;
    if (!res[requirementDescription.id]) {
      res[requirementDescription.id] = [{ ...link }];
    } else {
      res[requirementDescription.id]?.push({
        ...link
      });
    }
  }
  return !!Object.keys(res).length
    ? (res as TraceLinkClassifiedByRequirement)
    : null;
};
