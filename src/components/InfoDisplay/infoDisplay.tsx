import React from "react";
import styles from "./infoDisplay.module.css";
import ProgressBar from "../ProgressBar/progressBar.tsx";
interface MyComponentProps {
  shadowDirection: "right" | "left";
  statusBar: "Streak" | "Break";
  streaksDone: number;
  minutesActive: number;
}
const InfoDisplay: React.FC<MyComponentProps> = ({
  shadowDirection,
  statusBar,
  streaksDone,
  minutesActive,
}) => {
  const boxShadowClass =
    shadowDirection === "right" ? styles.rightShadow : styles.leftShadow;
  return (
    <section className={`${styles.card} ${boxShadowClass}`}>
      <div className={styles.header}>Current Session</div>
      <div className={styles.bars}>
        <ProgressBar
          progress={70}
          name={`${statusBar} Progress`}
          time="00:00:12"
        />
        <ProgressBar progress={25} name={"Current Time Idle"} time="00:00:12" />
      </div>
      <div className={styles.number_section}>
        <div className={styles.number_card}>
          <div className={styles.streak_number_container}>
            <div className={styles.streak_number}>{streaksDone}</div>
          </div>

          <div className={styles.streak_text}>Streaks Completed</div>
        </div>
        <div className={styles.number_card}>
          <div className={styles.streak_number_container}>
            <div className={styles.minute_number}>{minutesActive}</div>
          </div>
          <div className={styles.minute_text}>Minutes Active</div>
        </div>
      </div>
    </section>
  );
};

export default InfoDisplay;
