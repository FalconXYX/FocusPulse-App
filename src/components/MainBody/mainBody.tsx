// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import TextCard from "../TextCard/textCard.tsx";
import {
  changePreset,
  getCurrentPreset,
  loadCurrentData,
  loadTodayData,
  startPreset,
} from "../../services/main.ts";
import styles from "./mainBody.module.css";
import PresetButtons from "../PresetButtons/presetButtons.tsx";
import InfoDisplay from "../InfoDisplay/infoDisplay";
import NumberDisplay from "../NumberDisplay/numberDisplay";

interface MainBodyProps {}

const MainBody: React.FC<MainBodyProps> = () => {
  const [numberState, setNumberState] = useState<number>(1); // Initialize with a default preset number
  // Initialize the state variables for the current session
  const [streaksCurrentDone, setStreaksCurrentDone] = useState<number>(0);
  const [timeCurrentActive, setTimeCurrentActive] = useState<number>(0);
  const [streakProgress, setStreakProgress] = useState<number>(0);
  const [streakProgressMax, setStreakProgressMax] = useState<number>(10);
  // Initialize the state variables for the current day
  const [streaksTodayDone, setStreaksTodayDone] = useState<number>(0);
  const [timeTodayActive, setTimeTodayActive] = useState<number>(0);
  const [breaksTodayTaken, setBreaksTodayTaken] = useState<number>(0);
  const [streaksStarted, setStreaksStarted] = useState<number>(0);

  useEffect(() => {
    async function fetchPreset() {
      const currentPreset = await getCurrentPreset();
      setNumberState(currentPreset); // Set the current preset number after loading
    }
    async function fetchData() {
      const currentDataService = await loadCurrentData();
      const currentDayDataService = await loadTodayData();
      if (currentDataService) {
        setStreaksCurrentDone(currentDataService.getStreaksDone());
        setTimeCurrentActive(currentDataService.getTimeActive());
        setStreakProgress(currentDataService.getStreakProgress());
        setStreakProgressMax(currentDataService.getStreakProgressMax());
      }
      if (currentDayDataService) {
        setStreaksTodayDone(currentDayDataService.getStreaksDone());
        setTimeTodayActive(currentDayDataService.getTimeActive());
        setBreaksTodayTaken(currentDayDataService.getBreaksTaken());
        setStreaksStarted(currentDayDataService.getStreakStarted());
      }
    }

    fetchPreset();
    fetchData();
  }, [numberState]); // Fetch new preset data when numberState changes
  function getScore(): number {
    if (streaksStarted === 0) return 0;
    return Math.floor((streaksTodayDone / streaksStarted) * 100);
  }
  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <TextCard start={startPreset()} />
        <PresetButtons
          presetState={numberState}
          changeCurrentPreset={async (preset: number) => {
            await changePreset(preset); // Call the service to change the preset
            setNumberState(preset); // Update the local state to trigger re-render
          }}
        />
      </div>
      <div className={styles.main}>
        <InfoDisplay
          shadowDirection="right"
          statusBar="Streak"
          streaksDone={streaksCurrentDone}
          minutesActive={Math.floor(timeCurrentActive / 60000)}
          barProgress1={Math.floor((streakProgress / streakProgressMax) * 100)}
          status="Inactive"
        />
        <NumberDisplay
          shadowDirection="right"
          streaksDone={streaksTodayDone}
          minutesActive={Math.floor(timeTodayActive / 60000)}
          breaksTaken={breaksTodayTaken}
          score={getScore()}
        />
      </div>
    </section>
  );
};

export default MainBody;
