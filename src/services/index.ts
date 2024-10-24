import { incrementSeconds } from "./main";
import { SetupPreset, SetupData, setupStatus } from "./setup";
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed with reason:", details.reason);
  SetupPreset(details.reason);
  SetupData(details.reason);
  setupStatus();
});

chrome.idle.setDetectionInterval(15); // Set idle time threshold to 15 seconds

// Listen for idle state changes
// Set the idle detection threshold to 240 seconds (4 minutes)

// Listen for idle state changes
chrome.idle.onStateChanged.addListener((newState) => {
  if (newState === "idle") {
    // Create a notification
    console.log("Idle detected");
    //chrome.action.openPopup();
  }
});
// Listen for changes in chrome.storage.local
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.status) {
    const newStatus = changes.status.newValue;
    if (newStatus === "active") {
      incrementSeconds();
    }
  }
});
