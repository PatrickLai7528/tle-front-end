import { Avatar, Card, List } from "antd";
import React, { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IUserActivity } from "../../types";

export interface IStateProps {
  activities: IUserActivity[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchUserActivities: () => void;
}

export interface IOwnProps {}

export interface IActivityProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const UserActivity: FC<IActivityProps> = memo((props: IActivityProps) => {
  const { t } = useTranslation();
  const { fetchUserActivities, activities, loading } = props;

  useEffect(() => {
    const doFetch = async () => {
      try {
        await fetchUserActivities();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.log(e);
        }
      }
    };
    doFetch();
  }, [fetchUserActivities]);

  return (
    <Card title={t("activity")} bodyStyle={{ padding: "16px" }}>
      <List
        pagination={{
          simple: true,
          pageSize: 5
        }}
        loading={loading}
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarUrl} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
});

export default UserActivity;
