import PresetService from "./presetService";
interface CurrentData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  timeIdleMax: number;
  streakProgress: number;
  currentStreakLength: number;
  currentStreakEnd: Date;
  breakProgress: number;
  breakProgressMax: number;
}
interface TodayData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  streaksStarted: number;
}
export class CurrentStreakData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  timeIdleMax: number;
  streakProgress: number;
  currentStreakLength: number;
  breakProgress: number;
  breakProgressMax: number;
  currentStreakEnd: Date;

  constructor(data: CurrentData) {
    this.timeActive = data.timeActive;
    this.streaksDone = data.streaksDone;
    this.breaksTaken = data.breaksTaken;
    this.timesIdle = data.timesIdle;
    this.timeIdleMax = data.timeIdleMax;
    this.streakProgress = data.streakProgress;
    this.currentStreakLength = data.currentStreakLength;
    this.breakProgress = data.breakProgress;
    this.breakProgressMax = data.breakProgressMax;
    this.currentStreakEnd = data.currentStreakEnd;
  }
  getTimeActive() {
    return this.timeActive;
  }
  getStreaksDone() {
    return this.streaksDone;
  }
  getBreaksTaken() {
    return this.breaksTaken;
  }
  getTimesIdle() {
    return this.timesIdle;
  }
  getTimeIdleMax() {
    return this.timeIdleMax;
  }
  getStreakProgress() {
    return this.streakProgress;
  }
  getCurrentStreakLength() {
    return this.currentStreakLength;
  }
  getBreakProgress() {
    return this.breakProgress;
  }
  getBreakProgressMax() {
    return this.breakProgressMax;
  }
  getCurrentStreakEnd() {
    return this.currentStreakEnd;
  }
  startSession(preset: PresetService) {
    this.currentStreakLength = preset.getStreakLength();
    this.streakProgress = Date.now();
    this.breakProgressMax = preset.getBreakLength();
    this.breakProgress = 0;
    this.currentStreakEnd = new Date(Date.now() + this.currentStreakLength);
  }
}
export class DayStreakData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  streaksStarted: number;
  constructor(data: TodayData) {
    this.timeActive = data.timeActive;
    this.streaksDone = data.streaksDone;
    this.breaksTaken = data.breaksTaken;
    this.timesIdle = data.timesIdle;
    this.streaksStarted = data.streaksStarted;
  }
  getTimeActive() {
    return this.timeActive;
  }
  getStreaksDone() {
    return this.streaksDone;
  }
  getBreaksTaken() {
    return this.breaksTaken;
  }
  getTimesIdle() {
    return this.timesIdle;
  }
  getstreaksStarted() {
    return this.streaksStarted;
  }
  startSession() {
    this.streaksStarted += 1;
  }
}
