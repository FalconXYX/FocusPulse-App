import React from "react";
import { Fab } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./presetButtons.module.css";

interface CustomIconButtonProps {
  presetState: number;
  changeCurrentPreset: (preset: number) => void;
}

const PresetButtons: React.FC<CustomIconButtonProps> = ({
  presetState,
  changeCurrentPreset,
}) => {
  const buttonStates = [false, false, false, false];
  if (presetState >= 1 && presetState <= 4) {
    buttonStates[presetState - 1] = true; // Set the active button based on presetState
  }

  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.row}>
          <Fab
            size="small"
            color={buttonStates[0] ? "secondary" : "primary"}
            onClick={() => changeCurrentPreset(1)} // Change preset to 1
          >
            <HourglassEmptyIcon />
          </Fab>
          <Fab
            size="small"
            color={buttonStates[1] ? "secondary" : "primary"}
            onClick={() => changeCurrentPreset(2)} // Change preset to 2
          >
            <FilterVintageIcon />
          </Fab>
        </div>
        <div className={styles.row}>
          <Fab
            size="small"
            color={buttonStates[2] ? "secondary" : "primary"}
            onClick={() => changeCurrentPreset(3)} // Change preset to 3
          >
            <LanguageIcon />
          </Fab>
          <Fab
            size="small"
            color={buttonStates[3] ? "secondary" : "primary"}
            onClick={() => changeCurrentPreset(4)} // Change preset to 4
          >
            <AccessTimeIcon />
          </Fab>
        </div>
      </div>
    </section>
  );
};

export default PresetButtons;
