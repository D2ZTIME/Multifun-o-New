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
