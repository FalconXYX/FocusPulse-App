import SetupPreset from "./setup";
import PresetService from "./presetService";
import DataService from "./dataService";
import IdleService from "./idleService";
class Main {
  Preset1!: PresetService;
  Preset2!: PresetService;
  Preset3!: PresetService;
  Preset4!: PresetService;
  CurrentPreset!: PresetService;
  IdleCheck!: IdleService;
  currentData!: DataService;
  todayData!: DataService;
  constructor() {
    this.onInstalled();
    this.initializePresets();
    this.currentData = new DataService(0);
    this.todayData = new DataService(1);
    console.log("Main component loaded");
  }

  async initializePresets() {
    this.Preset1 = await this.getPreset(1);
    this.Preset2 = await this.getPreset(2);
    this.Preset3 = await this.getPreset(3);
    this.Preset4 = await this.getPreset(4);
    this.setCurrentPreset([
      this.Preset1,
      this.Preset2,
      this.Preset3,
      this.Preset4,
    ]);
  }
  setCurrentPreset = (
    presets: [PresetService, PresetService, PresetService, PresetService]
  ) => {
    this.CurrentPreset = presets[0];
    for (let i = 1; i < presets.length; i++) {
      if (presets[i].getisDefault()) {
        this.CurrentPreset = presets[i];
        break;
      }
    }
  };
  onInstalled = () => {
    chrome.runtime.onInstalled.addListener((details) => {
      SetupPreset(details.reason);
    });
  };
  getPreset = (preset: number): Promise<PresetService> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("preset" + preset, (result) => {
        if (chrome.runtime.lastError) {
          console.error("Error retrieving data:", chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          if (preset == 1) {
            resolve(new PresetService(result.preset1));
          }
          if (preset == 2) {
            resolve(new PresetService(result.preset2));
          }
          if (preset == 3) {
            resolve(new PresetService(result.preset3));
          }
          if (preset == 4) {
            resolve(new PresetService(result.preset4));
          }
        }
      });
    });
  };
  mainStart = () => {
    this.IdleCheck = new IdleService(this.CurrentPreset.leeway);
    window.addEventListener("mousemove", this.IdleCheck.resetIdle);
    window.addEventListener("keydown", this.IdleCheck.resetIdle);
    window.addEventListener("mousedown", this.IdleCheck.resetIdle);
    setInterval(() => {
      //TODO
    }, 1000);
  };
}
const Index = new Main();
export default Index;
