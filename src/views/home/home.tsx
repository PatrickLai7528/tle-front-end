import { Button, Modal } from "antd";
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { ProductAndService } from "../../components/product-and-service";
import { UsingSteps } from "../../components/using-steps";
import bannerImg from "./asset/banner.jpg";
import SectionLayout from "./section-layout";
import { Layout } from "antd";
import { ConnectedAuth } from "../../components/auth";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              {t(
                "software traceability maintenance tool based on code refactoring detection and information retrieval technology"
              )}
            </div>
            <Button
              className={styles.startButton}
              type={"primary"}
              onClick={toggle}
            >
              {t("start using")}
            </Button>
          </div>
        </Layout.Content>
        <SectionLayout
          title={t("product and service")}
          content={<ProductAndService />}
        />
        <SectionLayout title={t("using steps")} content={<UsingSteps />} />
        <Footer className={styles.footer}>TLE ©2020 Created by NJU</Footer>
      </Layout>
    </>
  );
});

export default Home;
