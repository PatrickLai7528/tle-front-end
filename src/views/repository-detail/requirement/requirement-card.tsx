import React, { FunctionComponent, memo } from "react";
import { Button, Popconfirm, Tag } from "antd";
import { List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IRequirement, IRequirementDescription } from "../../../types";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import PropertyCard from "../../../components/property-card/property-card";
import moment from "moment";

export interface IRequirementCardProps {
  requirement: IRequirement;
  loading: boolean;
  onDetailClick: (description: IRequirementDescription) => void;
  onDeleteClick: (description: IRequirementDescription) => void;
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
    const {
      requirement,
      onDetailClick,
      toggleAddRequirementModal,
      onDeleteClick,
      loading
    } = props;
    const { t } = useTranslation();
    const styles = useStyles();
    return (
      <PropertyCard
        titleProps={{
          actions: [
            <PlusOutlined
              key={"addRequirement"}
              onClick={toggleAddRequirementModal}
            />
          ],
          text: t("requirement"),
          itemNumber: requirement.descriptions.length || 0
        }}
      >
        <List
          className={styles.list}
          loading={loading}
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
                </Button>,
                <Popconfirm
                  title="確認刪除？"
                  onConfirm={() => onDeleteClick(desc)}
                  okText="確認"
                  cancelText="取消"
                >
                  <Button size="small" type="danger">
                    刪除
                  </Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    {desc.name}
                    {!desc.traced ? (
                      <Tag style={{ marginLeft: "1rem" }} color="error">
                        未追踪
                      </Tag>
                    ) : null}
                  </>
                }
                description={`Update at ${moment(desc.lastUpdateAt).fromNow()}`}
              />
            </List.Item>
          )}
        />
      </PropertyCard>
    );
  }
);

export default RequirementCard;
