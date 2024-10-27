import React, { useEffect, useState, useCallback } from "react";
import TextCard from "../TextCard/textCard";
import {
  changePreset,
  getCurrentPreset,
  loadCurrentData,
  loadTodayData,
  getStatus,
  loadPreset,
  formatTime,
} from "../../services/main";
import styles from "./mainBody.module.css";
import PresetButtons from "../PresetButtons/presetButtons";
import InfoDisplay from "../InfoDisplay/infoDisplay";
import NumberDisplay from "../NumberDisplay/numberDisplay";

interface MainBodyProps {}

const MainBody: React.FC<MainBodyProps> = () => {
  // State definitions
  const [state, setState] = useState({
    numberState: 1,
    streaksCurrentDone: 0,
    timeCurrentActive: 0,
    streakProgress: 0,
    currentStreakLength: 10,
    streaksTodayDone: 0,
    timeTodayActive: 0,
    breaksTodayTaken: 0,
    streaksStarted: 0,
    timeStamps: "",
    stat: "Inactive",
    currentBreakLength: 0,
    leeway: 0,
    presetName: "",
  });

  // Memoized update function to prevent unnecessary rerenders
  const updateState = useCallback(async () => {
    try {
      const currentPreset = await getCurrentPreset();
      const currentService = await loadPreset(currentPreset);
      const currentDataService = await loadCurrentData();
      const currentDayDataService = await loadTodayData();
      const status = await getStatus();

      const newState = {
        numberState: currentPreset,
        leeway: currentService.getLeeway(),
        presetName: currentService.getPresetName(),
        stat: status,
        streaksCurrentDone: currentDataService?.getStreaksDone() || 0,
        timeCurrentActive: currentDataService?.getTimeActive() || 0,
        streakProgress: currentDataService?.getStreakProgress() || 0,
        currentStreakLength: currentDataService?.getCurrentStreakLength() || 10,
        currentBreakLength: currentDataService?.getBreakProgressMax() || 0,
        timeStamps: currentDataService
          ? getTimeStamp(
              currentDataService.getStreakStart(),
              currentDataService.getStreakProgress()
            )
          : "",
        streaksTodayDone: currentDayDataService?.getStreaksDone() || 0,
        timeTodayActive: currentDayDataService?.getTimeActive() || 0,
        breaksTodayTaken: currentDayDataService?.getBreaksTaken() || 0,
        streaksStarted: currentDayDataService?.getStreaksStarted() || 0,
      };

      setState(newState);
    } catch (error) {
      console.error("Error updating state:", error);
    }
  }, []);

  // Set up Chrome storage listener
  useEffect(() => {
    const storageListener = () => {
      updateState();
    };

    // Add listener for both sync and local storage
    chrome.storage.onChanged.addListener(storageListener);

    // Initial data load
    updateState();

    // Cleanup listener on unmount
    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, [updateState]);

  // Auto-update timer for active states
  useEffect(() => {
    let intervalId: number | undefined = undefined;

    if (state.stat === "active" || state.stat === " break") {
      intervalId = window.setInterval(updateState, 1000);
    }

    return () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [state.stat, updateState, state.streakProgress]);

  // Helper functions
  const getTimeStamp = (start: number, progress: number): string => {
    const time = progress - start;
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  const getScore = (): number => {
    if (state.streaksStarted === 0) return 0;
    return Math.floor((state.streaksTodayDone / state.streaksStarted) * 100);
  };

  const getBarProgress = (): number => {
    if (state.stat === "active" || state.stat === " break") {
      return state.streakProgress / state.currentStreakLength;
    }
    return 0;
  };

  // Handle preset change
  const handlePresetChange = async (preset: number) => {
    if (state.stat !== "inactive") {
      alert("Cannot change preset while active.");
      return;
    }
    await changePreset(preset);
    await updateState();
  };

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <TextCard
          streakLength={formatTime(state.currentStreakLength)}
          breakLength={formatTime(state.currentBreakLength)}
          leeway={formatTime(state.leeway)}
          presetName={state.presetName}
          statusStart={state.stat !== "inactive" ? "Pause" : "Start"}
        />
        <PresetButtons
          presetState={state.numberState}
          changeCurrentPreset={handlePresetChange}
        />
      </div>
      <div className={styles.main}>
        <InfoDisplay
          shadowDirection="right"
          statusBar="Streak"
          streaksDone={state.streaksCurrentDone}
          minutesActive={Math.floor(state.timeCurrentActive / 60000)}
          barProgress1={getBarProgress()}
          stats={state.stat}
          timeStamp={state.timeStamps}
        />
        <NumberDisplay
          shadowDirection="right"
          streaksDone={state.streaksTodayDone}
          minutesActive={Math.floor(state.timeTodayActive / 60000)}
          breaksTaken={state.breaksTodayTaken}
          score={getScore()}
        />
      </div>
    </section>
  );
};

export default MainBody;
