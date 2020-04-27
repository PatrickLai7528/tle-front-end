import React, {
  FunctionComponent,
  isValidElement,
  ReactChild,
  useEffect,
  Component
} from "react";
import {
  useTranslation,
  Translation,
  TranslationProps,
  withTranslation,
  WithTranslation
} from "react-i18next";
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

class RequireAuth extends Component<IRequireAuthProps & WithTranslation, any> {
  public constructor(props: IRequireAuthProps & WithTranslation) {
    super(props);
  }

  public componentWillMount() {
    const { pushNotification, logInFromLocalStorage, loggedIn, t } = this.props;
    const tokenFromLocalStorage = localStorage.getItem("tle_app_token");
    const ghTokenFromLocalStorage = localStorage.getItem("tle_app_gh_token");

    if (tokenFromLocalStorage && ghTokenFromLocalStorage) {
      logInFromLocalStorage(tokenFromLocalStorage, ghTokenFromLocalStorage);
    } else if (
      !tokenFromLocalStorage ||
      !ghTokenFromLocalStorage ||
      !loggedIn
    ) {
      pushNotification({
        title: t("require log in"),
        messageOrNotification: "message",
        type: "warning",
        duration: 4.5
      });
    }
  }

  public render() {
    const { children, loggedIn, redirectUrl } = this.props;
    const tokenFromLocalStorage = localStorage.getItem("tle_app_token");
    const ghTokenFromLocalStorage = localStorage.getItem("tle_app_gh_token");
    if (loggedIn) {
      return <>{isValidElement(children) ? children : null}</>;
    } else if (tokenFromLocalStorage && ghTokenFromLocalStorage) {
      return <>{isValidElement(children) ? children : null}</>;
    } else {
      return <Redirect to={redirectUrl} />;
    }
  }
}

export default withTranslation()(RequireAuth);
