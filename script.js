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
const menuButtons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.section');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
    document.querySelector('.menu-btn.active').classList.remove('active');
    button.classList.add('active');

    sections.forEach(section => section.classList.remove('active'));
    const sectionId = button.dataset.section + '-section';// Relógio
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
const menuButtons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.section');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
    document.querySelector('.menu-btn.active').classList.remove('active');
    button.classList.add('active');

    sections.forEach(section => section.classList.remove('active'));
    const sectionId = button.dataset.section + '-section'; menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Clicou em:', button.dataset.section); // <-- Adicione isso aqui
document.getElementById(sectionId).classList.add('active');

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

document.getElementById(sectionId).classList.add('active');

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
