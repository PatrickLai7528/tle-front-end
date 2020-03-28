import React, {
  FunctionComponent,
  isValidElement,
  memo,
  useEffect
} from "react";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export interface IRequireAuthProps {
  children: React.ReactChild;
  loggedIn: boolean;
  redirectUrl: string;
}

const RequireAuth: FunctionComponent<IRequireAuthProps> = memo(
  (props: IRequireAuthProps) => {
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
  }
);

export default RequireAuth;
