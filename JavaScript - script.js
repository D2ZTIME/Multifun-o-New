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
let pomodoroTime = 25 * 60; // 25 minutos
let pomodoroInterval;
let pomodoroRunning = false;

function updatePomodoroDisplay() {
  const minutes = String(Math.floor(pomodoroTime / 60)).padStart(2, "0");
  const seconds = String(pomodoroTime % 60).padStart(2, "0");
  document.getElementById("pomodoro-display").textContent = `${minutes}:${seconds}`;
}

function startPomodoro() {
  if (!pomodoroRunning) {
    pomodoroRunning = true;
    pomodoroInterval = setInterval(() => {
      if (pomodoroTime > 0) {
        pomodoroTime--;
        updatePomodoroDisplay();
      } else {
        clearInterval(pomodoroInterval);
        pomodoroRunning = false;
        alert("🍅 Tempo de foco encerrado! Faça uma pausa de 5 minutos.");
      }
    }, 1000);
  }
}

function pausePomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroRunning = false;
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroRunning = false;
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
}

updatePomodoroDisplay();

function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather;
      const temperature = weather.temperature;
      const wind = weather.windspeed;
      const code = weather.weathercode;
      const condition = getWeatherCondition(code);

      document.getElementById("weather-info").textContent =
        `Temperatura: ${temperature}°C | Vento: ${wind} km/h | Condição: ${condition}`;
    })
    .catch(error => {
      document.getElementById("weather-info").textContent = "Não foi possível carregar o clima.";
      console.error("Erro ao buscar clima:", error);
    });
}

function getWeatherCondition(code) {
  const conditions = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Nevoeiro",
    48: "Nevoeiro com geada",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa intensa",
    61: "Chuva leve",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Chuva passageira leve",
    81: "Chuva passageira moderada",
    82: "Chuva passageira forte",
  };
  return conditions[code] || "Condição desconhecida";
}

// Detecta a localização do usuário
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    },
    error => {
      document.getElementById("weather-info").textContent =
        "Permissão de localização negada. Não é possível exibir o clima.";
    }
  );
} else {
  document.getElementById("weather-info").textContent =
    "Geolocalização não suportada neste navegador.";
}
