const Setup = (reason: string) => {
  if (reason === "install") {
    console.log("Extension installed for the first time!");

    // Your setup code here
    chrome.storage.sync.set({ setupComplete: true }, () => {
      console.log("Setup completed.");
    });
  }
};
export default Setup;
