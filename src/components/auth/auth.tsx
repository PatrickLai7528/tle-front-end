import { Tabs } from "antd";
import React, { FunctionComponent, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { LogInForm } from "../log-in-form";
import { RegistryForm } from "../registry-form";
import { ILogInData, IRegistryData } from "../../store/auth/types";
import { createUseStyles } from "react-jss";
import { INotificationQueueItem } from "../../store/notification/types";

const { TabPane } = Tabs;

export interface IStateProps {
  loading: boolean;
  error: boolean;
}

export interface IDispatchProps {
  logIn: (data: ILogInData) => Promise<boolean>;
  pushNotification: (item: INotificationQueueItem) => void;
  registry: (data: IRegistryData) => void;
}

export interface IOwnProps {
  onLogInDone: (success: boolean) => void;
  onRegistryDone: (success: boolean) => void;
}

export interface IAuthProps extends IStateProps, IDispatchProps, IOwnProps {}

const useStyles = createUseStyles({
  authViewContainer: {
    width: "100%"
  }
});

const Auth: FunctionComponent<IAuthProps> = memo((props: IAuthProps) => {
  const {
    logIn,
    registry,
    loading,
    pushNotification,
    onLogInDone,
    onRegistryDone
  } = props;
  const { t } = useTranslation();
  const styles = useStyles();

  const successNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: t("log in success"),
      duration: 4.5,
      type: "success",
      messageOrNotification: "message"
    };
  }, [t]);

  const failureNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: t("log in failure"),
      duration: 4.5,
      type: "error",
      messageOrNotification: "message"
    };
  }, [t]);

  const memorizedOnLogInFinish = useMemo(() => {
    return (data: ILogInData, remember: boolean) => {
      logIn(data).then(success => {
        pushNotification(success ? successNotification : failureNotification);
        onLogInDone(success);
      });
    };
  }, [
    logIn,
    failureNotification,
    successNotification,
    pushNotification,
    onLogInDone
  ]);

  return (
    <div className={styles.authViewContainer}>
      <Tabs defaultActiveKey="login">
        <TabPane tab={t("log in")} key="login">
          <LogInForm
            loading={loading}
            onFinish={memorizedOnLogInFinish}
            onFinishFailed={() => {
              console.log("failed");
            }}
          />
        </TabPane>
        <TabPane tab={t("registry")} key="registry">
          <RegistryForm
            onFinish={(data: IRegistryData, rememebr) => {
              console.log(data);
              console.log(rememebr);
            }}
            onFinishFailed={() => {
              console.log("failed");
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Auth;
