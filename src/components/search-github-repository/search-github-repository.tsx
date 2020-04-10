import React, { FunctionComponent, memo } from "react";
import { Input, Dropdown, Menu } from "antd";

export interface IStateProps {}

export interface IDispatchProps {}

export interface IOwnProps {}

export interface ISearchGitHubRepositoryProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const SearchGitHubRepository: FunctionComponent<ISearchGitHubRepositoryProps> = memo(
  (props: ISearchGitHubRepositoryProps) => {
    return (
      <Dropdown overlay={menu}>
        <Input.Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
      </Dropdown>
    );
  }
);

export default SearchGitHubRepository;
