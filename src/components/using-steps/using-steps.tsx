import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import StepImage from "./step.svg";

export interface IUsingStepsProps {}

const useStyles = createUseStyles({
  // "@keyframes slideInUp": {
  // 	from: {
  // 		transform: "translate3d(0, 100%, 0)",
  // 		visibility: "visible"
  // 	},
  // 	to: {
  // 		transform: "translate3d(0, 0, 0)"
  // 	}
  // },
  usingSteps: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  box: {
    // animationName: "$slideInUp",
    // animationDuration: "5s",
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
        <div key="box1" className={styles.box}>
          <img src={StepImage} alt={"step"} />
          <h1 className={styles.boxTitle}>需求沟通</h1>
          <div className={styles.stepDescription}>
            <span>
              沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩
            </span>
          </div>
        </div>
        <div key="box2" className={styles.box}>
          <img src={StepImage} alt={"step"} />
          <h1 className={styles.boxTitle}>需求沟通</h1>
          <div className={styles.stepDescription}>
            <span>
              沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩
            </span>
          </div>
        </div>
        <div key="box3" className={styles.box}>
          <img src={StepImage} alt={"step"} />
          <h1 className={styles.boxTitle}>需求沟通</h1>
          <div className={styles.stepDescription}>
            <span>
              沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩
            </span>
          </div>
        </div>
      </section>
    );
  }
);

export default UsingSteps;
