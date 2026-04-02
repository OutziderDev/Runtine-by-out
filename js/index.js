import "../components/app-root.js";
import "../components/tab-system/tab-system.js";
import "../components/HeroSection/HeroSection.js";
import datos from "../data/entrenos.json" with { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".calendar");

  for (const entreno of datos) {
    const link = document.createElement("a");
    link.href = `entrenamiento/index.html?id=${entreno.id}`;
    console.log("el tipo es:", entreno.tipo);

    //Agregar estilos a la card
    link.classList.add("day-card");
    if (entreno.tipo === "Descanso") link.classList.add("disabled");
    /* if (entreno.id === "21") link.classList.remove("disabled"); */
    if (entreno.tipo === "Carrera") link.classList.add("full");

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
});
