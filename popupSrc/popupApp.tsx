import styles from "./popupApp.module.css";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import Button from "@mui/material/Button";

function popupApp() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.title}>Streak Completed</div>
        <FormatAlignLeftIcon />
        <div className={styles.content}>
          You completed a 56:00 streak you now have a 20:00 break.
          <Button size="small">Ok</Button>
        </div>
      </section>
    </>
  );
}

export default popupApp;
