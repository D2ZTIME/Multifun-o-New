// Relógio
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR');
  const date = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  document.getElementById('clock').textContent = time;
  document.getElementById('date').textContent = date;

  checkAlarm(time);
}
setInterval(updateClock, 1000);
updateClock();

// Navegação entre seções
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const sectionToShow = btn.getAttribute('data-section') + '-section';
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.remove('active');
    });
    document.getElementById(sectionToShow).classList.add('active');
  });
});

// === ALARME ===
let alarmTime = null;

document.getElementById('set-alarm').addEventListener('click', () => {
  alarmTime = document.getElementById('alarm-time').value;
  alert(`Alarme ajustado para ${alarmTime}`);
});

function checkAlarm(currentTime) {
  if (alarmTime && currentTime === alarmTime + ":00") {
    alert("⏰ Alarme disparado!");
    alarmTime = null;
  }
}

// === CRONÔMETRO ===
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatchDisplay() {
  const minutes = String(Math.floor(stopwatchTime / 60)).padStart(2, '0');
  const seconds = String(stopwatchTime % 60).padStart(2, '0');
  document.getElementById('stopwatch-display').textContent = `${minutes}:${seconds}`;
}

document.getElementById('start-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatchDisplay();
  }, 1000);
});

document.getElementById('pause-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatchDisplay();
});

// === POMODORO ===
let pomodoroInterval;
let pomodoroTime = 25 * 60;

function updatePomodoroDisplay() {
  const minutes = String(Math.floor(pomodoroTime / 60)).padStart(2, '0');
  const seconds = String(pomodoroTime % 60).padStart(2, '0');
  document.getElementById('pomodoro-display').textContent = `${minutes}:${seconds}`;
}

document.getElementById('start-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  pomodoroInterval = setInterval(() => {
    pomodoroTime--;
    updatePomodoroDisplay();
    if (pomodoroTime === 0) {
      clearInterval(pomodoroInterval);
      alert("Pomodoro concluído! Faça uma pausa.");
    }
  }, 1000);
});

document.getElementById('reset-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
});
