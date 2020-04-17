import React, { FunctionComponent, memo } from "react";
import { ITraceLink } from "../../types";
import { Card } from "antd";
import { createUseStyles } from "react-jss";

export interface ISimpleTraceLinkCardProps {
  traceLink: ITraceLink;
}

const bodyStyle = { padding: "8px 12px" };

const useStyle = createUseStyles({
  traceLinkCard: {
    margin: { top: "8px" },
    width: "100%"
  }
});

const SimpleTraceLinkCard: FunctionComponent<ISimpleTraceLinkCardProps> = memo(
  (props: ISimpleTraceLinkCardProps) => {
    const { traceLink } = props;
    const styles = useStyle();

    return (
      <Card
        key={traceLink.id}
        hoverable
        bodyStyle={bodyStyle}
        className={styles.traceLinkCard}
      >
        <Card.Meta
          title={`#${traceLink.id}`}
          description={traceLink.requirementDescription.text}
        />
      </Card>
    );
  }
);

export default SimpleTraceLinkCard;
