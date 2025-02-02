import { getImageUrl } from "../utils";
import {
  incrementSeconds,
  endSession,
  loadPreset,
  getCurrentPreset,
  createPopup,
  getStatus,
  incrementBreakTime,
} from "./main";
import { SetupPreset, SetupData, setupStatus } from "./setup";
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("Extension installed with reason:", details.reason);
  SetupPreset(details.reason);
  await SetupData(details.reason);
  setupStatus();
});

// Set idle time threshold to 15 seconds

// Listen for idle state changes
// Set the idle detection threshold to 240 seconds (4 minutes)

// Listen for idle state changes
chrome.idle.onStateChanged.addListener(async (newState) => {
  if (newState === "idle" && (await getStatus()) === "active") {
    chrome.storage.local.set({ ["status"]: "inactive" }, () => {
      createPopup("idle");
      endSession();
    });
  }
});
// Listen for changes in chrome.storage.local
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === "local" && changes.status) {
    const newStatus = changes.status.newValue;
    if (newStatus === "active") {
      playNotificationSound("Session started", "Your Session has started");
      incrementSeconds();
      const currentPreset = await loadPreset(await getCurrentPreset());
      chrome.idle.setDetectionInterval(currentPreset.getLeeway() / 1000);
    }
    if (newStatus === "break") {
      playNotificationSound(
        "Break started",
        "You have finished a streak, Take A break"
      );
      incrementBreakTime();
    }
    if (newStatus === "inactive") {
      console.log("Session ended");
    }
  }
});

function playNotificationSound(title: string, message: string) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: getImageUrl("Logo.png"), // Replace with your icon file
    title: title,
    message: message,
  });
}
