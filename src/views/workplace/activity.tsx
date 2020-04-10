import React, { memo, FC } from "react";
import { List, Avatar, Card } from "antd";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

export interface IActivityProps {
  activities: { avatarUrl: string; title: string; description: string }[];
}

const useStyles = createUseStyles({});

const Activity: FC<IActivityProps> = memo((props: IActivityProps) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { activities } = props;
  return (
    <Card title={t("activity")} bodyStyle={{ padding: "16px" }}>
      <List
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

export default Activity;
