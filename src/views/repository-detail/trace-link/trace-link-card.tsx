import { Button, List } from "antd";
import moment from "moment";
import React, { FunctionComponent, memo } from "react";
import { ITraceLinkMatrix, ITraceLink } from "../../../types";
import PropertyCard from "../../../components/property-card/property-card";
import { createUseStyles } from "react-jss";

export interface ITraceLinkCardProps {
  matrix: ITraceLinkMatrix;
  onDetailClick: (traceLink: ITraceLink) => void;
}

const useStyles = createUseStyles({
  list: {},
  listItem: {
    background: "#fff",
    margin: "8px",
    padding: "8px"
  }
});

const TraceLinkCard: FunctionComponent<ITraceLinkCardProps> = memo(
  (props: ITraceLinkCardProps) => {
    const styles = useStyles();
    const { matrix, onDetailClick } = props;
    return (
      <PropertyCard titleProps={{ itemNumber: 1, text: "text" }}>
        <List
          className={styles.list}
          dataSource={matrix.links || []}
          renderItem={link => (
            <List.Item
              className={styles.listItem}
              actions={[
                <Button
                  size="small"
                  type={"primary"}
                  onClick={() => onDetailClick(link)}
                >
                  詳情
                </Button>
              ]}
            >
              <List.Item.Meta
                title={`#${link._id}`}
                description={link.requirementDescription.name}
              />
            </List.Item>
          )}
        />
      </PropertyCard>
    );
  }
);

export default TraceLinkCard;
