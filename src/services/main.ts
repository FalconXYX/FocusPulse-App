import PresetService from "./presetService";
// import DataService from "./dataService";
// import IdleService from "./idleService";
export async function loadPreset(presetNumber: number): Promise<PresetService> {
  const data = await chrome.storage.local.get(["preset" + presetNumber]);
  const presetData = data["preset" + presetNumber];
  return new PresetService(presetData);
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
export function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}
