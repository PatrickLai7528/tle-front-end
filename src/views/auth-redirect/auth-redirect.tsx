import React, { FunctionComponent, useEffect, memo } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { IDispatchProps, IStateProps, IOwnProps } from ".";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export interface IAuthRedirectProps
  extends IDispatchProps,
    IStateProps,
    IOwnProps {}

const AuthRedirect: FunctionComponent<IAuthRedirectProps> = memo(
  (props: IAuthRedirectProps) => {
    const { t } = useTranslation();
    const {
      sendGitHubLogIn,
      loggedIn,
      error,
      failureRedirect,
      successRedirect
    } = props;
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const tleAppToken = localStorage.getItem("tle_app_token");
    console.log(tleAppToken);
    cookies.set("tle_app_token", tleAppToken, { path: "/" });

    useEffect(() => {
      if (code) sendGitHubLogIn(code);
    }, [code, sendGitHubLogIn]);

    if (loggedIn && error) {
      message.error(t("log in fail"));
      return <Redirect to={failureRedirect} />;
    } else if (loggedIn && !error) {
      message.success(t("log in success"));
      return <Redirect to={successRedirect} />;
    } else {
      return null;
    }
  }
);

export default AuthRedirect;
