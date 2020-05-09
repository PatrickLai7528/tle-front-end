import React from "react";
import { Result, Button } from "antd";
import { RouteComponentProps, Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import { RouteConstants } from "../../routes/constants";

export interface IErrorProps
  extends RouteComponentProps<{ title: string; subTitle: string }> {}

const useStyle = createUseStyles({
  result: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc!important",
    borderRadius: "10px",
    margin: "3rem",
    background: "#fff"
  }
});

export const Error: React.FunctionComponent<IErrorProps> = React.memo(
  (props: IErrorProps) => {
    const styles = useStyle();
    const {
      match: {
        params: { title, subTitle }
      }
    } = props;
    return (
      <div className={styles.result}>
        <Result
          status="error"
          title={title}
          subTitle={subTitle}
          extra={[
            <Link key="workplace" to={RouteConstants.WORKPLACE}>
              <Button type="primary">前往工作台</Button>
            </Link>
          ]}
        />
      </div>
    );
  }
);
