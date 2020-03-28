import React, { FunctionComponent, memo, ChangeEvent } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ILogInData } from "../../store/auth/types";
import { GithubOutlined } from "@ant-design/icons";
import { gitHubAuthConfigs } from "./../../configs/github-auth.config";

export interface ILogInFormProps {
  onFinish: (data: ILogInData, remember: boolean) => void;
  onFinishFailed: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const href = `${gitHubAuthConfigs.authorize_uri}?client_id=${gitHubAuthConfigs.client_id}&redirect_uri=${gitHubAuthConfigs.redirect_uri}`;

const LogInForm: FunctionComponent<ILogInFormProps> = memo(
  (props: ILogInFormProps) => {
    const { t } = useTranslation();

    const [form] = Form.useForm();

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ email: e.target.value });

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ password: e.target.value });

    const onRememberChange = (e: CheckboxChangeEvent) =>
      form.setFieldsValue({ remember: e.target.checked });

    const onFinish = (values: any) => {
      console.log("Success:", values);
      if (typeof props.onFinish === "function") {
        props.onFinish(
          {
            email: values.email,
            password: values.password
          },
          values.remember
        );
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
      if (typeof props.onFinishFailed === "function") {
        props.onFinishFailed();
      }
    };

    return (
      <Form
        {...layout}
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t("email")}
          name={"email"}
          rules={[{ required: true, message: t("email placeholder") }]}
        >
          <Input
            placeholder={t("email placeholder")}
            onChange={onEmailChange}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 10 }}
          label={t("password")}
          name="password"
          rules={[{ required: true, message: t("password placeholder") }]}
        >
          <Input.Password
            placeholder={t("password placeholder")}
            onChange={onPasswordChange}
          />
        </Form.Item>

        <Form.Item
          {...tailLayout}
          name="remember"
          valuePropName="checked"
          style={{ marginBottom: 10 }}
        >
          <Checkbox onChange={onRememberChange}>{t("remember me")}</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout} style={{ marginBottom: 10 }}>
          <Button type="primary" htmlType="submit" block>
            {t("log in")}
          </Button>
        </Form.Item>
        <div style={{ float: "right" }}>
          <span>其它登錄方式：</span>
          <Button icon={<GithubOutlined />} type={"link"} href={href}></Button>
        </div>
      </Form>
    );
  }
);

export default LogInForm;
