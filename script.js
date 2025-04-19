// Exibição do relógio em tempo real
function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');

  const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const diaSemana = diasSemana[agora.getDay()];
  const dia = agora.getDate();
  const mes = agora.toLocaleString('default', { month: 'long' });
  const ano = agora.getFullYear();

  document.getElementById('relogio-horas').textContent = `${horas}:${minutos}:${segundos}`;
  document.getElementById('relogio-data').textContent = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Alternar seções da interface
const botoes = document.querySelectorAll('.sidebar button');
const secoes = document.querySelectorAll('.main > div');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remover classes ativas
    botoes.forEach(b => b.classList.remove('active'));
    secoes.forEach(sec => sec.classList.remove('active-section'));

    // Adicionar classe ativa ao botão clicado
    botao.classList.add('active');

    // Mostrar a seção correspondente
    const id = botao.getAttribute('data-section');
    document.getElementById(id).classList.add('active-section');
  });
});
