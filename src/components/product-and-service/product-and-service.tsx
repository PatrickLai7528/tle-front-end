import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import ProductServiceImage1 from "./product-service-1.png";

export interface IProductAndServiceProps {}

const useStyles = createUseStyles({
  productServiceContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around"
  },
  productServiceContentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  productServiceContentBoxTitle: {
    fontSize: "24px"
  }
});

const ProductAndService: FunctionComponent<IProductAndServiceProps> = memo(
  (props: IProductAndServiceProps) => {
    const styles = useStyles();
    return (
      <section className={styles.productServiceContent}>
        <div className={styles.productServiceContentBox}>
          <img
            width={"100px"}
            height={"100px"}
            src={ProductServiceImage1}
            alt={"product service 1"}
          />
          <h1 className={styles.productServiceContentBoxTitle}>產品及服務一</h1>
          <span>產品及服務一描述</span>
        </div>
        <div className={styles.productServiceContentBox}>
          <img
            width={"100px"}
            height={"100px"}
            src={ProductServiceImage1}
            alt={"product service 1"}
          />
          <h1 className={styles.productServiceContentBoxTitle}>產品及服務一</h1>
          <span>產品及服務一描述</span>
        </div>
        <div className={styles.productServiceContentBox}>
          <img
            width={"100px"}
            height={"100px"}
            src={ProductServiceImage1}
            alt={"product service 1"}
          />
          <h1 className={styles.productServiceContentBoxTitle}>產品及服務一</h1>
          <span>產品及服務一描述</span>
        </div>
      </section>
    );
  }
);

export default ProductAndService;
