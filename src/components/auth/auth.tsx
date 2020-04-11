import { Tabs } from "antd";
import React, { FunctionComponent, useMemo, memo, useState } from "react";
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
  registry: (data: IRegistryData) => Promise<boolean>;
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
  const [activeTabKey, setActiveTabKey] = useState<"LOG_IN" | "REGISTRY">(
    "LOG_IN"
  );
  const styles = useStyles();

  const successLogInNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: t("log in success"),
      duration: 4.5,
      type: "success",
      messageOrNotification: "message"
    };
  }, [t]);

  const failureLogInNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: t("log in failure"),
      duration: 4.5,
      type: "error",
      messageOrNotification: "message"
    };
  }, [t]);

  const successRegistryNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: t("registry success"),
      duration: 4.5,
      type: "success",
      messageOrNotification: "message"
    };
  }, [t]);

  const failureRegistryNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: t("registry failure"),
      duration: 4.5,
      type: "error",
      messageOrNotification: "message"
    };
  }, [t]);

  const memorizedOnLogInFinish = useMemo(() => {
    return (data: ILogInData, remember: boolean) => {
      logIn(data).then(success => {
        pushNotification(
          success ? successLogInNotification : failureLogInNotification
        );
        onLogInDone(success);
      });
    };
  }, [
    logIn,
    failureLogInNotification,
    successLogInNotification,
    pushNotification,
    onLogInDone
  ]);

  const memorizedOnLogInFailure = useMemo(() => {
    return (error: any) => {
      pushNotification(failureLogInNotification);
    };
  }, [pushNotification, failureLogInNotification]);

  const memorizedOnRegistryFinish = useMemo(() => {
    return (data: IRegistryData, rememebr: boolean) => {
      registry(data).then(success => {
        pushNotification(
          success ? successRegistryNotification : failureRegistryNotification
        );
        onRegistryDone(success);
        setActiveTabKey("LOG_IN");
      });
    };
  }, [
    registry,
    successRegistryNotification,
    failureRegistryNotification,
    pushNotification,
    onRegistryDone
  ]);

  const memorizedOnRegistryFailure = useMemo(() => {
    return (error: any) => {
      pushNotification(failureRegistryNotification);
    };
  }, [pushNotification, failureRegistryNotification]);

  const memorizedOnTabKeyChange = useMemo(() => {
    return (key: string) => setActiveTabKey(key as any);
  }, [setActiveTabKey]);

  return (
    <div className={styles.authViewContainer}>
      <Tabs
        activeKey={activeTabKey}
        onChange={memorizedOnTabKeyChange}
        destroyInactiveTabPane
      >
        <TabPane tab={t("log in")} key={"LOG_IN"}>
          <LogInForm
            loading={loading}
            onFinish={memorizedOnLogInFinish}
            onFinishFailed={memorizedOnLogInFailure}
          />
        </TabPane>
        <TabPane tab={t("registry")} key={"REGISTRY"}>
          <RegistryForm
            loading={loading}
            onFinish={memorizedOnRegistryFinish}
            onFinishFailed={memorizedOnRegistryFailure}
          />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Auth;
