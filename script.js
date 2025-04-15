function updateClock() {
  const clock = document.getElementById("digital-clock");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // exibe imediatamente
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
