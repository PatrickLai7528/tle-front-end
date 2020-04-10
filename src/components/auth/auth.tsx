import { Tabs } from "antd";
import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { LogInForm } from "../log-in-form";
import { RegistryForm } from "../registry-form";
import { ILogInData, IRegistryData } from "../../store/auth/types";
import { createUseStyles } from "react-jss";

const { TabPane } = Tabs;

export interface IStateProps {}

export interface IDispatchProps {
  logIn: (data: ILogInData) => void;
  registry: (data: IRegistryData) => void;
}

export interface IOwnProps {}

export interface IAuthProps extends IStateProps, IDispatchProps, IOwnProps {}

const useStyles = createUseStyles({
  authViewContainer: {
    width: "100%"
  }
});

const Auth: FunctionComponent<IAuthProps> = memo((props: IAuthProps) => {
  const { logIn, registry } = props;
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <div className={styles.authViewContainer}>
      <Tabs defaultActiveKey="login">
        <TabPane tab={t("log in")} key="login">
          <LogInForm
            onFinish={(data: ILogInData, remember: boolean) => {
              console.log(data);
              console.log(remember);
            }}
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
