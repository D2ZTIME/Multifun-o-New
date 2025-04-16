// ===================== Navegação por abas =====================
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

// ===================== Relógio Digital =====================
function updateDigitalClock() {
  const now = new Date();
  const clock = document.getElementById('digital-clock');
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateDigitalClock, 1000);
updateDigitalClock();

// ===================== Alarme =====================
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

// ===================== Cronômetro =====================
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

// ===================== Temporizador =====================
let timerInterval;

document.getElementById('start-timer').addEventListener('click', () => {
  let time = parseInt(document.getElementById('timer-minutes').value) * 60;
  if (isNaN(time) || time <= 0) return;

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

// ===================== Pomodoro =====================
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

// ===================== Clima (OpenWeather) =====================
const apiKey = 'INSIRA_SUA_API_KEY_AQUI'; // Substitua pela sua chave da OpenWeather

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
function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');
  document.getElementById('relogio').textContent = `${horas}:${minutos}:${segundos}`;
}
setInterval(atualizarRelogio, 1000);
let alarmeHora = null;

function definirAlarme() {
  const horaInput = prompt("Digite a hora do alarme (HH:MM):");
  if (horaInput) {
    alarmeHora = horaInput;
    alert(`Alarme definido para ${alarmeHora}`);
  }
}

function verificarAlarme() {
  const agora = new Date();
  const horaAtual = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
  if (alarmeHora === horaAtual) {
    tocarAlarme();
    alarmeHora = null; // Resetar o alarme após tocar
  }
}

function tocarAlarme() {
  const audio = new Audio('caminho/para/som.mp3');
  audio.play();
}

setInterval(verificarAlarme, 60000); // Verifica a cada minuto
async function obterClima() {
  const apiKey = 'sua_api_key';
  const cidade = 'São José do Rio Preto';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const clima = dados.weather[0].description;
    const temperatura = dados.main.temp;
    document.getElementById('clima').textContent = `${cidade}: ${clima}, ${temperatura}°C`;
  } catch (erro) {
    console.error('Erro ao obter clima:', erro);
  }
}

obterClima();
setInterval(obterClima, 600000); // Atualiza a cada 10 minutos


