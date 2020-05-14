export const RouteConstants = {
  HOME: "/home",
  WORKPLACE: "/authed/workplace",
  ERROR: (title?: string, subTitle?: string) =>
    `/authed/error/${title ? title : ":title"}/${
      subTitle ? subTitle : ":subTitle"
    }`,
  REPOSITORY: "/authed/repository",
  REPOSITORY_DETAIL: (id?: string) => `/authed/repository/${id ? id : ":id"}`,
  IMPORT_PROCESS: (id?: string) => `/authed/import_process/${id ? id : ":id"}`
};
