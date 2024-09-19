// src/components/Header.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { getImageUrl } from "../../utils.ts";
import styles from "./header.module.css";
import { Fab } from "@mui/material";
interface CustomIconButtonProps {
  pageState: number;
}

const Header: React.FC<CustomIconButtonProps> = ({ pageState }) => {
  // eslint-disable-next-line prefer-const
  let buttonStates = [false, false, false];
  buttonStates[pageState] = true;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const handleClick2 = () => {
    navigate("/settings");
  };
  const handleClick3 = () => {
    navigate("/graph");
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
            disabled={false}
          >
            <PlayArrowIcon></PlayArrowIcon>
          </Fab>
          <Fab
            onClick={handleClick3}
            size="medium"
            color="primary"
            disabled={false}
          >
            <InsertChartIcon></InsertChartIcon>
          </Fab>
          <Fab
            onClick={handleClick2}
            size="medium"
            color="primary"
            disabled={false}
          >
            <SettingsIcon></SettingsIcon>
          </Fab>
        </div>
      </div>
    </section>
  );
};

export default Header;
