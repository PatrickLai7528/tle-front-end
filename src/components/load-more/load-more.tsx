import React, { FunctionComponent, memo } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export interface ILoadMoreProps {
  onLoadMore: () => void;
}

const LoadMore: FunctionComponent<ILoadMoreProps> = memo(
  (props: ILoadMoreProps) => {
    const { t } = useTranslation();
    const { onLoadMore } = props;
    return (
      <div
        style={{
          textAlign: "center",
          margin: 10,
          height: 32,
          lineHeight: "32px"
        }}
      >
        <Button onClick={onLoadMore}>{t("load more")}</Button>
      </div>
    );
  }
);

export default LoadMore;
