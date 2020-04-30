import { Button, Input, Spin } from "antd";
import React, { FunctionComponent, memo, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store/reducers";
import { newTraceLink as sendNewTraceLink } from "../../store/trace-link/actions";
import { ITraceLink, IRequirementDescription, IImplement } from "../../types";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";
import { ImplementationAutoComplete } from "../auto-complete/implementation";
import { RequirementAutoComplete } from "../auto-complete/requirement";

export interface IEditableTraceLinkAreaProps {
  traceLinks: ITraceLink[];
  repoName: string;
  repoId: string;
  type: "IMPLEMENT" | "REQUIREMENT";
  requirementDescription?: IRequirementDescription;
  implementation?: IImplement;
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
    const {
      traceLinks,
      repoName,
      type,
      repoId,
      requirementDescription,
      implementation
    } = props;
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.sendNewTraceLinkLoading
    );
    const dispatch = useDispatch();
    const styles = useStyles();

    const [newTraceLink, setNewTraceLink] = useState<Omit<
      ITraceLink,
      "_id"
    > | null>(null);

    const setTraceLinkByType = (value: string) => {
      if (type === "REQUIREMENT" && newTraceLink) {
        const { _id, ...others } = newTraceLink.implement;
        setNewTraceLink({
          ...newTraceLink,
          implement: {
            ...others,
            fullyQualifiedName: value
          } as IImplement
        });
      } else if (type === "IMPLEMENT" && newTraceLink) {
        const { _id, ...others } = newTraceLink.requirementDescription;
        setNewTraceLink({
          ...newTraceLink,
          requirementDescription: {
            ...others,
            name: value
          } as IRequirementDescription
        });
      }
    };

    const initTraceLinkByType = () => {
      if (type === "REQUIREMENT" && requirementDescription) {
        setNewTraceLink({
          requirementDescription: {
            ...requirementDescription
          },
          implement: {
            fullyQualifiedName: "",
            type: "CLASS"
          } as IImplement // ingore _id,
        });
      } else if (type === "IMPLEMENT" && implementation) {
        setNewTraceLink({
          requirementDescription: {
            name: "",
            lastUpdateAt: Date.now()
          } as IRequirementDescription,
          implement: { ...implementation }
        });
      }
    };

    const getValueByType = () => {
      if (type === "REQUIREMENT" && newTraceLink) {
        return newTraceLink.implement.fullyQualifiedName;
      } else if (type === "IMPLEMENT" && newTraceLink) {
        return newTraceLink.requirementDescription.name;
      }
    };

    const getAutoCompleteByTypes = () => {
      if (type === "REQUIREMENT") {
        return (
          <ImplementationAutoComplete
            onChange={setTraceLinkByType}
            value={getValueByType() as string}
            repoId={repoId}
          />
        );
      } else if (type === "IMPLEMENT") {
        return (
          <RequirementAutoComplete
            onChange={setTraceLinkByType}
            value={getValueByType() as string}
            repoName={repoName}
          />
        );
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
                  {getAutoCompleteByTypes()}
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
              traceLink={newTraceLink}
              showRequirement={type !== "REQUIREMENT"}
              showImplement={type !== "IMPLEMENT"}
            />
          </Spin>
        )}
        {traceLinks.map(link => (
          <SimpleTraceLinkCard
            showOperation
            key={link._id}
            traceLink={link}
            showRequirement={type !== "REQUIREMENT"}
            showImplement={type !== "IMPLEMENT"}
          />
        ))}
      </>
    );
  }
);
