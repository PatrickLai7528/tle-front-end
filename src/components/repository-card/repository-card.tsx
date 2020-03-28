import { Card, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React, {
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode
} from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export interface IRepositoryCardProps {
  width?: number | string;
  repo: any;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  customActions?: () => ReactNode[] | null;
}

//@ts-ignore
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const RepositoryCard: FunctionComponent<IRepositoryCardProps> = memo(
  (props: IRepositoryCardProps) => {
    const { repo, style, bodyStyle, width } = props;

    return (
      <Card
        type={"inner"}
        title={repo.full_name}
        style={style}
        extra={<Link to={"repository_detail"}>詳情</Link>}
        size={"small"}
      >
        {/* <Badge */}
        {/* color={colorByLanguage(repo.language as ProgramLanguage)} */}
        {/* text={repo.language || "無語言"} */}
        {/* /> */}
        <Meta
          description={
            <Typography.Paragraph>
              {repo.description || "無描述"}
            </Typography.Paragraph>
          }
        />
      </Card>
      // <Card
      // 	className={"repository-card"}
      // 	bodyStyle={{
      // 		padding: 0,
      // 		...bodyStyle
      // 	}}
      // 	style={{ ...style, width }}
      // >
      // 	<div className={"repository-card-content"}>
      // 		<svg
      // 			className={"repository-card-file-svg"}
      // 			viewBox="0 0 12 16"
      // 			version="1.1"
      // 			width="12"
      // 			height="16"
      // 		>
      // 			<path
      // 				fill-rule="evenodd"
      // 				d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
      // 			></path>
      // 		</svg>
      // 		{/* <a href={"#"} style={{ textDecoration: "none" }}>
      // 			{repo.name}
      // 		</a> */}
      // 		<Link to={"repository_detail"}>{repo.name}</Link>
      // 	</div>
      // 	<p className={"repository-card-description"}>{repo.description}</p>
      // 	<p className={"repository-card-language"}>
      // 		<span className={"wrap"}>
      // 			<span
      // 				className={"colored"}
      // 				style={{
      // 					backgroundColor: repo.language
      // 						? colorByLanguage(repo.language as ProgramLanguage)
      // 						: "white"
      // 				}}
      // 			/>
      // 			<span className={"text"}>{repo.language}</span>
      // 		</span>
      // 	</p>
      // </Card>
    );
  }
);

RepositoryCard.defaultProps = {
  width: 400,
  style: {},
  bodyStyle: {},
  customActions: () => null
};

export default RepositoryCard;
