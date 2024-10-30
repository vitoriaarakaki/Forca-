let minutes = 0;
let seconds = 0;
let intervalId;
let isRunning = false;

function updateTimeDisplay() {
  const timeDisplay = document.getElementById('time');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  timeDisplay.textContent = `Tempo: ${formattedMinutes}:${formattedSeconds}`;
}

function startStopWatch() {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateTimeDisplay();
    }, 1000); // 1 second = 1000ms
  }
}

function pauseStopWatch() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

function resetStopWatch() {
  stop();
  minutes = 0;
  seconds = 0;
  updateTimeDisplay();
}