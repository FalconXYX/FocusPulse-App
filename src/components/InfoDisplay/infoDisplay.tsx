import React, { useEffect } from "react";
import styles from "./infoDisplay.module.css";
import ProgressBar from "../ProgressBar/progressBar.tsx";

interface MyComponentProps {
  shadowDirection: "right" | "left";
  statusBar: "Streak" | "Break";
  streaksDone: number;
  minutesActive: number;
  barProgress1: number;
  stats: string;
  timeStamp: string;
}

const InfoDisplay: React.FC<MyComponentProps> = ({
  shadowDirection,
  statusBar,
  streaksDone,
  minutesActive,
  barProgress1,
  stats,
  timeStamp,
}) => {
  const boxShadowClass =
    shadowDirection === "right" ? styles.rightShadow : styles.leftShadow;

  useEffect(() => {}, [barProgress1]);

  return (
    <section className={`${styles.card} ${boxShadowClass}`}>
      <div className={styles.header}>Current Session</div>
      <div className={styles.status}>
        <div className={styles.status_text}>{stats}</div>
      </div>
      <div className={styles.bars}>
        <ProgressBar
          progress={100 - barProgress1} // pass the prop directly
          name={`${statusBar} Progress`}
          time={timeStamp}
        />
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
