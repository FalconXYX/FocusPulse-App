import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { getImageUrl } from "../../utils.ts";
import styles from "./header.module.css";
import { Fab } from "@mui/material";

interface CustomIconButtonProps {}

const Header: React.FC<CustomIconButtonProps> = () => {
  const [buttonStates, setButtonStates] = useState([true, false, false]);
  const navigate = useNavigate();

  const handleClick = () => {
    setButtonStates([true, false, false]);
    navigate("/");
  };

  const handleClick2 = () => {
    setButtonStates([false, true, false]);
    navigate("/graph");
  };

  const handleClick3 = () => {
    setButtonStates([false, false, true]);
    navigate("/settings");
  };

  return (
    <section className={styles.container} id="about">
      <div className={styles.content}>
        <img src={getImageUrl("Logo.png")} alt="" className={styles.logo} />
        <div className={styles.title}>
          <h1>FocusPulse</h1>
        </div>
        <div className={styles.buttons}>
          <Fab
            onClick={handleClick}
            size="medium"
            color="primary"
            disabled={buttonStates[0]} // Disables button based on state
          >
            <PlayArrowIcon />
          </Fab>
          <Fab
            onClick={handleClick2}
            size="medium"
            color="primary"
            disabled={buttonStates[1]} // Disables button based on state
          >
            <InsertChartIcon />
          </Fab>
          <Fab
            onClick={handleClick3}
            size="medium"
            color="primary"
            disabled={buttonStates[2]} // Disables button based on state
          >
            <SettingsIcon />
          </Fab>
        </div>
      </div>
    </section>
  );
};

export default Header;
