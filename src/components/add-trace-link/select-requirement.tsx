import { Button, Card, Select, Spin } from "antd";
import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { newTraceLink as sendNewTraceLink } from "../../store/trace-link/actions";
import { CustomTheme } from "../../theme";
import { IRequirementDescription, ITraceLink, IImplement } from "../../types";

export interface ISelectRequirementProps {
  descriptions: IRequirementDescription[];
  fullyQualifiedName: string;
  repoName: string;
}

const bodyStyle = { padding: "8px 12px" };

const useStyle = createUseStyles<CustomTheme>(theme => ({
  traceLinkCard: {
    margin: { top: "8px" },
    width: "100%"
  },
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
  },
  select: {
    width: "100%"
  }
}));

export const SelectRequirement: React.FunctionComponent<ISelectRequirementProps> = React.memo(
  (props: ISelectRequirementProps) => {
    const dispatch = useDispatch();
    const theme = useTheme() as CustomTheme;
    const styles = useStyle({ theme });
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.sendNewTraceLinkLoading
    );

    const { descriptions, repoName, fullyQualifiedName } = props;

    const [
      description,
      setDescription
    ] = React.useState<IRequirementDescription | null>(null);

    const [showInput, setShowInput] = React.useState<boolean>(false);

    const handleButtonClick = () => setShowInput(prev => !prev);

    const handleSelectChange = (descriptionId: string) => {
      let selected: IRequirementDescription | undefined;
      for (const description of descriptions) {
        if (descriptionId.toString() === description._id.toString()) {
          selected = description;
        }
      }
      setDescription({ ...(selected as IRequirementDescription) });
    };

    const cardStyle = React.useMemo(() => {
      return {
        borderLeftColor: theme.confirmColor,
        borderLeftWidth: "8px"
      };
    }, [theme]);

    const toTraceLink = (
      description: IRequirementDescription
    ): Omit<ITraceLink, "_id"> => {
      return {
        requirementDescription: description,
        implement: {
          fullyQualifiedName: fullyQualifiedName,
          type: "CLASS"
        } as IImplement // ingore _id,
      };
    };

    const handleConfirmButtonClick = async () => {
      if (description) {
        await dispatch(
          sendNewTraceLink(repoName, toTraceLink(description), "FILE")
        );
        setShowInput(false);
      }
    };

    return (
      <>
        <Button block type={"primary"} onClick={handleButtonClick}>
          增加追踪線索
        </Button>
        {showInput && (
          <Spin spinning={loading}>
            <Card
              hoverable
              style={cardStyle}
              bodyStyle={bodyStyle}
              className={styles.traceLinkCard}
            >
              <Card.Meta
                title={"暫無ID"}
                description={
                  <div>
                    <div className={styles.link}>
                      <Select
                        className={styles.select}
                        value={description?.name}
                        onChange={handleSelectChange}
                      >
                        {descriptions.map((description, index) => {
                          return (
                            <Select.Option
                              key={description._id || index}
                              value={description._id}
                            >
                              {description.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                      <div className={styles.buttons}>
                        <Button
                          onClick={handleConfirmButtonClick}
                          className={styles.button}
                          type="primary"
                        >
                          確認
                        </Button>
                        <Button
                          onClick={() => setShowInput(false)}
                          className={styles.button}
                          type="danger"
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Spin>
        )}
      </>
    );
  }
);
