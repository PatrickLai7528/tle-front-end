import React, {
  FunctionComponent,
  isValidElement,
  memo,
  useEffect,
  ReactChild
} from "react";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export interface IStateProps {
  loggedIn: boolean;
}

export interface IDispatchProps {}

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
  const { children, loggedIn, redirectUrl } = props;
  useEffect(() => {
    if (!loggedIn) message.warning(t("require log in"));
  }, [loggedIn, t]);
  if (loggedIn) {
    return <>{isValidElement(children) ? children : null}</>;
  } else {
    return <Redirect to={redirectUrl} />;
  }
};

export default RequireAuth;
