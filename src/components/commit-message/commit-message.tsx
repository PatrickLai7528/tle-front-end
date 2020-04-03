import React, { FunctionComponent, memo } from "react";
import { Comment } from "antd";
import moment from "moment";
import "./style.scss";
export interface ICommitMessageProps {
  message: string;
  committerId: string;
  committedAt: number;
  sha: string;
}

const CommitMessage: FunctionComponent<ICommitMessageProps> = memo(
  (props: ICommitMessageProps) => {
    const { message, committedAt, committerId, sha } = props;
    return (
      <Comment
        author={committerId}
        content={message}
        datetime={<span>{moment(committedAt).format()}</span>}
      />
    );
  }
);

export default CommitMessage;
