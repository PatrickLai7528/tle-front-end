import { IRegistryData, ILogInData } from "./../store/auth/types";
export const fakeLogIn = (logInData: ILogInData): Promise<string> => {
  const { email, password } = logInData;
  return Promise.resolve(`${email} ${password} fake token`);
};

export const fakeRegistry = (registrData: IRegistryData): Promise<string> => {
  return Promise.resolve("fake registry");
};
