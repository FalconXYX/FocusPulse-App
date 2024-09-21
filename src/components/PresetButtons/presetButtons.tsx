import React from "react";
import { Fab } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./presetButtons.module.css"; // Adjust this path

interface CustomIconButtonProps {
  presetState: number;
}

const PresetButtons: React.FC<CustomIconButtonProps> = ({ presetState }) => {
  const buttonStates = [false, false, false, false];
  buttonStates[presetState - 1] = true; // Set the active button based on presetState

  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.row}>
          <Fab
            size="small"
            color={buttonStates[0] ? "secondary" : "primary"} // Set color based on state
          >
            <HourglassEmptyIcon />
          </Fab>
          <Fab size="small" color={buttonStates[1] ? "secondary" : "primary"}>
            <FilterVintageIcon />
          </Fab>
        </div>
        <div className={styles.row}>
          <Fab size="small" color={buttonStates[2] ? "secondary" : "primary"}>
            <LanguageIcon />
          </Fab>
          <Fab size="small" color={buttonStates[3] ? "secondary" : "primary"}>
            <AccessTimeIcon />
          </Fab>
        </div>
      </div>
    </section>
  );
};

export default PresetButtons;
