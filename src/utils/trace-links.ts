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
    if (requirementDescription) {
      const { id } = requirementDescription;
      if (!res[id]) {
        res[id] = [{ ...link }];
      } else {
        res[id]?.push({
          ...link
        });
      }
    }
  }
  return !!Object.keys(res).length
    ? (res as TraceLinkClassifiedByRequirement)
    : null;
};

export type TraceLinkClassifiedByFile = {
  [key: string]: ITraceLink[];
};

export const classifyTraceLinkByFile = (
  traceLinks: ITraceLink[]
): TraceLinkClassifiedByFile | null => {
  let res: Partial<TraceLinkClassifiedByFile> = {};
  for (const link of traceLinks) {
    const { implement } = link;
    if (implement) {
      const { fullyQualifiedName } = implement;
      if (!res[fullyQualifiedName]) {
        res[fullyQualifiedName] = [{ ...link }];
      } else {
        res[fullyQualifiedName]?.push({
          ...link
        });
      }
    } else {
      console.log(implement);
    }
  }
  return !!Object.keys(res).length
    ? (res as TraceLinkClassifiedByRequirement)
    : null;
};
