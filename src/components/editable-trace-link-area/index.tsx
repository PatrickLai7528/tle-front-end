import { Button, Spin } from "antd";
import React, { FunctionComponent, memo, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { newTraceLink as sendNewTraceLink } from "../../store/trace-link/actions";
import { IImplement, IRequirementDescription, ITraceLink } from "../../types";
import { ImplementationSelect } from "../select/implementation";
import { RequirementAutoComplete } from "../select/requirement";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface IEditableTraceLinkAreaProps {
  repoName: string;
  repoId: string;
  type: "IMPLEMENT" | "REQUIREMENT";
  requirementDescription?: IRequirementDescription;
  fullyQualifiedFileName?: string;
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
      repoName,
      type,
      repoId,
      requirementDescription,
      fullyQualifiedFileName
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
      } else if (type === "IMPLEMENT" && fullyQualifiedFileName) {
        setNewTraceLink({
          requirementDescription: {
            name: "",
            lastUpdateAt: Date.now()
          } as IRequirementDescription,
          implement: {
            fullyQualifiedName: fullyQualifiedFileName,
            type: "CLASS"
          } as IImplement // ignore _id,
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
          <ImplementationSelect
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
                            sendNewTraceLink(
                              repoName,
                              newTraceLink,
                              type === "IMPLEMENT" ? "FILE" : "REQUIREMENT"
                            )
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
      </>
    );
  }
);
