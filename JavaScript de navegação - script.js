const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("main section");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-section");

    // Ativar botão
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Mostrar seção
    sections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === target) {
        sec.classList.add("active");
      }
    });
  });
});

function updateClock() {
  let alarmTime = null;
let alarmTimeout = null;

function setAlarm() {
  const input = document.getElementById("alarm-time").value;
  if (!input) return alert("Por favor, selecione um horário para o alarme.");
  
  const now = new Date();
  const [hours, minutes] = input.split(":");
  const alarmDate = new Date();

  alarmDate.setHours(+hours, +minutes, 0, 0);
  if (alarmDate <= now) alarmDate.setDate(alarmDate.getDate() + 1); // Alarme para o dia seguinte se o horário já passou

  const timeToAlarm = alarmDate - now;
  alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
  alarmTime = input;

  document.getElementById("alarm-status").textContent = `Alarme definido para ${alarmTime}`;
}

function clearAlarm() {
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alarmTimeout = null;
    alarmTime = null;
    document.getElementById("alarm-status").textContent = "Alarme cancelado.";
  }
}

function triggerAlarm() {
  alert("⏰ Alarme disparado!");
  document.getElementById("alarm-status").textContent = "Alarme disparado!";
  alarmTime = null;
}

  const clock = document.getElementById("digital-clock");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // exibe imediatamente
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

function updateStopwatchDisplay() {
  const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, "0");
  const seconds = String(stopwatchTime % 60).padStart(2, "0");
  document.getElementById("stopwatch-display").textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatchDisplay();
    }, 1000);
  }
}

function pauseStopwatch() {
  if (stopwatchRunning) {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchTime = 0;
  updateStopwatchDisplay();
}
let timerInterval;
let timerTime = 0;
let timerRunning = false;

function updateTimerDisplay() {
  const minutes = String(Math.floor(timerTime / 60)).padStart(2, "0");
  const seconds = String(timerTime % 60).padStart(2, "0");
  document.getElementById("timer-display").textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (!timerRunning) {
    const inputMinutes = parseInt(document.getElementById("timer-minutes").value) || 0;
    const inputSeconds = parseInt(document.getElementById("timer-seconds").value) || 0;
    
    if (timerTime === 0) {
      timerTime = inputMinutes * 60 + inputSeconds;
    }

    if (timerTime > 0) {
      timerRunning = true;
      timerInterval = setInterval(() => {
        if (timerTime > 0) {
          timerTime--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          timerRunning = false;
          alert("⏰ Tempo esgotado!");
        }
      }, 1000);
    }
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerTime = 0;
  updateTimerDisplay();
}
