import { Card, Form, Input, Radio, Button } from "antd";
import React from "react";
import { IRequirementDescription } from "../../types";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

export interface IRequirementFormProps {
  onDone: (desc: Omit<IRequirementDescription, "_id">) => void;
}

// ID
// name
// createBy
// lastUpdateBy
// createAt
// lastUpdateAt
// participants
// Triggering conditions
// Preconditions
// Post-conditions
// priority
// Normal Process
// Expansion process
// Special needs

export const RequirementForm: React.FunctionComponent<IRequirementFormProps> = React.memo(
  (props: IRequirementFormProps) => {
    const githubId = useSelector<RootState, string>(
      state => state.authReducer.ghProfile?.login || "unknown"
    );
    const [form] = Form.useForm();
    const { onDone } = props;
    return (
      <Card>
        <Form
          onFinish={value => {
            const description: Omit<IRequirementDescription, "_id"> = {
              name: value.name,
              lastUpdateAt: Date.now(),
              createAt: Date.now(),
              specialNeeds: value.specialNeeds,
              createBy: githubId,
              lastUpdateBy: githubId,
              priority: value.priority,
              participants: value.participants,
              postCondition: value.postCondition,
              preCondition: value.preCondition,
              normalProcess: value.normalProcess,
              expansionProcess: value.expansionProcess,
              triggeringCondition: value.triggeringCondition
            };
            onDone(description);
            form.resetFields();
          }}
          form={form}
          name="basic"
          initialValues={{ priority: "low" }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item name="name" label="名稱" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="priority"
            label="優先級"
            rules={[{ required: true }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="low">低</Radio.Button>
              <Radio.Button value="medium">中</Radio.Button>
              <Radio.Button value="high">高</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="participants"
            label="參與者"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"triggeringCondition"}
            label={"觸發條件"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"preCondition"}
            label={"前置條件"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"postCondition"}
            label={"後置條件"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"normalProcess"}
            label={"正常流程"}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
            {/* <ReactQuill theme="snow" /> */}
          </Form.Item>

          <Form.Item
            name={"expansionProcess"}
            label={"擴展流程"}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
            {/* <ReactQuill theme="snow" /> */}
          </Form.Item>

          <Form.Item name={"specialNeeds"} label={"特別需求"}>
            <Input.TextArea autoSize={{ minRows: 5 }} />
            {/* <ReactQuill theme="snow" /> */}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);
