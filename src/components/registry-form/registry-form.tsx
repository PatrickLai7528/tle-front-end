import React, { FunctionComponent, memo, ChangeEvent } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { IRegistryData } from "../../store/auth/types";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

export interface IRegistryFormProps {
  onFinish: (data: IRegistryData, remember: boolean) => void;
  onFinishFailed: () => void;
}

const RegistryForm: FunctionComponent<IRegistryFormProps> = memo(
  (props: IRegistryFormProps) => {
    const { t } = useTranslation();

    const [form] = Form.useForm();

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
          name="email"
          rules={[{ required: true, message: t("email placeholder") }]}
        >
          <Input
            placeholder={t("email placeholder")}
            onChange={onEmailChange}
          />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[{ required: true, message: t("password placeholder") }]}
        >
          <Input.Password onChange={onPasswordChange} />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox onChange={onRememberChange}>{t("remember me")}</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {t("submit")}
          </Button>
        </Form.Item>
      </Form>
    );
  }
);

export default RegistryForm;
