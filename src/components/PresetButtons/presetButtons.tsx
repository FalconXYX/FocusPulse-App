// src/components/Header.tsx
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import Fab from "@mui/material/Fab";
import React from "react";
import styles from "./presetButtons.module.css";
interface CustomIconButtonProps {
  presetState: number;
}
const PresetButtons: React.FC<CustomIconButtonProps> = ({ presetState }) => {
  let buttonStates = [false, false, false, false];
  buttonStates[presetState] = true;
  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.row}>
          <Fab size="small" color="primary">
            <HourglassEmptyIcon />
          </Fab>
          <Fab size="small" color="primary">
            <FilterVintageIcon />
          </Fab>
        </div>
        <div className={styles.row}>
          <Fab size="small" color="primary">
            <LanguageIcon />
          </Fab>
          <Fab size="small" color="secondary">
            <AccessTimeIcon />
          </Fab>
        </div>
      </div>
    </section>
  );
};

export default PresetButtons;
