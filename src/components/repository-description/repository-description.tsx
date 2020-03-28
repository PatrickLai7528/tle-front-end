import React, { FC, memo } from "react";
import { Typography } from "antd";

export interface IRepositoryDescriptionProps {
  description: string;
}

const RepositoryDescription: FC<IRepositoryDescriptionProps> = memo(
  (props: IRepositoryDescriptionProps) => {
    const { description } = props;
    return <Typography.Text code>{description}</Typography.Text>;
  }
);

export default RepositoryDescription;
