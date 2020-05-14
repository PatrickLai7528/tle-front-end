import React, { FunctionComponent, memo, ChangeEvent } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { IRegistryData } from "../../store/auth/types";
import { createUseStyles } from "react-jss";
import { isPasswordValid } from "../../utils/password";

export interface IRegistryFormProps {
  loading: boolean;
  onFinish: (data: IRegistryData, remember: boolean) => void;
  onFinishFailed: (error: any) => void;
}

const useStyles = createUseStyles({
  formItem: {
    margin: { bottom: "10px" }
  }
});

const RegistryForm: FunctionComponent<IRegistryFormProps> = memo(
  (props: IRegistryFormProps) => {
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
        name="registry from"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t("email")}
          name="email"
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
          label={t("password")}
          name="password"
          rules={[
            { required: true, message: t("password placeholder") },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (!isPasswordValid(value)) {
                    reject(t("password format"));
                  } else resolve();
                });
              }
            }
          ]}
        >
          <Input.Password
            onChange={onPasswordChange}
            placeholder={t("password placeholder")}
          />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label={t("confirm password")}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t("please confirm password")
            },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  const password = form.getFieldValue("password");
                  if (password !== value) {
                    reject(t("password not the same"));
                  }
                });
              }
            }
          ]}
        >
          <Input.Password placeholder={t("password placeholder")} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          className={styles.formItem}
        >
          <Checkbox onChange={onRememberChange}>{t("remember me")}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" block>
            {t("registry")}
          </Button>
        </Form.Item>
      </Form>
    );
  }
);

export default RegistryForm;
