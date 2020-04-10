import React, {
  FunctionComponent,
  memo,
  ReactNode,
  CSSProperties
} from "react";
import { Comment } from "antd";
import moment from "moment";
import { createUseStyles } from "react-jss";
import "./style.scss";

export interface ICommitMessageProps {
  message: string;
  committerId: string;
  committedAt: number;
  sha: string;
  action?: ReactNode;
  style?: CSSProperties;
}

interface IContentProps {
  message: string;
  action: ReactNode;
}

const useStyles = createUseStyles({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  action: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

const Content: FunctionComponent<IContentProps> = memo(
  (props: IContentProps) => {
    const { message, action } = props;
    const styles = useStyles();
    return (
      <div className={styles.content}>
        <span>{message}</span>
        <div className={styles.action}>{action}</div>
      </div>
    );
  }
);

const CommitMessage: FunctionComponent<ICommitMessageProps> = memo(
  (props: ICommitMessageProps) => {
    const { action, message, committedAt, committerId, sha, style } = props;
    return (
      <Comment
        style={style}
        author={committerId}
        content={<Content message={message} action={action} />}
        datetime={<span>{moment(committedAt).format()}</span>}
      />
    );
  }
);

CommitMessage.defaultProps = {
  style: {}
};

export default CommitMessage;
