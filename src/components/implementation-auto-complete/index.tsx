import React from "react";
import { AutoComplete } from "antd";
import { useDispatch } from "react-redux";
import { fetchAllImplNames } from "../../store/implementation/actions";
import { AppDispatch } from "../../store/store";
import { ImplementationActions } from "../../store/implementation/types";

export interface IImplementationAutoCompleteProps {
  style?: React.CSSProperties;
  value?: string;
  onChange?(value: string): void;
  repoId: string;
}

const mockVal = (str: string, repeat: number = 1) => {
  return {
    value: str.repeat(repeat)
  };
};

export const ImplementationAutoComplete: React.FunctionComponent<IImplementationAutoCompleteProps> = React.memo(
  (props: IImplementationAutoCompleteProps) => {
    const { repoId } = props;
    const [value, setValue] = React.useState("");
    const [options, setOptions] = React.useState<{ value: string }[]>([]);
    const dispatch = useDispatch<AppDispatch<ImplementationActions>>();

    React.useEffect(() => {
      dispatch(fetchAllImplNames(repoId));
    });

    const onSearch = (searchText: string) => {
      setOptions(
        !searchText
          ? []
          : [
              mockVal(searchText),
              mockVal(searchText, 2),
              mockVal(searchText, 3)
            ]
      );
    };
    const onSelect = (data: string) => {
      console.log("onSelect", data);
    };
    const onChange = (data: string) => {
      setValue(data);
    };
    return (
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
    );
  }
);

ImplementationAutoComplete.defaultProps = { style: {} };
