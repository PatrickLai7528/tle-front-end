import { Button } from "antd";
import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { CommitMessage } from "../../../components/commit-message";
import { ICommit } from "../../../types";
import PropertyCard from "../shared/property-card";

export interface ICommitCardProps {
  commits: ICommit[];
  onDetailClick: (commit: ICommit) => void;
}

const useStyles = createUseStyles({
  detailButton: {
    margin: { left: "16px", right: "16px" }
  }
});

const CommitCard: FunctionComponent<ICommitCardProps> = memo(
  (props: ICommitCardProps) => {
    const { t } = useTranslation();
    const { commits, onDetailClick } = props;
    const styles = useStyles();

    console.log(commits);

    return (
      <PropertyCard
        titleProps={{ itemNumber: commits.length, text: t("commit") }}
      >
        {(commits || []).map(commit => {
          return (
            <CommitMessage
              style={{ background: "#fff", margin: "8px" }}
              action={
                <Button
                  className={styles.detailButton}
                  onClick={() => {
                    onDetailClick(commit);
                  }}
                  size="small"
                  type={"primary"}
                >
                  詳情
                </Button>
              }
              key={commit.sha}
              sha={commit.sha}
              message={commit.message}
              committedAt={commit.committedAt}
              committerId={commit.committer?.id || ""}
            />
          );
        })}
      </PropertyCard>
    );
  }
);

export default CommitCard;
