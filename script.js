// Variáveis do cronômetro
let swInterval;
let swStartTime = 0;
let swElapsedTime = 0;
let swRunning = false;
let lapCount = 1;

// Elementos
const swMinutes = document.getElementById('sw-minutes');
const swSeconds = document.getElementById('sw-seconds');
const swMilliseconds = document.getElementById('sw-milliseconds');
const startBtn = document.getElementById('start-sw');
const stopBtn = document.getElementById('stop-sw');
const resetBtn = document.getElementById('reset-sw');
const lapBtn = document.getElementById('lap-sw');
const lapsContainer = document.getElementById('laps-container');

// Atualiza o display
function updateStopwatch() {
  const totalMs = swElapsedTime;
  const minutes = Math.floor(totalMs / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((totalMs % 1000) / 10).toString().padStart(2, '0');

  swMinutes.textContent = minutes;
  swSeconds.textContent = seconds;
  swMilliseconds.textContent = milliseconds;
}

// Adiciona uma volta
function addLap() {
  const lapItem = document.createElement('div');
  lapItem.className = 'lap-item';
  lapItem.textContent = `Volta ${lapCount++}: ${swMinutes.textContent}:${swSeconds.textContent}.${swMilliseconds.textContent}`;
  lapsContainer.prepend(lapItem);
}

// Event Listeners
startBtn.addEventListener('click', () => {
  if (!swRunning) {
    swStartTime = Date.now() - swElapsedTime;
    swInterval = setInterval(() => {
      swElapsedTime = Date.now() - swStartTime;
      updateStopwatch();
    }, 10);
    swRunning = true;
  }
});

stopBtn.addEventListener('click', () => {
  if (swRunning) {
    clearInterval(swInterval);
    swRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(swInterval);
  swRunning = false;
  swElapsedTime = 0;
  lapCount = 1;
  lapsContainer.innerHTML = '';
  updateStopwatch();
});

lapBtn.addEventListener('click', () => {
  if (swRunning) {
    addLap();
  }
});

// Inicializa
updateStopwatch();
// Sons de clique
const clickSound = document.getElementById('click-sound');

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Salvar/Carregar voltas do localStorage
function saveLaps() {
  const laps = Array.from(document.querySelectorAll('.lap-item')).map(lap => lap.textContent);
  localStorage.setItem('stopwatchLaps', JSON.stringify(laps));
  localStorage.setItem('lapCount', lapCount.toString());
}

function loadLaps() {
  const savedLaps = JSON.parse(localStorage.getItem('stopwatchLaps')) || [];
  const savedLapCount = parseInt(localStorage.getItem('lapCount')) || 1;
  
  lapCount = savedLapCount;
  savedLaps.forEach(lapText => {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.textContent = lapText;
    lapsContainer.prepend(lapItem);
  });
}

// Modifique o addLap() para salvar automaticamente
function addLap() {
  const lapItem = document.createElement('div');
  lapItem.className = 'lap-item';
  lapItem.textContent = `Volta ${lapCount++}: ${swMinutes.textContent}:${swSeconds.textContent}.${swMilliseconds.textContent}`;
  lapsContainer.prepend(lapItem);
  saveLaps();
}

// Atualize os event listeners para tocar som
[startBtn, stopBtn, resetBtn, lapBtn].forEach(btn => {
  btn.addEventListener('click', () => playClickSound());
});

// Carregue as voltas ao iniciar
document.addEventListener('DOMContentLoaded', loadLaps);
<!-- Adicione no <body> -->
<audio id="click-sound" src="https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3" preload="auto"></audio>

<!-- Substitua os botões existentes por: -->
<div class="stopwatch-controls">
  <button id="start-sw" class="btn-3d">▶ Iniciar</button>
  <button id="stop-sw" class="btn-3d">⏸ Parar</button>
  <button id="reset-sw" class="btn-3d">⏹ Zerar</button>
  <button id="lap-sw" class="btn-3d">⏱ Volta</button>
</div>
/* script.js */

// Relógio Digital
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('ampm').textContent = ampm;

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('pt-BR', dateOptions);
}
setInterval(updateClock, 1000);
updateClock();

// Cronômetro
let swInterval;
let swTime = 0;
let swRunning = false;

function updateStopwatch() {
  const minutes = Math.floor(swTime / 6000).toString().padStart(2, '0');
  const seconds = Math.floor((swTime % 6000) / 100).toString().padStart(2, '0');
  const milliseconds = (swTime % 100).toString().padStart(2, '0');

  document.getElementById('sw-minutes').textContent = minutes;
  document.getElementById('sw-seconds').textContent = seconds;
  document.getElementById('sw-milliseconds').textContent = milliseconds;
}

function startStopwatch() {
  if (!swRunning) {
    swRunning = true;
    swInterval = setInterval(() => {
      swTime++;
      updateStopwatch();
    }, 10);
  }
}

function stopStopwatch() {
  clearInterval(swInterval);
  swRunning = false;
}

function resetStopwatch() {
  clearInterval(swInterval);
  swTime = 0;
  swRunning = false;
  updateStopwatch();
  document.getElementById('laps-container').innerHTML = '';
}

function recordLap() {
  if (swTime > 0) {
    const lap = document.createElement('div');
    const minutes = Math.floor(swTime / 6000).toString().padStart(2, '0');
    const seconds = Math.floor((swTime % 6000) / 100).toString().padStart(2, '0');
    const milliseconds = (swTime % 100).toString().padStart(2, '0');
    lap.textContent = `Volta: ${minutes}:${seconds}:${milliseconds}`;
    document.getElementById('laps-container').appendChild(lap);
  }
}

document.getElementById('start-sw').addEventListener('click', startStopwatch);
document.getElementById('stop-sw').addEventListener('click', stopStopwatch);
document.getElementById('reset-sw').addEventListener('click', resetStopwatch);
document.getElementById('lap-sw').addEventListener('click', recordLap);

// Tema Escuro
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    themeToggle.textContent = 'Tema Claro';
  } else {
    themeToggle.textContent = 'Tema Escuro';
  }
});

