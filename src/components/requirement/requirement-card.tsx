import React from "react";
import { Card, Descriptions } from "antd";
import { IRequirementDescription } from "../../types";
import moment from "moment";
import { useTranslation } from "react-i18next";

export interface IRequirementCardProps {
  description: IRequirementDescription;
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
    const { description } = props;
    const { t } = useTranslation();
    const {
      _id,
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
    return (
      <Card>
        <Descriptions column={3} bordered title="Custom Size" size={"small"}>
          <Descriptions.Item label={"ID"} span={1}>
            {_id}
          </Descriptions.Item>
          <Descriptions.Item label={"名稱"} span={1}>
            {name}
          </Descriptions.Item>
          <Descriptions.Item label="創建者" span={1}>
            {createBy}
          </Descriptions.Item>
          <Descriptions.Item label="優先級" span={1}>
            {t(priority)}
          </Descriptions.Item>
          <Descriptions.Item label="最後更新者" span={1}>
            {lastUpdateBy}
          </Descriptions.Item>
          <Descriptions.Item label="創建日期" span={1}>
            <MomentDate date={createAt} />
          </Descriptions.Item>
          <Descriptions.Item label="最後更新日期" span={1}>
            <MomentDate date={lastUpdateAt} />
          </Descriptions.Item>
          <Descriptions.Item label="參與者" span={2}>
            {participants}
          </Descriptions.Item>
          <Descriptions.Item label="觸發條件" span={3}>
            {triggeringCondition}
          </Descriptions.Item>
          <Descriptions.Item label="前置條件" span={3}>
            {preCondition}
          </Descriptions.Item>
          <Descriptions.Item label="後置條件" span={3}>
            {postCondition}
          </Descriptions.Item>
          <Descriptions.Item label="正常流程" span={3}>
            {normalProcess}
          </Descriptions.Item>
          <Descriptions.Item label="擴展流程" span={3}>
            {expansionProcess}
          </Descriptions.Item>
          <Descriptions.Item label="特殊需求" span={3}>
            {specialNeeds}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
);
