export const RouteConstants = {
  HOME: "/home",
  WORKPLACE: "/authed/workplace",
  REPOSITORY: "/authed/repository",
  REPOSITORY_DETAIL: (name?: string) =>
    `/authed/repository/${name ? name : ":name"}`,
  IMPORT_PROCESS: (id?: string) => `/authed/import_process/${id ? id : ":id"}`
};
