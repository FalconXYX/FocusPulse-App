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
  const [numberState, setNumberState] = useState<number>(1);
  const [helperText, setHelperText] = useState<string>("");
  const [helperText2, setHelperText2] = useState<string>("");
  const [helperText3, setHelperText3] = useState<string>("");
  const [isFocused1, setIsFocused1] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);
  const [isFocused3, setIsFocused3] = useState<boolean>(false);

  async function getPresetData(mode: string) {
    const currentPreset = await getCurrentPreset();
    const presetService = await loadPreset(currentPreset);
    if (presetService) {
      if (mode === "streakLength")
        return formatTime(presetService.getStreakLength());
      if (mode === "breakLength")
        return formatTime(presetService.getBreakLength());
      if (mode === "leeway") return formatTime(presetService.getLeeway());
      if (mode === "presetName") return presetService.getPresetName();
    } else {
      console.log("Preset not found.");
    }
  }

  useEffect(() => {
    async function fetchPreset() {
      const currentPreset = await getCurrentPreset();
      setNumberState(currentPreset);

      const length = await getPresetData("streakLength");
      if (length !== undefined) setStreakLength(length.toString());

      const breakLength = await getPresetData("breakLength");
      if (breakLength !== undefined) setBreakLength(breakLength.toString());

      const leeway = await getPresetData("leeway");
      if (leeway !== undefined) setLeeway(leeway.toString());

      const presetName = await getPresetData("presetName");
      if (presetName !== undefined) setPresetName(presetName.toString());
    }

    fetchPreset();
  }, [numberState]);

  async function resetValues(): Promise<void> {
    const length = await getPresetData("streakLength");
    if (length !== undefined) setStreakLength(length.toString());

    const breakLength = await getPresetData("breakLength");
    if (breakLength !== undefined) setBreakLength(breakLength.toString());

    const leeway = await getPresetData("leeway");
    if (leeway !== undefined) setLeeway(leeway.toString());

    const presetName = await getPresetData("presetName");
    if (presetName !== undefined) setPresetName(presetName.toString());
  }

  async function editPreset(): Promise<void> {
    const data = {
      name: presetName,
      streakLength: streakLength,
      breakLength: breakLength,
      leeway: leeway,
    };
    const recive = await modifyPreset(data);
    if (recive === true) {
      alert("Preset edited successfully");
    } else {
      alert(recive);
      if (recive != false && recive[0] === "L") {
        alert(recive);
      }
      if (recive != false && recive[0] === "B") {
        alert(recive);
      }
      if (recive != false && recive[0] === "S") {
        alert(recive);
      }
    }
  }

  return (
    <section className={styles.body}>
      <div className={styles.headline}>Choose a Preset to edit:</div>
      <div className={styles.main}>
        <PresetButtons
          presetState={numberState}
          changeCurrentPreset={async (preset: number) => {
            await changePreset(preset);
            setNumberState(preset);
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
                const regex = /^[0-9:]*$/;
                if (regex.test(value)) {
                  setStreakLength(value);
                  setHelperText2("");
                } else {
                  setHelperText2("Only numbers are allowed.");
                }
                if (value.length != 5 && value.length != 7) {
                  setHelperText2("must be in format mm:ss or h:mm:ss");
                }
                if (
                  (value.length === 5 && parseInt(value[0], 10) > 5) ||
                  parseInt(value[3], 10) > 5
                ) {
                  setHelperText2("must be in format mm:ss");
                }
                if (
                  (value.length === 7 && parseInt(value[2], 10) > 5) ||
                  parseInt(value[5], 10) > 5
                ) {
                  setHelperText2("must be in format h:mm:ss");
                }
              }}
              onFocus={() => setIsFocused1(true)}
              onBlur={() => setIsFocused1(false)}
              helperText={isFocused1 && helperText2 ? helperText2 : ""}
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
                const regex = /^[0-9:]*$/;

                if (regex.test(value)) {
                  setBreakLength(value);
                  setHelperText("");
                } else {
                  setHelperText("Only numbers are allowed.");
                }
                if (value.length != 5) {
                  setHelperText("must be in format mm:ss");
                } else if (
                  parseInt(value[0], 10) > 5 ||
                  parseInt(value[3], 10) > 5
                ) {
                  setHelperText("must be in format mm:ss");
                }
              }}
              onFocus={() => setIsFocused2(true)}
              onBlur={() => setIsFocused2(false)}
              helperText={isFocused2 && helperText ? helperText : ""}
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
                const regex = /^[0-9:]*$/;

                if (regex.test(value)) {
                  setLeeway(value);
                  setHelperText3("");
                } else {
                  setHelperText3("Only numbers are allowed.");
                }
                if (value.length != 5) {
                  setHelperText3("must be in format mm:ss");
                } else if (
                  parseInt(value[0], 10) > 5 ||
                  parseInt(value[3], 10) > 5
                ) {
                  setHelperText3("must be in format mm:ss");
                }
              }}
              onFocus={() => setIsFocused3(true)}
              onBlur={() => setIsFocused3(false)}
              helperText={isFocused3 && helperText3 ? helperText3 : ""}
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
