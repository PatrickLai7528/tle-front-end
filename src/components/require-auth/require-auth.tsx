import React, {
  FunctionComponent,
  isValidElement,
  ReactChild,
  useEffect
} from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { INotificationQueueItem } from "../../store/notification/types";

export interface IStateProps {
  loggedIn: boolean;
}

export interface IDispatchProps {
  logInFromLocalStorage: (token: string, ghToken: string) => void;
  pushNotification: (message: INotificationQueueItem) => void;
}

export interface IOwnProps {
  children: ReactChild;
  redirectUrl: string;
}

export interface IRequireAuthProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const RequireAuth: FunctionComponent<IRequireAuthProps> = (
  props: IRequireAuthProps
) => {
  const { t } = useTranslation();
  const {
    children,
    loggedIn,
    redirectUrl,
    logInFromLocalStorage,
    pushNotification
  } = props;

  const tokenFromLocalStorage = localStorage.getItem("tle_app_token");
  const ghTokenFromLocalStorage = localStorage.getItem("tle_app_gh_token");

  useEffect(() => {
    if (tokenFromLocalStorage && ghTokenFromLocalStorage) {
      logInFromLocalStorage(tokenFromLocalStorage, ghTokenFromLocalStorage);
    }
  }, [tokenFromLocalStorage, ghTokenFromLocalStorage]);

  if (loggedIn) {
    return <>{isValidElement(children) ? children : null}</>;
  } else if (tokenFromLocalStorage && ghTokenFromLocalStorage) {
    return <>{isValidElement(children) ? children : null}</>;
  } else {
    pushNotification({
      title: t("require log in"),
      messageOrNotification: "message",
      type: "warning",
      duration: 4.5
    });
    return <Redirect to={redirectUrl} />;
  }
};

export default RequireAuth;
