import SetupPreset from "./setup";

chrome.runtime.onInstalled.addListener((details) => {
  SetupPreset(details.reason);
});
