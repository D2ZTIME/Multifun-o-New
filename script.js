// script.js

// Tabs
const navButtons = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('main section');

navButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    navButtons.forEach(btn => btn.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));

    button.classList.add('active');
    sections[index].classList.add('active');
  });
});

// Digital Clock
function updateDigitalClock() {
  const now = new Date();
  const clock = document.getElementById('digital-clock');
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateDigitalClock, 1000);
updateDigitalClock();

// Alarm
let alarmTime = null;
const alarmAudio = new Audio('https://www.soundjay.com/button/beep-07.wav');

document.getElementById('set-alarm').addEventListener('click', () => {
  alarmTime = document.getElementById('alarm-time').value;
  document.getElementById('alarm-status').textContent = `Alarme definido para ${alarmTime}`;
});

setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  if (alarmTime === currentTime) {
    alarmAudio.play();
    document.getElementById('alarm-status').textContent = '⏰ Alarme disparado!';
    alarmTime = null;
  }
}, 1000);

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatch() {
  const minutes = Math.floor(stopwatchTime / 60).toString().padStart(2, '0');
  const seconds = (stopwatchTime % 60).toString().padStart(2, '0');
  document.getElementById('stopwatch-display').textContent = `${minutes}:${seconds}`;
}

document.getElementById('start-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatch();
  }, 1000);
});

document.getElementById('stop-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatch();
});

// Timer
let timerInterval;

document.getElementById('start-timer').addEventListener('click', () => {
  let time = parseInt(document.getElementById('timer-minutes').value) * 60;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;
    } else {
      clearInterval(timerInterval);
      document.getElementById('timer-display').textContent = '⏰';
    }
  }, 1000);
});

// Pomodoro
let pomodoroInterval;
let pomodoroTime = 25 * 60;

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTime / 60).toString().padStart(2, '0');
  const seconds = (pomodoroTime % 60).toString().padStart(2, '0');
  document.getElementById('pomodoro-display').textContent = `${minutes}:${seconds}`;
}

document.getElementById('start-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = setInterval(() => {
    if (pomodoroTime > 0) {
      pomodoroTime--;
      updatePomodoroDisplay();
    } else {
      clearInterval(pomodoroInterval);
      document.getElementById('pomodoro-display').textContent = '☕ Tempo de pausa!';
    }
  }, 1000);
});

document.getElementById('reset-pomodoro').addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
});

updatePomodoroDisplay();

// Weather (usando localização do navegador e API OpenWeather)
const apiKey = 'INSIRA_SUA_API_KEY_AQUI'; // Substitua pela sua chave real

function fetchWeather() {
  if (!navigator.geolocation) {
    document.getElementById('weather-info').textContent = 'Geolocalização não suportada.';
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`)
      .then(res => res.json())
      .then(data => {
        const { name, main, weather } = data;
        document.getElementById('weather-info').textContent = `${name}: ${main.temp}°C, ${weather[0].description}`;
      })
      .catch(() => {
        document.getElementById('weather-info').textContent = 'Erro ao buscar clima.';
      });
  });
}

fetchWeather();
