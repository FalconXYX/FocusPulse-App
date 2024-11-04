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

const MainBody: React.FC = () => {
  const [state, setState] = useState({
    numberState: 1,
    streaksCurrentDone: 0,
    timeCurrentActive: 0,
    streakProgress: 100,
    breakProgress: 100,
    currentStreakLength: 10,
    streakEnd: 10,
    streaksTodayDone: 0,
    timeTodayActive: 0,
    breaksTodayTaken: 0,
    streaksStarted: 0,
    timeStamps: "",
    stat: "Inactive",
    currentBreakLength: 0,
    leeway: 0,
    presetName: "", // Holds the preset name for display
  });

  const [lastActivePreset, setLastActivePreset] = useState({
    streakLength: 0,
    breakLength: 0,
  });

  const updateState = useCallback(async () => {
    try {
      const currentPreset = await getCurrentPreset();
      const currentService = await loadPreset(currentPreset);
      const currentDataService = await loadCurrentData();
      const currentDayDataService = await loadTodayData();
      const status = await getStatus();

      if (status === "inactive") {
        setLastActivePreset({
          streakLength: currentService.getStreakLength(),
          breakLength: currentService.getBreakLength(),
        });
      }

      let timeStamps;
      if (status === "active") {
        timeStamps = getTimeStamp(
          currentDataService.getStreakStart(),
          currentDataService.getStreakProgress()
        );
      } else if (status === "break") {
        timeStamps = getTimeStamp(
          currentDataService?.getStreakStart(),
          currentDataService?.getBreakProgress()
        );
      }

      const newState = {
        numberState: currentPreset,
        leeway: currentService.getLeeway(),
        presetName: currentService.getPresetName(),
        stat: status,
        streaksCurrentDone: currentDataService?.getStreaksDone() || 0,
        timeCurrentActive: currentDataService?.getTimeActive() || 0,
        streakProgress: currentDataService?.getStreakProgress() || 0,
        breakProgress: currentDataService?.getBreakProgress() || 0,
        currentStreakLength:
          status === "inactive"
            ? lastActivePreset.streakLength || currentService.getStreakLength()
            : currentService.getStreakLength(),
        currentBreakLength:
          status === "inactive"
            ? lastActivePreset.breakLength || currentService.getBreakLength()
            : currentService.getBreakLength(),
        streaksTodayDone: currentDayDataService?.getStreaksDone() || 0,
        timeTodayActive: currentDayDataService?.getTimeActive() || 0,
        breaksTodayTaken: currentDayDataService?.getBreaksTaken() || 0,
        streaksStarted: currentDayDataService?.getStreaksStarted() || 0,
        streakEnd: currentDataService?.getCurrentStreakEnd().getTime() || 10,
        timeStamps: timeStamps || "",
      };

      setState(newState);
    } catch (error) {
      console.error("Error updating state:", error);
    }
  }, [state.stat, lastActivePreset]);

  useEffect(() => {
    const storageListener = () => {
      updateState();
    };

    chrome.storage.onChanged.addListener(storageListener);
    updateState();

    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, [updateState]);

  useEffect(() => {
    let intervalId: number | undefined = undefined;

    if (state.stat === "active" || state.stat === "break") {
      intervalId = window.setInterval(updateState, 1000);
    }

    return () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [state.stat, updateState]);

  const getTimeStamp = (start: number, progress: number): string => {
    const time = progress - start;

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    if (hours < 0 || minutes < 0 || seconds < 0) {
      return "00:00";
    }
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
    if (state.stat === "active") {
      return (
        ((state.streakEnd - state.streakProgress) / state.currentStreakLength) *
        100
      );
    }
    if (state.stat === "break") {
      return (
        ((state.streakEnd - state.breakProgress) / state.currentBreakLength) *
        100
      );
    }
    return 0;
  };

  const handlePresetChange = async (preset: number) => {
    if (state.stat !== "inactive") {
      alert("Cannot change preset while active.");
      return;
    }

    await changePreset(preset);
    await updateState(); // Immediately update state after preset change
  };

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <TextCard
          streakLength={formatTime(state.currentStreakLength)}
          breakLength={formatTime(state.currentBreakLength)}
          leeway={formatTime(state.leeway)}
          presetName={state.presetName} // Display updated preset name
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
