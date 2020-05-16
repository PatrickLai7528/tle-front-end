import React from "react";
import { IRequirementDescription } from "../../types";
import { Select } from "antd";
import { createUseStyles } from "react-jss";
import { SwapOutlined } from "@ant-design/icons";
export interface IAddTraceLinkProps {
  descriptions: IRequirementDescription[];
  fullyQualifiedNames: string[];
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "40% 5% 40%",
    gridColumnGap: "12px",
    justifyItems: "center",
    alignItems: "center"
  }
});

export const AddTraceLink: React.FunctionComponent<IAddTraceLinkProps> = React.memo<
  IAddTraceLinkProps
>(({ descriptions, fullyQualifiedNames }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Select style={{ width: "100%" }} placeholder={"選擇需求描述"}>
        {(descriptions || []).map(description => {
          return (
            <Select.Option key={description._id} value={description.name}>
              {description.name}
            </Select.Option>
          );
        })}
      </Select>
      <SwapOutlined />
      <Select style={{ width: "100%" }} placeholder={"選擇實現的文件"}>
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
