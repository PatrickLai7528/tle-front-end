import React, { FunctionComponent, memo } from "react";
import { Button } from "antd";
import { List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IRequirement, IRequirementDescription } from "../../../types";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import PropertyCard from "../shared/property-card";
import moment from "moment";

export interface IRequirementCardProps {
  requirement: IRequirement;
  onDetailClick: (description: IRequirementDescription) => void;
  toggleAddRequirementModal: () => void;
}

const useStyles = createUseStyles({
  list: {},
  listItem: {
    background: "#fff",
    margin: "8px",
    padding: "8px"
  }
});

const RequirementCard: FunctionComponent<IRequirementCardProps> = memo(
  (props: IRequirementCardProps) => {
    const { requirement, onDetailClick, toggleAddRequirementModal } = props;
    const { t } = useTranslation();
    const styles = useStyles();
    return (
      <PropertyCard
        titleProps={{
          actions: [<PlusOutlined onClick={toggleAddRequirementModal} />],
          text: t("requirement"),
          itemNumber: requirement.descriptions.length || 0
        }}
      >
        <List
          className={styles.list}
          dataSource={requirement.descriptions || []}
          renderItem={desc => (
            <List.Item
              className={styles.listItem}
              actions={[
                <Button
                  size="small"
                  type={"primary"}
                  onClick={() => onDetailClick(desc)}
                >
                  詳情
                </Button>
              ]}
            >
              <List.Item.Meta
                title={desc.text}
                description={`Update by commit #${
                  desc.lastUpdateCommit
                } at ${moment(desc.lastUpdateAt).fromNow()}`}
              />
            </List.Item>
          )}
        />
      </PropertyCard>
    );
  }
);

export default RequirementCard;
