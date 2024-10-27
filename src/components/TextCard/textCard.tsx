import React from "react";
import styles from "./textCard.module.css";
import Button from "@mui/material/Button";
import { startPreset } from "../../services/main";
interface TextCardProps {
  streakLength: string;
  breakLength: string;
  leeway: string;
  presetName: string;
  statusStart: string;
}
const TextCard: React.FC<TextCardProps> = ({
  streakLength,
  breakLength,
  leeway,
  presetName,
  statusStart,
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.card_text}>
        <p>
          <strong>{presetName}: </strong> <br /> This preset encourages{" "}
          {streakLength} streaks followed by {breakLength} breaks. This preset
          has {leeway} leeway.
        </p>
        <div className={styles.button}>
          <Button variant="contained" size="small" onClick={startPreset}>
            {statusStart}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TextCard;
