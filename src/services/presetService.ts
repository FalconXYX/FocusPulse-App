interface PresetData {
  button: 1 | 2 | 3 | 4;
  leeway: number;
  presetName: string;
  breakLength: number;
  hasBreak: boolean;
  streakLength: number;
}

export class PresetService {
  button: 1 | 2 | 3 | 4;
  leeway: number;
  presetName: string;
  breakLength: number;
  hasBreak: boolean;
  streakLength: number;

  constructor(data: PresetData) {
    this.button = data.button;
    this.leeway = data.leeway;
    this.presetName = data.presetName;
    this.breakLength = data.breakLength;
    this.hasBreak = data.hasBreak;
    this.streakLength = data.streakLength;
  }
}
