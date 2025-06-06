document.addEventListener('DOMContentLoaded', function() {
  // Navegação
  const menuButtons = document.querySelectorAll('.menu-btn');
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active de todos
      document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
      
      // Adiciona active no clicado
      this.classList.add('active');
      const sectionId = this.dataset.section + '-section';
      document.getElementById(sectionId).classList.add('active');
    });
  });

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
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Alarme
  document.getElementById('set-alarm').addEventListener('click', function() {
    const alarmTime = document.getElementById('alarm-time').value;
    if (alarmTime) {
      alert(`Alarme definido para ${alarmTime}`);
    }
  });

// Substitua todo o código do cronômetro por:
let stopwatchInterval;
let startTime;
let elapsedTime = 0;

function updateStopwatch() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  
  const milliseconds = Math.floor(elapsedTime % 1000 / 10);
  const seconds = Math.floor(elapsedTime / 1000 % 60);
  const minutes = Math.floor(elapsedTime / 1000 / 60);
  
  document.getElementById('sw-minutes').textContent = 
    String(minutes).padStart(2, '0');
  document.getElementById('sw-seconds').textContent = 
    String(seconds).padStart(2, '0');
  document.getElementById('sw-milliseconds').textContent = 
    String(milliseconds).padStart(2, '0');
}

document.getElementById('start-stopwatch').addEventListener('click', () => {
  if (!stopwatchInterval) {
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
  }
});

document.getElementById('pause-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedTime = 0;
  document.getElementById('sw-minutes').textContent = '00';
  document.getElementById('sw-seconds').textContent = '00';
  document.getElementById('sw-milliseconds').textContent = '00';
});
  // Timer
  let timerInterval;
  
  document.getElementById('start-timer').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 5;
    let timeLeft = minutes * 60;
    
    clearInterval(timerInterval);
    
    timerInterval = setInterval(function() {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      document.getElementById('timer-display').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Timer concluído!');
      } else {
        timeLeft--;
      }
    }, 1000);
  });

  // Pomodoro
  let pomodoroInterval;
  const pomodoroTime = 25 * 60;
  let pomodoroLeft = pomodoroTime;
  
  document.getElementById('start-pomodoro').addEventListener('click', function() {
    clearInterval(pomodoroInterval);
    pomodoroLeft = pomodoroTime;
    
    pomodoroInterval = setInterval(function() {
      const mins = Math.floor(pomodoroLeft / 60);
      const secs = pomodoroLeft % 60;
      document.getElementById('pomodoro-display').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      
      if (pomodoroLeft <= 0) {
        clearInterval(pomodoroInterval);
        alert('Pomodoro concluído! Hora de descansar.');
      } else {
        pomodoroLeft--;
      }
    }, 1000);
  });

  document.getElementById('reset-pomodoro').addEventListener('click', function() {
    clearInterval(pomodoroInterval);
    pomodoroLeft = pomodoroTime;
    document.getElementById('pomodoro-display').textContent = '25:00';
  });
});
