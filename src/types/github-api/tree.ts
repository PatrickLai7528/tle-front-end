interface IGHTreeResInnerTree {
  path: string;
  mode: string;
  type: "blob" | "tree";
  size: number;
  url: string;
}

export interface IGHTreeRes {
  sha: string;
  url: string;
  tree: IGHTreeResInnerTree[];
  truncated: boolean;
}
