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
