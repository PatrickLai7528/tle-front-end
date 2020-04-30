import { AutoComplete } from "antd";
import React from "react";
import { createUseStyles } from "react-jss";

export interface IBaseAutoCompleteProps {
  style?: React.CSSProperties;
  value: string;
  onChange(value: string): void;
}

const useStyles = createUseStyles({
  autoComplete: {
    width: "100%"
  }
});

type Props = { options: string[] } & IBaseAutoCompleteProps;

export const BaseAutoComplete: React.FunctionComponent<Props> = React.memo(
  (props: Props) => {
    const { onChange, value, options } = props;

    const styles = useStyles();

    const optionObjs: { value: string }[] = React.useMemo(() => {
      return options.map(option => ({ value: option }));
    }, [options]);

    return (
      <AutoComplete
        backfill
        allowClear
        autoFocus
        filterOption={(inputValue, option) => {
          if (option)
            return (
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            );
          else return false;
        }}
        className={styles.autoComplete}
        options={optionObjs}
        value={value}
        onChange={onChange}
      />
    );
  }
);

BaseAutoComplete.defaultProps = { style: {} };
