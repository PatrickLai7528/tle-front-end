import { Button, Modal } from "antd";
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { ProductAndService } from "../../components/product-and-service";
import { UsingSteps } from "../../components/using-steps";
import bannerImg from "./banner2.jpg";
import SectionLayout from "./section-layout";
import { Layout } from "antd";
import { ConnectedAuth } from "../../components/auth";

export interface IStateProps {
  authModalVisible: boolean;
}

export interface IDispatchProps {
  toggle: () => void;
}

export interface IOwnProps {}

export interface INewHomeProps extends IStateProps, IDispatchProps, IOwnProps {}

const { Footer } = Layout;

const useStyles = createUseStyles({
  banner: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center"
  },
  header: {
    width: "100%",
    padding: "50px"
  },
  title: {
    fontSize: "56px",
    color: "white"
  },
  subTitle: {
    fontSize: "20px",
    color: "white"
  },
  startButton: {
    marginTop: "10px"
  },
  footer: {
    background: "#001529",
    textAlign: "center",
    color: "#999"
  }
});

const Home: FunctionComponent<INewHomeProps> = memo((props: INewHomeProps) => {
  const { toggle, authModalVisible } = props;
  const styles = useStyles();
  return (
    <>
      <Modal
        visible={authModalVisible}
        closable={false}
        footer={null}
        destroyOnClose
        onCancel={toggle}
      >
        <ConnectedAuth />
      </Modal>
      <Layout>
        <Layout.Content className={styles.banner}>
          <div className={styles.header}>
            <div className={styles.title}>Trace Link Evolver</div>
            <div className={styles.subTitle}>
              基於代碼重構檢測與信息檢索技術的軟件可追踪性維護工具
            </div>
            <Button
              className={styles.startButton}
              type={"primary"}
              onClick={toggle}
            >
              開始使用
            </Button>
          </div>
        </Layout.Content>
        <SectionLayout title={"產品及服務"} content={<ProductAndService />} />
        <SectionLayout title={"使用流程"} content={<UsingSteps />} />
        <Footer className={styles.footer}>TLE ©2020 Created by NJU</Footer>
      </Layout>
    </>
  );
});

export default Home;
