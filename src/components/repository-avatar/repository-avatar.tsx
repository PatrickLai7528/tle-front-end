import React, { FunctionComponent, memo, CSSProperties, useMemo } from "react";
import { ProgramLanguage, colorByLanguage } from "../../utils/language-color";
import { Avatar } from "antd";

export interface IRepositoryAvartarProps {
  repositoryName: string;
  language: ProgramLanguage;
  size?: number | "large" | "small" | "default";
}

const RepositoryAvatar: FunctionComponent<IRepositoryAvartarProps> = memo(
  (props: IRepositoryAvartarProps) => {
    const { repositoryName, language, size } = props;

    const style: CSSProperties = useMemo(() => {
      return {
        backgroundColor: colorByLanguage(language)
      };
    }, [language]);

    return (
      <Avatar size={size} style={style}>
        {(repositoryName[0] as string).toUpperCase()}
      </Avatar>
    );
  }
);

RepositoryAvatar.defaultProps = { size: "default" };

export default RepositoryAvatar;
