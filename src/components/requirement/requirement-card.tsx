import React from "react";
import { Card, Descriptions, Input } from "antd";
import { IRequirementDescription } from "../../types";
import moment from "moment";
import { useTranslation } from "react-i18next";

export interface IRequirementCardProps {
  description: IRequirementDescription | Omit<IRequirementDescription, "_id">;
  useCard?: boolean;
  editable?: boolean;
}

const MomentDate = React.memo<{ date: number }>(({ date }) => {
  return <span>{moment(date).format("YYYY-MM-DD HH:mm:SS")}</span>;
});

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
export const RequirementCard: React.FunctionComponent<IRequirementCardProps> = React.memo(
  (props: IRequirementCardProps) => {
    const { description, useCard, editable } = props;

    type DescriptionKeys = keyof typeof description;

    type Editables = Partial<{ [key in DescriptionKeys]: boolean }>;

    type ValueState = Partial<{ [key in DescriptionKeys]: string }>;

    const [editables, setEditables] = React.useState<Editables>({});
    const [valueState, setValueState] = React.useState<ValueState>({});

    const { t } = useTranslation();
    const {
      name,
      createBy,
      lastUpdateAt,
      lastUpdateBy,
      createAt,
      priority,
      participants,
      postCondition,
      preCondition,
      expansionProcess,
      specialNeeds,
      triggeringCondition,
      normalProcess
    } = description;

    const renderItem = (
      key: keyof typeof description,
      value: string | React.ReactNode
    ) => {
      const keyEditable = editables[key];
      if (keyEditable) {
        const value = valueState[key] || "";
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setValueState({
            ...valueState,
            [key]: e.target.value
          });
        };
        return <Input value={value} onChange={onChange} />;
      } else if (editable) {
        const onClick = () => {
          setEditables(prev => ({ ...prev, [key]: true }));
          setValueState(prev => ({ ...prev, [key]: value }));
        };

        const onBlur = () => {
          setEditables(prev => ({ ...prev, [key]: false }));
          setValueState(prev => ({ ...prev, [key]: "" }));
        };

        return (
          <span onClick={onClick} onBlur={onBlur}>
            {value}
          </span>
        );
      } else return value;
    };

    const descriptions = (
      <Descriptions column={2} bordered size={"small"}>
        <Descriptions.Item label={"ID"} span={1}>
          {(description as any)._id || "暫無"}
        </Descriptions.Item>
        <Descriptions.Item label={"名稱"} span={1}>
          {renderItem("name", name)}
        </Descriptions.Item>
        <Descriptions.Item label="創建者" span={1}>
          {renderItem("createBy", createBy)}
        </Descriptions.Item>
        <Descriptions.Item label="優先級" span={1}>
          {renderItem("priority", t(priority))}
        </Descriptions.Item>
        <Descriptions.Item label="最後更新者" span={1}>
          {renderItem("lastUpdateBy", lastUpdateBy)}
        </Descriptions.Item>
        <Descriptions.Item label="創建日期" span={1}>
          {renderItem("createAt", <MomentDate date={createAt} />)}
        </Descriptions.Item>
        <Descriptions.Item label="最後更新日期" span={1}>
          {renderItem("lastUpdateAt", <MomentDate date={lastUpdateAt} />)}
        </Descriptions.Item>
        <Descriptions.Item label="參與者" span={2}>
          {renderItem("participants", participants)}
        </Descriptions.Item>
        <Descriptions.Item label="觸發條件" span={3}>
          {renderItem("triggeringCondition", triggeringCondition)}
        </Descriptions.Item>
        <Descriptions.Item label="前置條件" span={3}>
          {renderItem("preCondition", preCondition)}
        </Descriptions.Item>
        <Descriptions.Item label="後置條件" span={3}>
          {renderItem("postCondition", postCondition)}
        </Descriptions.Item>
        <Descriptions.Item label="正常流程" span={3}>
          {renderItem("normalProcess", normalProcess)}
        </Descriptions.Item>
        <Descriptions.Item label="擴展流程" span={3}>
          {renderItem("expansionProcess", expansionProcess)}
        </Descriptions.Item>
        <Descriptions.Item label="特殊需求" span={3}>
          {renderItem("specialNeeds", specialNeeds)}
        </Descriptions.Item>
      </Descriptions>
    );

    return useCard ? <Card>{descriptions}</Card> : descriptions;
  }
);

RequirementCard.defaultProps = { useCard: true, editable: false };
