import PresetService from "./presetService";
import { CurrentStreakData, DayStreakData } from "./dataService";
//import IdleService from "./idleService";
export interface modifyData {
  name: string;
  streakLength: string;
  breakLength: string;
  leeway: string;
}
export async function loadPreset(presetNumber: number): Promise<PresetService> {
  const data = await chrome.storage.local.get(["preset" + presetNumber]);
  const presetData = data["preset" + presetNumber];
  return new PresetService(presetData);
}
export async function loadCurrentData(): Promise<CurrentStreakData> {
  const data = await chrome.storage.local.get(["currentSession"]);
  return new CurrentStreakData(data["currentSession"]);
}
export async function loadTodayData(): Promise<DayStreakData> {
  const data = await chrome.storage.local.get(["CurrentDaySession"]);
  return new DayStreakData(data["CurrentDaySession"]);
}
export async function getCurrentPreset(): Promise<number> {
  const data = await chrome.storage.local.get(["defaultPreset"]);

  return data["defaultPreset"];
}
//changes the current preset number to the one inputed
export async function changePreset(preset: number): Promise<void> {
  chrome.storage.local.set({ defaultPreset: preset }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error setting data:", chrome.runtime.lastError);
    } else {
      console.log("Preset changed to " + preset);
    }
  });
}
export async function modifyPreset(
  data: modifyData
): Promise<boolean | string> {
  const currentPreset = await getCurrentPreset();
  const presetService = await loadPreset(currentPreset);
  if (isInTimeFormat(data.leeway)) {
    const newLeeway = parseTime(data.leeway);
    if (!presetService.editLeeway(newLeeway)) {
      return "Leeway Invalid!";
    }
  } else {
    return "Leeway Invalid";
  }
  if (isInTimeFormat(data.breakLength)) {
    const newBreakLength = parseTime(data.breakLength);
    if (!presetService.editBreakLength(newBreakLength)) {
      return "Break Length Invalid!";
    }
    const newLeeway = parseTime(data.leeway);
    if (newBreakLength < newLeeway) {
      return "Break Length must be greater than Leeway!";
    }
  } else {
    return "Break Length Invalid";
  }

  if (isInTimeFormat(data.streakLength)) {
    const newStreakLength = parseTime(data.streakLength);
    if (!presetService.editStreakLength(newStreakLength)) {
      return "Streak Length Invalid!";
    }
    const newBreakLength = parseTime(data.breakLength);
    if (newStreakLength < newBreakLength) {
      return "Streak Length must be greater than Break Length!";
    }
  } else {
    return "Streak Length Invalid";
  }

  chrome.storage.local.set(
    { ["preset" + currentPreset]: presetService.toJSON() },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error setting data:", chrome.runtime.lastError);
        return false;
      }
    }
  );
  return true;
}
export function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}
function parseTime(time: string): number {
  const timeArray = time.split(":");
  if (timeArray.length === 2) {
    const minutes = parseInt(timeArray[0]);
    const seconds = parseInt(timeArray[1]);
    return minutes * 60000 + seconds * 1000;
  } else {
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[1]);
    const seconds = parseInt(timeArray[2]);
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  }
}
function isInTimeFormat(timestamp: string): boolean {
  const regexMMSS = /^\d{2}:\d{2}$/;
  const regexHMMSS = /^\d{1}:\d{2}:\d{2}$/;
  console.log(regexMMSS.test(timestamp), regexHMMSS.test(timestamp));
  return regexMMSS.test(timestamp) || regexHMMSS.test(timestamp);
}
