import SetupPreset from "./setup";

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed with reason:", details.reason);
  SetupPreset(details.reason);
});
