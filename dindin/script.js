document.addEventListener("DOMContentLoaded", () => {
  const exerciseForm = document.querySelector("[data-exercise]");
  if (exerciseForm) {
    exerciseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = exerciseForm.querySelector('input[name="answer"]:checked');
      const feedback = exerciseForm.querySelector(".feedback");
      if (!selected) {
        feedback.className = "feedback show try-again";
        feedback.textContent = "Escolha uma alternativa antes de conferir a resposta.";
        return;
      }
      if (selected.value === exerciseForm.dataset.correct) {
        feedback.className = "feedback show good";
        feedback.textContent = exerciseForm.dataset.success;
      } else {
        feedback.className = "feedback show try-again";
        feedback.textContent = exerciseForm.dataset.tryagain;
      }
    });
  }

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest(".code-example").querySelector("pre").innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copiado!";
      } catch {
        button.textContent = "Selecione e copie";
      }
      window.setTimeout(() => {
        button.textContent = "Copiar código";
      }, 1800);
    });
  });

  const lessonKey = document.body.dataset.lesson;
  if (lessonKey) {
    const key = "codigo-na-pratica-progress";
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem(key) || "{}"); } catch {}
    const checkbox = document.querySelector("#markComplete");
    const fill = document.querySelector(".progress-fill");
    const label = document.querySelector("#progressLabel");
    if (checkbox) {
      checkbox.checked = Boolean(progress[lessonKey]);
      const update = () => {
        progress[lessonKey] = checkbox.checked;
        localStorage.setItem(key, JSON.stringify(progress));
        const count = ["html", "css", "javascript"].filter((item) => progress[item]).length;
        if (fill) fill.style.width = `${(count / 3) * 100}%`;
        if (label) label.textContent = `${count} de 3 trilhas marcadas como concluídas`;
      };
      update();
      checkbox.addEventListener("change", update);
    }
    const count = ["html", "css", "javascript"].filter((item) => progress[item]).length;
    if (fill) fill.style.width = `${(count / 3) * 100}%`;
    if (label) label.textContent = `${count} de 3 trilhas marcadas como concluídas`;
  }
});
