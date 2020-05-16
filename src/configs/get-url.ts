import { gitHubAuthConfigs } from "./github-auth.config";

export const getServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:7001";
  }
};

export const getGitHubLogInUrl = () =>
  `${gitHubAuthConfigs.authorize_uri}?client_id=${gitHubAuthConfigs.client_id}&redirect_uri=${gitHubAuthConfigs.redirect_uri}`;

export const getGitHubServiceUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://47.240.63.98";
  }
};
