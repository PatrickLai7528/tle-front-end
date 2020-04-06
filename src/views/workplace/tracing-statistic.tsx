import React, { FC, memo } from "react";
import { Statistic, Divider } from "antd";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";

export interface ITracingStatisticProps {
  requirement: number;
  repository: number;
  traceLink: number;
}

const useStyles = createUseStyles({
  statistic: {
    margin: {
      left: "12px",
      right: "12px"
    }
  },
  divider: {
    height: "80% !important"
  }
});

const TracingStatistic: FC<ITracingStatisticProps> = memo(
  (props: ITracingStatisticProps) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { requirement, repository, traceLink } = props;
    return (
      <>
        <Statistic
          className={styles.statistic}
          title={t("requirement")}
          value={requirement}
        />
        <Divider type={"vertical"} className={styles.divider} />
        <Statistic
          className={styles.statistic}
          title={t("repository")}
          value={repository}
        />
        <Divider type={"vertical"} className={styles.divider} />
        <Statistic
          className={styles.statistic}
          title={t("trace link")}
          value={traceLink}
        />
      </>
    );
  }
);

export default TracingStatistic;
