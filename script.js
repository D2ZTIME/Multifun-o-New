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
