import "../components/app-root.js";
import "../components/tab-system/tab-system.js";
import "../components/HeroSection/HeroSection.js";
import { addDoneToggles } from "../modules/toggle-done.js";
import datos from "../data/entrenos.json" with { type: "json" };

const today = new Date().getDate();

function isPastDay(entrenoId) {
  return parseInt(entrenoId) < today;
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".calendar");

  for (const entreno of datos) {
    const link = document.createElement("a");
    link.href = `entrenamiento/index.html?id=${entreno.id}`;

    //Agregar estilos a la card
    link.classList.add("day-card");
    if (entreno.tipo === "Descanso") link.classList.add("disabled");
    if (entreno.tipo === "Carrera") link.classList.add("full");
    if (isPastDay(entreno.id)) link.classList.add("past");
    if (parseInt(entreno.id) === today) link.classList.add("current");

    //Descripción de las Card
    const titulo = document.createElement("h2");
    titulo.textContent = entreno.id;
    //Span
    const descripcion = document.createElement("span");
    descripcion.textContent = entreno.tipo === "Descanso" ? "Descanso" : "Entreno";
    /* if (entreno.id === "21") descripcion.textContent = "Caminata"; */
    if (entreno.tipo === "Carrera") descripcion.textContent = " 🏁🚀🎯 Competencia 🏆🚩🏁";

    //Agrego al Link
    link.appendChild(titulo);
    link.appendChild(descripcion);

    navbar.appendChild(link);
  }

  addDoneToggles();
  setupHomeKicker();
  setupTodayChip();
});

function setupHomeKicker() {
  const mes = datos[0]?.fecha.match(/de\s+(.+)/)?.[1]?.trim();
  const kickerText = mes
    ? `${mes.charAt(0).toUpperCase()}${mes.slice(1)} · ${datos.length} días`
    : "";
  if (kickerText) {
    const kicker = document.createElement("div");
    kicker.className = "plan-kicker";
    kicker.textContent = kickerText;
    document.querySelector(".calendar")?.before(kicker);
  }
}

function setupTodayChip() {
  const currentCard = document.querySelector(".calendar .day-card.current");
  if (currentCard && !currentCard.classList.contains("disabled")) {
    const chip = document.createElement("span");
    chip.className = "today-chip";
    chip.textContent = "Hoy";
    currentCard.append(chip);
  }
}
