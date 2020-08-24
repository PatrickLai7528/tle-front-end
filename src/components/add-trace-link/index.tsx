import React from "react";
import { IRequirementDescription } from "../../types";
import { Select } from "antd";
import { createUseStyles } from "react-jss";
import { SwapOutlined } from "@ant-design/icons";
import { NewCommitTraceLink } from "../commit-detail/commit-detail";
export interface IAddTraceLinkProps {
  descriptions: IRequirementDescription[];
  fullyQualifiedNames: string[];
  onChange: (value: NewCommitTraceLink) => void;
  value: NewCommitTraceLink;
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "20% 30% 5% 30%",
    gridColumnGap: "12px",
    justifyItems: "center",
    alignItems: "center"
  }
});

export const AddTraceLink: React.FunctionComponent<IAddTraceLinkProps> = React.memo<
  IAddTraceLinkProps
>(({ descriptions, fullyQualifiedNames, value, onChange }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Select
        style={{ width: "100%" }}
        placeholder={"增加或刪除"}
        onChange={type => onChange({ ...value, type })}
        value={value.type}
      >
        <Select.Option value={"added"}>增加</Select.Option>
        <Select.Option value={"removed"}>刪除</Select.Option>
      </Select>
      <Select
        style={{ width: "100%" }}
        placeholder={"選擇需求描述"}
        onChange={name => {
          const found = descriptions.filter(
            description => description.name === name
          )[0];
          onChange({ ...value, description: found });
        }}
        value={value.description.name}
      >
        {(descriptions || []).map(description => {
          return (
            <Select.Option key={description._id} value={description.name}>
              {description.name}
            </Select.Option>
          );
        })}
      </Select>
      <SwapOutlined />
      <Select
        style={{ width: "100%" }}
        placeholder={"選擇實現的文件"}
        onChange={filename => onChange({ ...value, implement: filename })}
        value={value.implement}
      >
        {(fullyQualifiedNames || []).map(filename => {
          return (
            <Select.Option key={filename} value={filename}>
              {filename}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
});
