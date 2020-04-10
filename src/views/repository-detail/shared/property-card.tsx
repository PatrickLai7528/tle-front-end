import React, { FunctionComponent, memo, ReactNode } from "react";
import { Card, Empty } from "antd";
import CardTitle, { ICardTitleProps } from "./card-title";
import { createUseStyles } from "react-jss";

export interface IPropertyCardProps {
  titleProps: ICardTitleProps;
  children?: ReactNode[] | ReactNode;
}

const useStyles = createUseStyles({
  contentCard: {
    background: "#eff1f3",
    borderRadius: "5px",
    width: "100%"
  }
});

const bodyStyle = {
  padding: "0px",
  width: "100%"
};

const PropertyCard: FunctionComponent<IPropertyCardProps> = memo(
  (props: IPropertyCardProps) => {
    const { titleProps, children } = props;
    const styles = useStyles();
    return (
      <Card
        bodyStyle={bodyStyle}
        className={styles.contentCard}
        title={<CardTitle {...titleProps} />}
      >
        {!!children ? children : <Empty />}
      </Card>
    );
  }
);

export default PropertyCard;
