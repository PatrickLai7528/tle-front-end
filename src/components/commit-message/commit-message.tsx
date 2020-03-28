import React, { FunctionComponent, memo } from "react";
import { Divider } from "antd";

export interface ICommitMessageProps {
  message: string;
  avatarUrl: string;
  committedAt: number;
  sha: string;
}

const CommitMessage: FunctionComponent<ICommitMessageProps> = memo(
  (props: ICommitMessageProps) => {
    return <div></div>;
  }
);

export default CommitMessage;
