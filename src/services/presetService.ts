interface PresetData {
  button: number;
  leeway: number;
  presetName: string;
  breakLength: number;
  hasBreak: boolean;
  streakLength: number;
  isDefault: boolean;
}
const regex = /^[a-zA-Z0-9.,!?;:@\-_ ]+$/;

class PresetService {
  button: number;
  leeway: number;
  presetName: string;
  breakLength: number;
  hasBreak: boolean;
  streakLength: number;
  isDefault: boolean;

  constructor(data: PresetData) {
    this.button = data.button;
    this.leeway = data.leeway;
    this.presetName = data.presetName;
    this.breakLength = data.breakLength;
    this.hasBreak = data.hasBreak;
    this.streakLength = data.streakLength;
    this.isDefault = data.isDefault;
  }
  getLeeway = () => {
    return this.leeway;
  };
  getBreakLength = () => {
    return this.breakLength;
  };
  getHasBreak = () => {
    return this.hasBreak;
  };
  getStreakLength = () => {
    return this.streakLength;
  };
  getPresetName = () => {
    return this.presetName;
  };

  editLeeway = (leeway: number) => {
    if (leeway >= 60000 && leeway <= 600000) {
      this.leeway = leeway;
      return true;
    } else {
      return false;
    }
  };
  editBreakLength = (breakLength: number) => {
    if (breakLength >= 0 && breakLength <= 1200000) {
      this.breakLength = breakLength;
      if (breakLength === 0) {
        this.hasBreak = false;
      }
      return true;
    } else {
      return false;
    }
  };
  editStreakLength = (streakLength: number) => {
    if (streakLength >= 300000 && streakLength <= 7200000) {
      this.streakLength = streakLength;
      return true;
    } else {
      return false;
    }
  };
  editPresetName = (presetName: string) => {
    if (regex.test(presetName) && presetName.length <= 20) {
      this.presetName = presetName;
      return true;
    } else {
      return false;
    }
  };
  editIsDefault = (isDefault: boolean) => {
    this.isDefault = isDefault;
  };
  toJSON = () => {
    return {
      button: this.button,
      leeway: this.leeway,
      presetName: this.presetName,
      breakLength: this.breakLength,
      hasBreak: this.hasBreak,
      streakLength: this.streakLength,
      isDefault: this.isDefault,
    };
  };
}
export default PresetService;
