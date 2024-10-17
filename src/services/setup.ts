const filename = [
  "preset1.json",
  "preset2.json",
  "preset3.json",
  "preset4.json",
];
const SetupPreset = (reason: string) => {
  if (reason === "install") {
    for (let i = 0; i < filename.length; i++) {
      fetch(chrome.runtime.getURL(filename[i]))
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
export default SetupPreset;
