export const getServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080";
  }
};
