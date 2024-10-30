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
  const day = new DayStreakData(data["CurrentDaySession"]);
  if (day.checkDay()) {
    day.endDay();
  }
  return day;
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
  return regexMMSS.test(timestamp) || regexHMMSS.test(timestamp);
}
export async function getStatus() {
  const data = await chrome.storage.local.get(["status"]);
  return data["status"];
}
export async function saveCurrentData(currentData: CurrentStreakData) {
  chrome.storage.local.set({ currentSession: currentData.toJSON() }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error setting data:", chrome.runtime.lastError);
    }
  });
}
export async function saveTodayData(todayData: DayStreakData) {
  chrome.storage.local.set({ CurrentDaySession: todayData.toJSON() }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error setting data:", chrome.runtime.lastError);
    }
  });
}

//
export async function startPreset(mode: string) {
  console.log(mode);
  if (mode === "Start") {
    const currentPreset = await getCurrentPreset();
    const presetService = await loadPreset(currentPreset);
    const currentData = await loadCurrentData();
    const todayData = await loadTodayData();
    currentData.startSession(presetService);
    todayData.startSession();
    chrome.storage.local.set({ ["status"]: "active" }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error setting data:", chrome.runtime.lastError);
      } else {
        console.log("Status successfully modified");
      }
    });
    saveCurrentData(currentData);
    saveTodayData(todayData);
  }
  if (mode === "Pause") {
    const currentData = await loadCurrentData();
    const todayData = await loadTodayData();
    currentData.endSession();
    chrome.storage.local.set({ ["status"]: "inactive" }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error setting data:", chrome.runtime.lastError);
      } else {
        console.log("Status successfully modified");
      }
    });
    saveCurrentData(currentData);
    saveTodayData(todayData);
  }
}
export async function startBreak() {
  const currentPreset = await getCurrentPreset();
  const presetService = await loadPreset(currentPreset);
  const currentData = await loadCurrentData();
  const todayData = await loadTodayData();
  currentData.startBreak(presetService);
  todayData.startBreak();

  saveCurrentData(currentData);
  saveTodayData(todayData);
}
export async function incrementSeconds() {
  const currentData = await loadCurrentData();
  const todayData = await loadTodayData();
  //const preset = await loadPreset(await getCurrentPreset());
  console.log(todayData.toJSON());
  const intervalID = setInterval(() => {
    if (currentData.incrementStreakTime()) {
      todayData.finishStreak();
      chrome.storage.local.set({ ["status"]: "break" }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error setting data:", chrome.runtime.lastError);
        } else {
          console.log("Status successfully modified");
        }
      });
      clearInterval(intervalID);
    }
    if (todayData.incrementStreakTime()) {
      todayData.endDay();
    }
    chrome.storage.onChanged.addListener(async (changes, area) => {
      if (area === "local" && changes.status) {
        const newStatus = changes.status.newValue;

        if (newStatus === "inactive") {
          clearInterval(intervalID);
        }
      }
    });
    console.log("Incremented time");
    saveTodayData(todayData);
    saveCurrentData(currentData);
  }, 1000);
}
export async function createPopup(type: string) {
  if (type === "break") {
    chrome.windows.create({
      url: "break.html",
      type: "popup",
      width: 300,
      height: 300,
    });
  }
  if (type === "streak") {
    chrome.windows.create({
      url: "streak.html",
      type: "popup",
      width: 300,
      height: 300,
    });
  }
  if (type === "end") {
    chrome.windows.create({
      url: "end.html",
      type: "popup",
      width: 300,
      height: 300,
    });
  }
}
export async function endSession() {
  console.log("Session ended");
  const currentData = await loadCurrentData();
  const todayData = await loadTodayData();
  currentData.endSession();
  saveTodayData(todayData);
  saveCurrentData(currentData);
}
