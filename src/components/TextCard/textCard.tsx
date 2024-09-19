import React from "react";
import styles from "./textCard.module.css";
import Button from "@mui/material/Button";

const TextCard: React.FC = () => {
  return (
    <section className={styles.card}>
      <div className={styles.card_text}>
        <p>
          <strong>Preset Name: </strong> <br /> This preset encourages X minute
          streaks followed by X minute breaks. This preset has X leeway.
        </p>
        <div className={styles.button}>
          <Button variant="contained" size="small">
            Start
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TextCard;
