// ===== RELÓGIO =====
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

// ===== NAVEGAÇÃO =====
const menuButtons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.section');

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.menu-btn.active').classList.remove('active');
    button.classList.add('active');

    sections.forEach(section => section.classList.remove('active'));
    const sectionId = button.dataset.section + '-section';
    document.getElementById(sectionId).classList.add('active');
  });
});

// ===== ALARME =====
let alarms = [];
const alarmSound = document.getElementById('alarm-sound');

document.getElementById('set-alarm').addEventListener('click', () => {
  const alarmTime = document.getElementById('alarm-time').value;
  if (alarmTime) {
    alarms.push(alarmTime);
    updateAlarmList();
    alert(`Alarme definido para ${alarmTime}`);
  }
});

function updateAlarmList() {
  const alarmList = document.getElementById('alarm-list');
  alarmList.innerHTML = alarms.map(alarm => `
    <div class="alarm-item">
      ${alarm}
      <button class="delete-alarm" data-time="${alarm}">×</button>
    </div>
  `).join('');

  document.querySelectorAll('.delete-alarm').forEach(btn => {
    btn.addEventListener('click', (e) => {
      alarms = alarms.filter(a => a !== e.target.dataset.time);
      updateAlarmList();
    });
  });
}

function checkAlarm(currentTime) {
  const current = currentTime.slice(0, 5); // Formato HH:MM
  alarms.forEach(alarm => {
    if (alarm === current) {
      alarmSound.play();
      alert(`⏰ Alarme disparado (${alarm})!`);
      alarms = alarms.filter(a => a !== alarm);
      updateAlarmList();
    }
  });
}

// ===== CRONÔMETRO =====
let stopwatchInterval;
let stopwatchTime = 0;
let laps = [];

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
  laps = [];
  updateStopwatchDisplay();
  document.getElementById('laps-container').innerHTML = '';
});

document.getElementById('lap-stopwatch').addEventListener('click', () => {
  if (stopwatchInterval) {
    laps.push(formatTime(stopwatchTime));
    const lapsContainer = document.getElementById('laps-container');
    lapsContainer.innerHTML = laps.map((lap, i) => `
      <div class="lap-item">Volta ${i + 1}: ${lap}</div>
    `).join('');
  }
});

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function updateStopwatchDisplay() {
  document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
}

// ===== TIMER =====
let timerInterval;

document.getElementById('start-timer').addEventListener('click', () => {
  const minutes = parseInt(document.getElementById('timer-minutes').value) || 1;
  let timeLeft = minutes * 60;

  clearInterval(timerInterval);
  updateTimerDisplay(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alarmSound.play();
      alert("Timer concluído!");
    }
  }, 1000);
});

function updateTimerDisplay(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  document.getElementById('timer-display').textContent = `${mins}:${secs}`;
}

// ===== POMODORO =====
let pomodoroInterval;
let pomodoroTime = 25 * 60; // 25 minutos

document.getElementById('start-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();

  pomodoroInterval = setInterval(() => {
    pomodoroTime--;
    updatePomodoroDisplay();

    if (pomodoroTime <= 0) {
      clearInterval(pomodoroInterval);
      alarmSound.play();
      alert("Pomodoro concluído! Faça uma pausa de 5 minutos.");
    }
  }, 1000);
});

document.getElementById('reset-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
});

function updatePomodoroDisplay() {
  const mins = String(Math.floor(pomodoroTime / 60)).padStart(2, '0');
  const secs = String(pomodoroTime % 60).padStart(2, '0');
  document.getElementById('pomodoro-display').textContent = `${mins}:${secs}`;
}

// ===== EFEITOS DE SOM =====
const clickSound = document.getElementById('click-sound');

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});
