function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('ampm').textContent = ampm;

  // Atualizar data
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('pt-BR', options);
}

// Tema escuro/claro
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Atualizar a cada segundo
setInterval(updateClock, 1000);
updateClock(); // Iniciar imediatamente
// Variáveis do cronômetro
let swInterval;
let swStartTime;
let swElapsedTime = 0;
let swRunning = false;

// Elementos do cronômetro
const swMinutes = document.getElementById('sw-minutes');
const swSeconds = document.getElementById('sw-seconds');
const swMilliseconds = document.getElementById('sw-milliseconds');
const startBtn = document.getElementById('start-sw');
const stopBtn = document.getElementById('stop-sw');
const resetBtn = document.getElementById('reset-sw');

// Atualizar display do cronômetro
function updateStopwatchDisplay() {
  const totalMs = swElapsedTime;
  const minutes = Math.floor(totalMs / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((totalMs % 1000) / 10).toString().padStart(2, '0');

  swMinutes.textContent = minutes;
  swSeconds.textContent = seconds;
  swMilliseconds.textContent = milliseconds;
}

// Event listeners
startBtn.addEventListener('click', () => {
  if (!swRunning) {
    swStartTime = Date.now() - swElapsedTime;
    swInterval = setInterval(() => {
      swElapsedTime = Date.now() - swStartTime;
      updateStopwatchDisplay();
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
  updateStopwatchDisplay();
});

// Inicializar display
updateStopwatchDisplay();
