// === Relógio Digital ===
function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');
  document.getElementById('relogio').textContent = `${horas}:${minutos}:${segundos}`;
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// === Alarme ===
let alarmeHora = null;

function definirAlarme() {
  const input = prompt("Defina a hora do alarme (formato HH:MM):");
  if (input && /^\d{2}:\d{2}$/.test(input)) {
    alarmeHora = input;
    document.getElementById('alarmeStatus').textContent = `Alarme definido para ${alarmeHora}`;
  } else {
    alert("Formato inválido. Use HH:MM.");
  }
}

function verificarAlarme() {
  const agora = new Date();
  const horaAtual = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
  if (alarmeHora === horaAtual) {
    tocarAlarme();
    alarmeHora = null;
    document.getElementById('alarmeStatus').textContent = "⏰ Alarme tocado!";
  }
}
setInterval(verificarAlarme, 1000);

function tocarAlarme() {
  const som = new Audio('../assets/alarme.mp3');
  som.play();
}

// === Clima com OpenWeatherMap ===
async function obterClima() {
  const apiKey = 'SUA_API_KEY_AQUI'; // <- Substitua pela sua chave da API do OpenWeatherMap
  const cidade = 'São José do Rio Preto';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const descricao = dados.weather[0].description;
    const temp = dados.main.temp.toFixed(1);
    document.getElementById('clima').textContent = `${cidade}: ${descricao}, ${temp}°C`;
  } catch (erro) {
    document.getElementById('clima').textContent = "Erro ao buscar clima.";
    console.error('Erro:', erro);
  }
}
obterClima();
setInterval(obterClima, 600000); // Atualiza a cada 10 min
