const presetFileName = [
  "preset1.json",
  "preset2.json",
  "preset3.json",
  "preset4.json",
];

export const SetupPreset = (reason: string) => {
  if (reason === "install") {
    for (let i = 0; i < presetFileName.length; i++) {
      fetch(chrome.runtime.getURL(presetFileName[i]))
        .then((response) => {
          response.json().then((data) => {
            if (data.isDefault) {
              chrome.storage.local.set({ ["defaultPreset"]: i + 1 }, () => {
                if (chrome.runtime.lastError) {
                  console.error(
                    "Error setting data:",
                    chrome.runtime.lastError
                  );
                } else {
                  console.log(
                    i + 1 + " is the default preset in chrome.storage.sync"
                  );
                }
              });
            }
            chrome.storage.local.set({ ["preset" + (i + 1)]: data }, () => {
              if (chrome.runtime.lastError) {
                console.error("Error setting data:", chrome.runtime.lastError);
              } else {
                console.log(
                  "Preset" +
                    (i + 1) +
                    " successfully saved in chrome.storage.sync"
                );
              }
            });
          });
        })
        .catch((error) => {
          console.error("Failed to load JSON file:", error);
        });
    }
  }
};
export const SetupData = (reason: string) => {
  if (reason === "install") {
    fetch(chrome.runtime.getURL("current.json"))
      .then((response) => {
        response.json().then((data) => {
          chrome.storage.local.set({ ["currentSession"]: data }, () => {
            if (chrome.runtime.lastError) {
              console.error("Error setting data:", chrome.runtime.lastError);
            } else {
              console.log(
                "Current Session successfully saved in chrome.storage.sync"
              );
            }
          });
        });
      })
      .catch((error) => {
        console.error("Failed to load JSON file:", error);
      });
    fetch(chrome.runtime.getURL("today.json"))
      .then((response) => {
        response.json().then((data) => {
          chrome.storage.local.set({ ["CurrentDaySession"]: data }, () => {
            if (chrome.runtime.lastError) {
              console.error("Error setting data:", chrome.runtime.lastError);
            } else {
              console.log(
                "Current Day Session successfully saved in chrome.storage.sync"
              );
            }
          });
        });
      })
      .catch((error) => {
        console.error("Failed to load JSON file:", error);
      });
  }
};
export const setupStatus = () => {
  chrome.storage.local.set({ ["status"]: "inactive" }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error setting data:", chrome.runtime.lastError);
    }
  });
};
