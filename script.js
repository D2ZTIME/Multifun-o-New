// Relógio Digital
function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0");
  document.getElementById("relogio").textContent = `${horas}:${minutos}:${segundos}`;
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Alarme
let alarmeHora = null;

function definirAlarme() {
  const input = prompt("Digite a hora do alarme (HH:MM):");
  if (/^\d{2}:\d{2}$/.test(input)) {
    alarmeHora = input;
    document.getElementById("alarmeStatus").textContent = `⏰ Alarme definido para ${alarmeHora}`;
  } else {
    alert("Formato inválido. Use HH:MM.");
  }
}

function verificarAlarme() {
  if (!alarmeHora) return;
  const agora = new Date();
  const horaAtual = `${agora.getHours().toString().padStart(2, "0")}:${agora.getMinutes().toString().padStart(2, "0")}`;
  if (horaAtual === alarmeHora) {
    alarmeHora = null;
    document.getElementById("alarmeStatus").textContent = "🔔 Alarme tocado!";
    tocarAlarme();
  }
}
setInterval(verificarAlarme, 1000);

function tocarAlarme() {
  const som = new Audio("assets/alarme.mp3");
  som.play();
}

// Clima (sem API por enquanto)
document.getElementById("clima").textContent = "🌤 Exemplo: 25°C, ensolarado";
// ou use a API se quiser: https://openweathermap.org/api
