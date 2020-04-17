import { Input } from "antd";
import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

export interface IStateProps {
  loading: boolean;
}

export interface IDispatchProps {
  doSearch: (searchFor: string) => void;
}

export interface IOwnProps {}

const useStyles = createUseStyles({
  searchGitHub: {
    width: "100%"
  },
  searchInput: {
    width: "100%"
  }
});

export interface ISearchGitHubRepositoryProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const SearchGitHubRepository: FunctionComponent<ISearchGitHubRepositoryProps> = memo(
  (props: ISearchGitHubRepositoryProps) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { doSearch } = props;
    return (
      <Input.Search
        placeholder={t("search repository placeholder")}
        className={styles.searchInput}
        onSearch={doSearch}
      />
    );
  }
);

export default SearchGitHubRepository;
