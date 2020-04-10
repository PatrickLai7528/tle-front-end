import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import StepImage from "./step.svg";
import { dataSource } from "../product-and-service/data-source";

export interface IUsingStepsProps {}

const useStyles = createUseStyles({
  usingSteps: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  box: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  boxTitle: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#314659",
    marginTop: "16px"
  },
  stepDescription: {
    opacity: 1,
    fontSize: "14px",
    lineHeight: "22px",
    color: "rgba(49,70,89,.65)",
    marginTop: "36px",
    textAlign: "left",
    transition: "opacity .45s cubic-bezier(.645,.045,.355,1)"
  }
});

const UsingSteps: FunctionComponent<IUsingStepsProps> = memo(
  (props: IUsingStepsProps) => {
    const styles = useStyles();
    return (
      <section className={styles.usingSteps}>
        {dataSource.map(data => {
          return (
            <div key={data.title} className={styles.box}>
              <img src={StepImage} alt={"step"} />
              <h1 className={styles.boxTitle}>{data.title}</h1>
              <div className={styles.stepDescription}>
                <span>{data.description} </span>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
);

export default UsingSteps;
