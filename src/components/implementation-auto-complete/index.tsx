import React from "react";
import { AutoComplete, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImplNames } from "../../store/implementation/actions";
import { AppDispatch } from "../../store/store";
import { ImplementationActions } from "../../store/implementation/types";
import { RootState } from "../../store/reducers";
import { createUseStyles } from "react-jss";

export interface IImplementationAutoCompleteProps {
  style?: React.CSSProperties;
  value: string;
  onChange(value: string): void;
  repoId: string;
}

const useStyles = createUseStyles({
  autoComplete: {
    width: "100%"
  }
});

export const ImplementationAutoComplete: React.FunctionComponent<IImplementationAutoCompleteProps> = React.memo(
  (props: IImplementationAutoCompleteProps) => {
    const { repoId, onChange, value } = props;

    const styles = useStyles();

    const filenames: string[] = useSelector<RootState, string[]>(
      state => state.implementationReducer.names
    );

    const dispatch = useDispatch<AppDispatch<ImplementationActions>>();

    React.useEffect(() => {
      dispatch(fetchAllImplNames(repoId));
    }, [repoId]);

    const options: { value: string }[] = React.useMemo(() => {
      return filenames.map(name => ({ value: name }));
    }, [filenames]);

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
        options={options}
        value={value}
        onChange={onChange}
      />
    );
  }
);

ImplementationAutoComplete.defaultProps = { style: {} };
