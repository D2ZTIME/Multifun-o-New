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
