import { Card, Descriptions, Input, Select, Tooltip, Button } from "antd";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { IRequirementDescription } from "../../types";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { RequirementActions } from "../../store/requirement/types";

export interface IRequirementCardProps {
  description: IRequirementDescription | Omit<IRequirementDescription, "_id">;
  onUpdateDescription?: (description: IRequirementDescription) => void;
  useCard?: boolean;
  useTooltips?: boolean;
  editable?: boolean;
  compareStrictly?: boolean;
  bordered?: boolean;
}

const MomentDate = React.memo<{ date: number }>(({ date }) => {
  return <span>{moment(date).format("YYYY-MM-DD HH:mm:SS")}</span>;
});

const useStyles = createUseStyles({
  buttonWrapper: {
    margin: { top: "16px" },
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  descriptions: {
    width: "100%"
  }
});

const didDescriptionChange = (
  a: IRequirementDescription,
  b: IRequirementDescription
): boolean => {
  return (Object.keys(a) as (keyof IRequirementDescription)[]).some(key => {
    // console.log({ a: a[key], b: b[key] }, a[key] !== b[key]);

    return a[key] !== b[key];
  });
};

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
    const {
      description,
      useCard,
      editable,
      useTooltips,
      onUpdateDescription,
      compareStrictly,
      bordered
    } = props;
    const styles = useStyles();
    const {
      createBy,
      lastUpdateAt,
      lastUpdateBy,
      createAt,
      _id,
      traced,
      ...editablePart
    } = description as IRequirementDescription;

    type DescriptionKeys = keyof typeof description;

    type CannotEditKeys =
      | "lastUpdateBy"
      | "lastUpdateAt"
      | "createBy"
      | "createAt"
      | "traced"
      | "_id";

    type EditableDescriptionKeys = Exclude<DescriptionKeys, CannotEditKeys>;

    type Editables = Partial<{ [key in EditableDescriptionKeys]: boolean }>;

    type ValueState = Partial<{ [key in EditableDescriptionKeys]: string }>;

    const [editables, setEditables] = React.useState<Editables>({});

    const [valueState, setValueState] = React.useState<ValueState>(
      editablePart
    );

    const {
      expansionProcess,
      participants,
      postCondition,
      preCondition,
      priority,
      name,
      normalProcess,
      specialNeeds,
      triggeringCondition
    } = valueState;

    const { t } = useTranslation();

    type ComponentProps = {
      onChange: (value: string) => void;
      onBlur: () => void;
      value: string;
    };

    const renderItem = (
      key: EditableDescriptionKeys,
      value: string | React.ReactNode,
      Component?: ({
        onChange,
        onBlur,
        value
      }: ComponentProps) => React.ReactElement
    ) => {
      const keyEditable = editables[key];
      if (keyEditable) {
        const value = valueState[key] || "";
        const onChange = (value: string) => {
          setValueState({
            ...valueState,
            [key]: value
          });
        };

        const onBlur = () => {
          setEditables(prev => ({ ...prev, [key]: false }));

          const shouldUpdate =
            (compareStrictly &&
              didDescriptionChange(
                description as IRequirementDescription,
                {
                  ...description,
                  ...valueState
                } as IRequirementDescription
              )) ||
            !compareStrictly;

          if (typeof onUpdateDescription === "function" && shouldUpdate) {
            onUpdateDescription({
              ...description,
              ...valueState
            } as IRequirementDescription);
          }
        };

        if (Component) {
          return Component({ onBlur, onChange, value });
        } else
          return (
            <Input
              autoFocus
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
            />
          );
      } else if (editable) {
        const onClick = () => {
          setEditables(prev => ({ ...prev, [key]: true }));
          setValueState(prev => ({ ...prev, [key]: value }));
        };

        const node = (
          <div
            onClick={onClick}
            style={{ width: "100%", display: "inline-block" }}
          >
            {value}
          </div>
        );

        const withTooltips = () => {
          return (
            <Tooltip title="點擊修改" placement="left">
              {node}
            </Tooltip>
          );
        };

        return useTooltips ? withTooltips() : node;
      } else return <>{value}</>;
    };

    const EditableTextArea = ({ onBlur, onChange, value }: ComponentProps) => (
      <Input.TextArea
        value={value}
        onBlur={onBlur}
        onChange={e => onChange(e.target.value)}
        autoSize={{ minRows: 5 }}
      />
    );

    const descriptions = (
      <Descriptions
        column={2}
        bordered={bordered}
        size={"small"}
        className={styles.descriptions}
      >
        <Descriptions.Item label={"ID"} span={1}>
          {(description as any)._id || "暫無"}
        </Descriptions.Item>
        <Descriptions.Item label={"名稱"} span={1}>
          {renderItem("name", name)}
        </Descriptions.Item>
        <Descriptions.Item label="創建者" span={1}>
          {createBy}
        </Descriptions.Item>
        <Descriptions.Item label="優先級" span={1}>
          {renderItem(
            "priority",
            t(priority as string),
            ({ value, onBlur, onChange }) => {
              return (
                <Select value={value} onBlur={onBlur} onChange={onChange}>
                  <Select.Option value="low">{t("low")}</Select.Option>
                  <Select.Option value="medium">{t("medium")}</Select.Option>
                  <Select.Option value="high">{t("high")}</Select.Option>
                </Select>
              );
            }
          )}
        </Descriptions.Item>
        <Descriptions.Item label="最後更新者" span={1}>
          {lastUpdateBy}
        </Descriptions.Item>
        <Descriptions.Item label="創建日期" span={1}>
          {<MomentDate date={createAt} />}
        </Descriptions.Item>
        <Descriptions.Item label="最後更新日期" span={1}>
          {<MomentDate date={lastUpdateAt} />}
        </Descriptions.Item>
        <Descriptions.Item label="參與者" span={2}>
          {renderItem("participants", participants)}
        </Descriptions.Item>
        <Descriptions.Item label="觸發條件" span={2}>
          {renderItem(
            "triggeringCondition",
            triggeringCondition,
            EditableTextArea
          )}
        </Descriptions.Item>
        <Descriptions.Item label="前置條件" span={2}>
          {renderItem("preCondition", preCondition, EditableTextArea)}
        </Descriptions.Item>
        <Descriptions.Item label="後置條件" span={2}>
          {renderItem("postCondition", postCondition, EditableTextArea)}
        </Descriptions.Item>
        <Descriptions.Item label="正常流程" span={2}>
          {renderItem("normalProcess", normalProcess, EditableTextArea)}
        </Descriptions.Item>
        <Descriptions.Item label="擴展流程" span={2}>
          {renderItem("expansionProcess", expansionProcess, EditableTextArea)}
        </Descriptions.Item>
        <Descriptions.Item label="特殊需求" span={2}>
          {renderItem("specialNeeds", specialNeeds, EditableTextArea)}
        </Descriptions.Item>
      </Descriptions>
    );

    return useCard ? <Card>{descriptions}</Card> : descriptions;
  }
);

RequirementCard.defaultProps = {
  useCard: true,
  editable: false,
  compareStrictly: true,
  bordered: true
};
