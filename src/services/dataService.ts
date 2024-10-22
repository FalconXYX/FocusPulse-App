interface CurrentData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  timeIdleMax: number;
  streakProgress: number;
  streakProgressMax: number;
  breakProgress: number;
  breakProgressMax: number;
}
interface TodayData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  streakStarted: number;
}
export class CurrentStreakData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  timeIdleMax: number;
  streakProgress: number;
  streakProgressMax: number;
  breakProgress: number;
  breakProgressMax: number;
  constructor(data: CurrentData) {
    this.timeActive = data.timeActive;
    this.streaksDone = data.streaksDone;
    this.breaksTaken = data.breaksTaken;
    this.timesIdle = data.timesIdle;
    this.timeIdleMax = data.timeIdleMax;
    this.streakProgress = data.streakProgress;
    this.streakProgressMax = data.streakProgressMax;
    this.breakProgress = data.breakProgress;
    this.breakProgressMax = data.breakProgressMax;
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
  getStreakProgressMax() {
    return this.streakProgressMax;
  }
  getBreakProgress() {
    return this.breakProgress;
  }
  getBreakProgressMax() {
    return this.breakProgressMax;
  }
}
export class DayStreakData {
  timeActive: number;
  streaksDone: number;
  breaksTaken: number;
  timesIdle: number;
  streakStarted: number;
  constructor(data: TodayData) {
    this.timeActive = data.timeActive;
    this.streaksDone = data.streaksDone;
    this.breaksTaken = data.breaksTaken;
    this.timesIdle = data.timesIdle;
    this.streakStarted = data.streakStarted;
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
  getStreakStarted() {
    return this.streakStarted;
  }
}
