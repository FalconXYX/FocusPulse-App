console.log("idle script loaded");

// window.addEventListener("mousemove", resetIdleTimer);
// window.addEventListener("keydown", resetIdleTimer);
// window.addEventListener("mousedown", resetIdleTimer);

// setInterval(8() => {
//   const currentTime: number = Date.now();
//   const idleTime: number = currentTime - lastActivityTime;

//   console.log(`Idle time: ${idleTime} ms`);

//   if (idleTime > 600000) {
//     console.log("Idle detected, sending message.");

//     chrome.runtime.sendMessage(
//       { type: "idle" },
//       (response: ChromeRuntimeMessage | undefined) => {
//         if (chrome.runtime.lastError) {
//           console.error("Error sending message:", chrome.runtime.lastError);
//         } else {
//           console.log("Message sent successfully:", response);
//         }
//       }
//     );
//   }
// }, 1000);

export class IdleService {
  timeIdle: number;
  idleStart: number;
  leeway: number;

  constructor(leewayInput: number) {
    this.timeIdle = 0;
    this.idleStart = Date.now();
    this.leeway = leewayInput;
  }

  checkIdle(): boolean {
    this.timeIdle = Date.now() - this.idleStart;
    return this.timeIdle > this.leeway;
  }

  changeLeway(newLeeway: number) {
    this.leeway = newLeeway;
  }

  resetIdle() {
    this.idleStart = Date.now();
    this.timeIdle = 0;
  }
}
