import { AutoComplete, Select } from "antd";
import React from "react";
import { createUseStyles } from "react-jss";

export interface IBaseSelectProps {
  style?: React.CSSProperties;
  value: string;
  onChange(value: string): void;
}

const useStyles = createUseStyles({
  select: {
    width: "100%"
  }
});

type Props = { options: string[] } & IBaseSelectProps;

export const BaseSelect: React.FunctionComponent<Props> = React.memo(
  (props: Props) => {
    const { onChange, value, options } = props;

    const styles = useStyles();

    return (
      <Select
        className={styles.select}
        showSearch
        value={value}
        onChange={onChange}
        filterOption={(input, option) => {
          console.log(input);
          console.log(option);
          return true;
        }}
      >
        {options.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    );
  }
);

BaseSelect.defaultProps = { style: {} };
