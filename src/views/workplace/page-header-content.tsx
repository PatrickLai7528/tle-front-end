import { Avatar, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { fetchGHProfile } from "../../store/auth/actions";
import { RootState } from "../../store/reducers";
import TracingStatistic from "./tracing-statistic";

export interface IPageHeaderContentProps {}

const useStyles = createUseStyles({
  contentTypography: {
    margin: {
      left: "18px"
    }
  },
  contentTitle: {
    margin: { bottom: "12px" },
    color: "gba(0, 0, 0, 0.85)",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "28px"
  },
  statisticArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1
  }
});

const PageHeaderContent: FunctionComponent<IPageHeaderContentProps> = (
  props: IPageHeaderContentProps
) => {
  const dispatch = useDispatch();

  const ghToken = useSelector<RootState, string | undefined>(
    state => state.authReducer.gitHubAccessToken
  );

  useEffect(() => {
    console.log("in use effect");
    if (ghToken) dispatch(fetchGHProfile(ghToken));
  }, [ghToken]);

  const userAvatarUrl = useSelector<RootState, string | undefined>(
    (state: RootState) => state.authReducer.ghProfile?.avatarUrl
  );

  const userName = useSelector<RootState, string | undefined>(
    state => state.authReducer.ghProfile?.login
  );

  const userBio = useSelector<RootState, string | undefined>(
    state => state.authReducer.ghProfile?.bio
  );

  const styles = useStyles();

  if (!userAvatarUrl || !userName || !userBio) return null;

  return (
    <>
      <Avatar src={userAvatarUrl as string} size={64} />
      <Typography className={styles.contentTypography}>
        <Typography.Title
          className={styles.contentTitle}
          level={3}
        >{`您好，${userName}`}</Typography.Title>
        <Typography.Paragraph type={"secondary"}>
          {userBio}
        </Typography.Paragraph>
      </Typography>
      <div className={styles.statisticArea}>
        <TracingStatistic repository={123} requirement={312} traceLink={165} />
      </div>
    </>
  );
};

export default PageHeaderContent;
