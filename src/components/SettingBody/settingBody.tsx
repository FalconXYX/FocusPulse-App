import React, { useState, useEffect } from "react";
import {
  loadPreset,
  getCurrentPreset,
  changePreset,
  formatTime,
  modifyPreset,
} from "../../services/main";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PresetButtons from "../PresetButtons/presetButtons";
import styles from "./settingBody.module.css";
interface SettingBodyProps {}

const SettingBody: React.FC<SettingBodyProps> = () => {
  const [streakLength, setStreakLength] = useState<string>("");
  const [breakLength, setBreakLength] = useState<string>("");
  const [leeway, setLeeway] = useState<string>("");
  const [presetName, setPresetName] = useState<string>("");
  const [numberState, setNumberState] = useState<number>(1); // Initialize with a default preset number

  async function getPresetData(mode: string) {
    const currentPreset = await getCurrentPreset();
    const presetService = await loadPreset(currentPreset);
    if (presetService) {
      if (mode === "streakLength") {
        return formatTime(presetService.getStreakLength());
      }
      if (mode === "breakLength") {
        return formatTime(presetService.getBreakLength());
      }
      if (mode === "leeway") {
        return formatTime(presetService.getLeeway());
      }
      if (mode === "presetName") {
        return presetService.getPresetName();
      }
    } else {
      console.log("Preset not found.");
    }
  }

  useEffect(() => {
    async function fetchPreset() {
      const currentPreset = await getCurrentPreset();
      setNumberState(currentPreset); // Set the current preset number after loading

      const length = await getPresetData("streakLength");
      if (length !== undefined) {
        setStreakLength(length.toString());
      }

      const breakLength = await getPresetData("breakLength");
      if (breakLength !== undefined) {
        setBreakLength(breakLength.toString());
      }

      const leeway = await getPresetData("leeway");
      if (leeway !== undefined) {
        setLeeway(leeway.toString());
      }

      const presetName = await getPresetData("presetName");
      if (presetName !== undefined) {
        setPresetName(presetName.toString());
      }
    }

    fetchPreset();
  }, [numberState]); // Fetch new preset data when numberState changes
  async function resetValues(): Promise<void> {
    const length = await getPresetData("streakLength");
    if (length !== undefined) {
      setStreakLength(length.toString());
    }
    const breakLength = await getPresetData("breakLength");
    if (breakLength !== undefined) {
      setBreakLength(breakLength.toString());
    }
    const leeway = await getPresetData("leeway");
    if (leeway !== undefined) {
      setLeeway(leeway.toString());
    }
    const presetName = await getPresetData("presetName");
    if (presetName !== undefined) {
      setPresetName(presetName.toString());
    }
  }
  async function editPreset(): Promise<void> {
    const data = {
      name: presetName,
      streakLength: streakLength,
      breakLength: breakLength,
      leeway: leeway,
    };
    const recive = await modifyPreset(data);
    console.log(recive);
  }
  return (
    <section className={styles.body}>
      <div className={styles.headline}>Choose a Preset to edit:</div>
      <div className={styles.main}>
        <PresetButtons
          presetState={numberState}
          changeCurrentPreset={async (preset: number) => {
            await changePreset(preset); // Call the service to change the preset
            setNumberState(preset); // Update the local state to trigger re-render
          }}
        />
        <div className={styles.box}>
          <div className={styles.box_text}>
            To modify the {presetName || ""} preset, change the following
            settings:
          </div>
          <div className={styles.box_inputs}>
            <TextField
              required
              id="outlined-required"
              label="Streak Length"
              value={streakLength}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers and colons
                const regex = /^[0-9:]*$/;
                if (regex.test(value)) {
                  setStreakLength(value);
                }
              }}
              slotProps={{
                input: { inputProps: { pattern: "[0-9:]*" } },
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="Break Length"
              value={breakLength || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers and colons
                const regex = /^[0-9:]*$/;
                if (regex.test(value)) {
                  setBreakLength(value);
                }
              }}
              slotProps={{
                input: { inputProps: { pattern: "[0-9:]*" } },
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Leeway"
              value={leeway || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers and colons
                const regex = /^[0-9:]*$/;
                if (regex.test(value)) {
                  setLeeway(value);
                }
              }}
              slotProps={{
                input: { inputProps: { pattern: "[0-9:]*" } },
              }}
            />
          </div>
          <div className={styles.box_actions}>
            <Button
              variant="contained"
              size="small"
              onClick={() => resetValues()}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => editPreset()}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingBody;
