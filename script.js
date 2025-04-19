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

// Navegação entre seções
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
