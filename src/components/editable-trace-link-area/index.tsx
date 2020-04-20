import { Button, Input, Spin } from "antd";
import React, { FunctionComponent, memo, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store/reducers";
import { newTraceLink as sendNewTraceLink } from "../../store/trace-link/actions";
import { ITraceLink } from "../../types";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface IEditableTraceLinkAreaProps {
  traceLinks: ITraceLink[];
  repoName: string;
  type: "IMPLEMENT" | "REQUIREMENT";
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
    const { traceLinks, repoName, type } = props;
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.sendNewTraceLinkLoading
    );
    const dispatch = useDispatch();
    const styles = useStyles();

    const [newTraceLink, setNewTraceLink] = useState<ITraceLink | null>(null);

    const setTraceLinkByType = (value: string) => {
      if (type === "REQUIREMENT" && newTraceLink) {
        setNewTraceLink({
          ...newTraceLink,
          implement: {
            ...newTraceLink.implement,
            fullyQualifiedName: value
          }
        });
      } else if (type === "IMPLEMENT" && newTraceLink) {
        setNewTraceLink({
          ...newTraceLink,
          requirementDescription: {
            ...newTraceLink.requirementDescription,
            text: value
          }
        });
      }
    };

    const initTraceLinkByType = () => {
      if (type === "REQUIREMENT") {
        setNewTraceLink({
          id: uuidv4(),
          requirementDescription: traceLinks[0].requirementDescription,
          implement: {
            id: uuidv4(),
            fullyQualifiedName: "",
            type: "CLASS"
          }
        });
      } else if (type === "IMPLEMENT") {
        setNewTraceLink({
          id: uuidv4(),
          requirementDescription: {
            id: uuidv4(),
            text: "",
            lastUpdateAt: Date.now()
          },
          implement: (traceLinks[0] || {}).implement
        });
      }
    };

    const getValueByType = () => {
      if (type === "REQUIREMENT" && newTraceLink) {
        return newTraceLink.implement.fullyQualifiedName;
      } else if (type === "IMPLEMENT" && newTraceLink) {
        return newTraceLink.requirementDescription.text;
      }
    };

    return (
      <>
        <Button block type={"primary"} onClick={initTraceLinkByType}>
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
                    value={getValueByType()}
                    onChange={e => {
                      const { value } = e.target;
                      if (value) {
                        setTraceLinkByType(value);
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
              showRequirement={type !== "REQUIREMENT"}
              showImplement={type !== "IMPLEMENT"}
            />
          </Spin>
        )}
        {traceLinks.map(link => (
          <SimpleTraceLinkCard
            showOperation
            key={link.id}
            traceLink={link}
            showRequirement={type !== "REQUIREMENT"}
            showImplement={type !== "IMPLEMENT"}
          />
        ))}
      </>
    );
  }
);
