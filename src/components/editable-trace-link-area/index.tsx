import React, { FunctionComponent, memo, useState } from "react";
import { ITraceLink } from "../../types";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";
import { Button, Input, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  newTraceLink as sendNewTraceLink,
  fetchRequirementRelatedTraceLinks
} from "../../store/trace-link/actions";

export interface IEditableTraceLinkAreaProps {
  traceLinks: ITraceLink[];
  repoName: string;
}

const useStyles = createUseStyles({
  link: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  buttons: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button: {
    margin: { left: "16px" }
  }
});

export const EditableTraceLinkArea: FunctionComponent<IEditableTraceLinkAreaProps> = memo(
  (props: IEditableTraceLinkAreaProps) => {
    const { traceLinks, repoName } = props;
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.sendNewTraceLinkLoading
    );
    const dispatch = useDispatch();
    const styles = useStyles();
    const [newTraceLink, setNewTraceLink] = useState<ITraceLink | null>(null);

    return (
      <>
        <Button
          block
          type={"primary"}
          onClick={() =>
            setNewTraceLink({
              id: uuidv4(),
              requirementDescription: traceLinks[0].requirementDescription,
              implement: {
                id: uuidv4(),
                fullyQualifiedName: "",
                type: "CLASS"
              }
            })
          }
        >
          增加
        </Button>
        {newTraceLink && (
          <Spin spinning={loading}>
            <SimpleTraceLinkCard
              style={{ marginTop: "16px", marginBottom: "16px" }}
              input={
                <div className={styles.link}>
                  <Input
                    width={"100%"}
                    value={newTraceLink.implement.fullyQualifiedName}
                    onChange={e => {
                      const { value } = e.target;
                      if (value) {
                        setNewTraceLink({
                          ...newTraceLink,
                          implement: {
                            ...newTraceLink.implement,
                            fullyQualifiedName: value
                          }
                        });
                      }
                    }}
                  />
                  <div className={styles.buttons}>
                    <Button
                      onClick={async () => {
                        if (newTraceLink) {
                          await dispatch(
                            sendNewTraceLink(repoName, newTraceLink)
                          );
                          setNewTraceLink(null);
                        }
                      }}
                      className={styles.button}
                      type="primary"
                    >
                      確認
                    </Button>
                    <Button
                      onClick={() => setNewTraceLink(null)}
                      className={styles.button}
                      type="danger"
                    >
                      取消
                    </Button>
                  </div>
                </div>
              }
              type="ADDED"
              key={newTraceLink.id}
              traceLink={newTraceLink}
              showRequirement={false}
            />
          </Spin>
        )}
        {traceLinks.map(link => (
          <SimpleTraceLinkCard
            showOperation
            key={link.id}
            traceLink={link}
            showRequirement={false}
          />
        ))}
      </>
    );
  }
);
