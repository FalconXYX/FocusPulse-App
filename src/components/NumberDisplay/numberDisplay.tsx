import React from "react";
import styles from "./numberDisplay.module.css";
interface MyComponentProps {
  shadowDirection: "right" | "left";
  streaksDone: number;
  minutesActive: number;
  breaksTaken: number;
  timedle: number;
}
const NumberDisplay: React.FC<MyComponentProps> = ({
  shadowDirection,
  streaksDone,
  minutesActive,
  breaksTaken,
  timedle,
}) => {
  const boxShadowClass =
    shadowDirection === "right" ? styles.rightShadow : styles.leftShadow;
  return (
    <section className={`${styles.card} ${boxShadowClass}`}>
      <div className={styles.header}>Today</div>
      <div className={styles.number_section}>
        <div className={styles.number_card}>
          <div className={styles.number_container}>
            <div className={styles.streak_number}>{streaksDone}</div>
          </div>

          <div className={styles.streak_text}>Streaks Completed</div>
        </div>
        <div className={styles.number_card}>
          <div className={styles.number_container}>
            <div className={styles.minute_number}>{minutesActive}</div>
          </div>
          <div className={styles.minute_text}>Minutes Active</div>
        </div>
      </div>
      <div className={styles.number_section}>
        <div className={styles.number_card}>
          <div className={styles.number_container}>
            <div className={styles.minute_number}>{timedle}</div>
          </div>

          <div className={styles.minute_text}>Time Distracted</div>
        </div>
        <div className={styles.number_card}>
          <div className={styles.number_container}>
            <div className={styles.streak_number}>{breaksTaken}</div>
          </div>
          <div className={styles.minute_text}>Breaks Taken</div>
        </div>
      </div>
    </section>
  );
};

export default NumberDisplay;
