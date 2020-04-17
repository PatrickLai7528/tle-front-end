import { Anchor } from "antd";
import { AnchorContainer } from "antd/lib/anchor/Anchor";
import React, { FunctionComponent, memo, CSSProperties } from "react";
import { createUseStyles } from "react-jss";
import { ICommitChanges, ITraceLink } from "../../types";
import StatsBoxes from "./stats-box";

export interface ICommitChangeInfoProps {
  changes: ICommitChanges[];
  getContainer?: () => AnchorContainer;
  style?: CSSProperties;
}

const useStyles = createUseStyles({
  changes: {},
  added: {
    color: "#28a745!important",
    margin: { left: "16px" }
  },
  oneChangeLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  statsArea: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  removed: {
    color: "#cb2431!important",
    margin: { left: "16px" }
  },
  traceLinkArea: {
    margin: { left: "24px" }
  }
});

const CommitChangeInfo: FunctionComponent<ICommitChangeInfoProps> = memo(
  (props: ICommitChangeInfoProps) => {
    const { changes, getContainer, style } = props;
    const styles = useStyles();
    return (
      <div className={styles.changes} style={style}>
        {(changes || []).map(change => {
          return (
            <Anchor affix={false} getContainer={getContainer}>
              <Anchor.Link
                href={`#${change.sha}`}
                title={
                  <span className={styles.oneChangeLine}>
                    <span>{change.filename}</span>
                    <span className={styles.statsArea}>
                      {!!change.additions && (
                        <span className={styles.added}>
                          +{change.additions}
                        </span>
                      )}
                      {!!change.deletions && (
                        <span className={styles.removed}>
                          -{change.deletions}
                        </span>
                      )}
                      <StatsBoxes
                        total={change.additions + change.deletions}
                        added={change.additions}
                        removed={change.deletions}
                      />
                    </span>
                  </span>
                }
              />
            </Anchor>
          );
        })}
      </div>
    );
  }
);

CommitChangeInfo.defaultProps = {
  style: {}
};

export default CommitChangeInfo;
