// src/components/Header.tsx

import React from "react";
import styles from "./settingBody.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PresetButtons from "../PresetButtons/presetButtons";
interface SettingBodyProps {
  buttonState: number;
}

const SettingBody: React.FC<SettingBodyProps> = ({ buttonState }) => {
  return (
    <section className={styles.body}>
      <div className={styles.headline}>Chose a Preset to edit:</div>
      <div className={styles.main}>
        <PresetButtons presetState={buttonState}></PresetButtons>
        <div className={styles.box}>
          <div className={styles.box_text}>
            To modify the selected preset change the following settings:
          </div>
          <div className={styles.box_inputs}>
            <TextField
              required
              id="outlined-required"
              label="Streak Length"
              defaultValue="Hello World"
              helperText=""
            />
            <TextField
              required
              id="outlined-required"
              label="Break Length"
              defaultValue="Hello World"
              helperText=""
            />
            <TextField
              required
              id="outlined-required"
              label="Leeway"
              defaultValue="Hello World"
              helperText=""
            />
          </div>
          <div className={styles.box_actions}>
            <Button variant="contained" size="small">
              Reset
            </Button>
            <Button variant="contained" size="small">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingBody;
