import { Card, Typography, Badge } from "antd";
import Meta from "antd/lib/card/Meta";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode
} from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { ProgramLanguage, colorByLanguage } from "../../utils/language-color";
import { IImportedRepository } from "../../types";

export interface IRepositoryCardProps {
  repo: IImportedRepository;
  style?: CSSProperties;
  detailLink: string;
  bodyStyle?: CSSProperties;
}

const RepositoryCard: FunctionComponent<IRepositoryCardProps> = memo(
  (props: IRepositoryCardProps) => {
    const { repo, style, bodyStyle, detailLink } = props;

    return (
      <Card
        bodyStyle={bodyStyle}
        type={"inner"}
        title={repo.name}
        style={style}
        extra={<Link to={detailLink}>詳情</Link>}
        size={"small"}
      >
        <Badge
          color={colorByLanguage(repo.language as ProgramLanguage)}
          text={repo.language || "無語言"}
        />
        <Meta
          description={
            <Typography.Paragraph>
              {repo.description || "無描述"}
            </Typography.Paragraph>
          }
        />
      </Card>
    );
  }
);

RepositoryCard.defaultProps = {
  style: {},
  bodyStyle: {}
};

export default RepositoryCard;
