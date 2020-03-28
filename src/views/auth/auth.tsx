import { Tabs } from "antd";
import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { LogInForm } from "../../components/log-in-form";
import { RegistryForm } from "../../components/registry-form";
import { ILogInData, IRegistryData } from "../../store/auth/types";
import "./style.scss";

const { TabPane } = Tabs;

export interface IAuthProps {
  logIn: (data: ILogInData) => void;
  registry: (data: IRegistryData) => void;
}

const Auth: FunctionComponent<IAuthProps> = memo((props: IAuthProps) => {
  const { logIn, registry } = props;
  const { t } = useTranslation();

  return (
    <div className={"auth-view-container"}>
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
