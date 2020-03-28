import React, { FC, memo } from "react";
import { Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
export interface IImportProcessStepProps {
  currentStep: number;
  done: boolean;
}

const ImportProcessStep: FC<IImportProcessStepProps> = memo(
  (props: IImportProcessStepProps) => {
    const { currentStep, done } = props;
    const { t } = useTranslation();
    return (
      <Steps current={done ? 4 : currentStep}>
        <Steps.Step
          title={t("branch")}
          icon={currentStep === 0 && !done ? <LoadingOutlined /> : null}
        />
        <Steps.Step
          title={t("commit")}
          icon={currentStep === 1 && !done ? <LoadingOutlined /> : null}
        />
        <Steps.Step
          title={t("file structure")}
          icon={currentStep === 2 && !done ? <LoadingOutlined /> : null}
        />
        <Steps.Step
          title={t("file content")}
          icon={currentStep === 3 && !done ? <LoadingOutlined /> : null}
        />
      </Steps>
    );
  }
);

export default ImportProcessStep;
