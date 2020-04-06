import React, { FunctionComponent, memo } from "react";
import { ProgramLanguage, colorByLanguage } from "../../utils/language-color";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";

export interface IStateProps {}

export interface IDispatchProps {}

export interface IOwnProps {
  language: ProgramLanguage;
}

export interface ILanguageBadgeProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const LanguageBadge: FunctionComponent<ILanguageBadgeProps> = memo(
  (props: ILanguageBadgeProps) => {
    const { t } = useTranslation();
    const { language } = props;
    return (
      <Badge
        color={colorByLanguage(language)}
        text={language ? language : t("unknown program language")}
      />
    );
  }
);

export default LanguageBadge;
