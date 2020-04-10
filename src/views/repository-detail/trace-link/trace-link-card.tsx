import React, { FunctionComponent, memo } from "react";
import PropertyCard from "../shared/property-card";

export interface ITraceLinkCardProps {}

const TraceLinkCard: FunctionComponent<ITraceLinkCardProps> = memo(
  (props: ITraceLinkCardProps) => {
    return (
      <PropertyCard titleProps={{ itemNumber: 1, text: "text" }}>
        {null}
      </PropertyCard>
    );
  }
);

export default TraceLinkCard;
