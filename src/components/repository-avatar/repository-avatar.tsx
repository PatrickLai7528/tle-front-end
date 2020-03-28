import React, { FunctionComponent, memo, CSSProperties, useMemo } from "react";
import { ProgramLanguage, colorByLanguage } from "../../utils/language-color";
import { Avatar } from "antd";

export interface IRepositoryAvartarProps {
  repositoryName: string;
  language: ProgramLanguage;
}

const RepositoryAvatar: FunctionComponent<IRepositoryAvartarProps> = memo(
  (props: IRepositoryAvartarProps) => {
    const { repositoryName, language } = props;

    const style: CSSProperties = useMemo(() => {
      return {
        backgroundColor: colorByLanguage(language)
      };
    }, [language]);

    return (
      <Avatar style={style}>
        {(repositoryName[0] as string).toUpperCase()}
      </Avatar>
    );
  }
);

export default RepositoryAvatar;
