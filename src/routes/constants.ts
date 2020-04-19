export const RouteConstants = {
  HOME: "/home",
  WORKPLACE: "/authed/workplace",
  REPOSITORY: "/authed/repository",
  REPOSITORY_DETAIL: (id?: string) => `/authed/repository/${id ? id : ":id"}`,
  IMPORT_PROCESS: (id?: string) => `/authed/import_process/${id ? id : ":id"}`
};
