import { GithubOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { ChangeEvent, FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { getGitHubLogInUrl } from "../../configs/get-url";
import { ILogInData } from "../../store/auth/types";

export interface ILogInFormProps {
  loading: boolean;
  onFinish: (data: ILogInData, remember: boolean) => void;
  onFinishFailed: (error: any) => void;
}

const useStyles = createUseStyles({
  formItem: {
    margin: { bottom: "10px" }
  },
  otherLogInArea: {
    float: "right"
  }
});

const LogInForm: FunctionComponent<ILogInFormProps> = memo(
  (props: ILogInFormProps) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const [form] = Form.useForm();
    const { loading } = props;
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ email: e.target.value });

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ password: e.target.value });

    const onRememberChange = (e: CheckboxChangeEvent) =>
      form.setFieldsValue({ remember: e.target.checked });

    const onFinish = (values: any) => {
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
      if (typeof props.onFinishFailed === "function") {
        props.onFinishFailed(errorInfo);
      }
      if (process.env.NODE_ENV !== "production") {
        console.log(errorInfo);
      }
    };

    return (
      <Form
        name="logInForm"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t("email")}
          name={"email"}
          rules={[
            { required: true, message: t("email placeholder") },
            { type: "email", message: t("require email format") }
          ]}
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
          name="remember"
          valuePropName="checked"
          className={styles.formItem}
        >
          <Checkbox onChange={onRememberChange}>{t("remember me")}</Checkbox>
        </Form.Item>

        <Form.Item className={styles.formItem}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {t("log in")}
          </Button>
        </Form.Item>
        <div className={styles.otherLogInArea}>
          <span>{`${t("other login")}:`}</span>
          <Button
            icon={<GithubOutlined />}
            type={"link"}
            href={getGitHubLogInUrl()}
          ></Button>
        </div>
      </Form>
    );
  }
);

export default LogInForm;
