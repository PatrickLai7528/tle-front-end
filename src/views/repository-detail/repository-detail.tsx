import { Button, Descriptions, PageHeader } from "antd";
import React, { FunctionComponent, memo } from "react";
import { FileReader } from "../../components/file-reader";
import { repositories } from "../../stubs/repository";

export interface IRepositoryDetailProps {}

const RepositoryDetail: FunctionComponent<IRepositoryDetailProps> = memo(
  (props: IRepositoryDetailProps) => {
    const repo = repositories[0];
    return (
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={repo.name}
        subTitle={`Owned By ${repo.owner.login}`}
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
          <Descriptions.Item label="Effective Time">
            2017-10-10
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
        <FileReader repo={repo} />
      </PageHeader>
    );
  }
);

export default RepositoryDetail;
