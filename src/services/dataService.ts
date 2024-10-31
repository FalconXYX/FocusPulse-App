import PresetService from "./presetService";
interface CurrentData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  timeIdleMax: number;
  streakProgress: number;
  currentStreakLength: number;
  currentStreakEnd: number;
  breakProgress: number;
  breakProgressMax: number;
  streakStart: number;
}
interface TodayData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  streaksStarted: number;
  dateStarted: number;
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
  streakStart: number;

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
    this.currentStreakEnd = new Date(data.currentStreakEnd);
    this.streakStart = data.streakStart;
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
  getStreakStart() {
    return this.streakStart;
  }
  startSession(preset: PresetService) {
    this.streakStart = Date.now();
    this.currentStreakLength = preset.getStreakLength();
    this.streakProgress = Date.now();
    this.breakProgressMax = preset.getBreakLength();
    this.breakProgress = 0;
    this.currentStreakEnd = new Date(Date.now() + this.currentStreakLength);
  }
  startBreak(preset: PresetService) {
    this.streakStart = Date.now();
    this.breakProgress = Date.now();
    this.breakProgressMax = preset.getBreakLength();
    this.currentStreakEnd = new Date(Date.now() + this.breakProgressMax);
  }
  endStreak() {
    this.streaksDone += 1;
    this.streakProgress = 0;
    this.currentStreakLength = 0;
  }
  endBreak() {
    this.breakProgress = 0;
    this.breakProgressMax = 0;
  }
  endSession() {
    this.streaksDone = 0;
    this.breaksTaken = 0;
    this.timesIdle = 0;
    this.timeActive = 0;
    this.streakProgress = 0;
    this.currentStreakLength = 0;
    this.breakProgress = 0;
    this.breakProgressMax = 0;
    this.currentStreakEnd = new Date();
  }
  incrementStreakTime(): boolean {
    this.timeActive += 1000;
    this.streakProgress += 1000;
    if (this.currentStreakEnd < new Date()) {
      console.log("Streak Complete", this.currentStreakEnd, new Date());
      return true;
    } else {
      return false;
    }
  }
  incrementBreakTime(): boolean {
    this.breakProgress = Date.now() + 1000;
    if (this.currentStreakEnd < new Date()) {
      console.log("Break Complete", this.currentStreakEnd, new Date());
      return true;
    } else {
      return false;
    }
  }
  newSession() {
    this.streaksDone = 0;
    this.breaksTaken = 0;
    this.timesIdle = 0;
    this.timeActive = 0;
    this.streakProgress = 0;
  }

  toJSON(): CurrentData {
    return {
      timeActive: this.timeActive,
      streaksDone: this.streaksDone,
      breaksTaken: this.breaksTaken,
      timesIdle: this.timesIdle,
      timeIdleMax: this.timeIdleMax,
      streakProgress: this.streakProgress,
      currentStreakLength: this.currentStreakLength,
      breakProgress: this.breakProgress,
      breakProgressMax: this.breakProgressMax,
      currentStreakEnd: this.currentStreakEnd.getTime(),
      streakStart: this.streakStart,
    };
  }
}
export class DayStreakData {
  dateStarted: Date;
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
    this.dateStarted = new Date(data.dateStarted);
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
  getStreaksStarted() {
    return this.streaksStarted;
  }
  getDateStarted() {
    return this.dateStarted;
  }
  startSession() {
    this.streaksStarted += 1;
  }
  finishStreak() {
    this.streaksDone += 1;
  }

  startBreak() {
    this.breaksTaken += 1;
  }
  incrementStreakTime(): boolean {
    this.timeActive += 1000;
    //check if the day is not the same as the one stored in this.dateStarted
    if (this.checkDay()) {
      console.log("Day has changed");
      return true;
    }
    return false;
  }
  endDay() {
    this.streaksDone = 0;
    this.breaksTaken = 0;
    this.timesIdle = 0;
    this.timeActive = 0;
    this.streaksStarted = 0;
    this.dateStarted = new Date();
  }
  checkDay(): boolean {
    if (this.dateStarted.getDate() !== new Date().getDate()) {
      return true;
    }
    return false;
  }
  toJSON(): TodayData {
    return {
      timeActive: this.timeActive,
      streaksDone: this.streaksDone,
      breaksTaken: this.breaksTaken,
      timesIdle: this.timesIdle,
      streaksStarted: this.streaksStarted,
      dateStarted: this.dateStarted.getDate(),
    };
  }
}
