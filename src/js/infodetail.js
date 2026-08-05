import datos from "../data/entrenos.json" with { type: "json" };
import "../components/HeroSection/HeroSection.js";
import { setupReportModal } from "../modules/report-modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const dato = datos.find((info) => info.id === id);
  /* console.log("dato", dato); */

  handleTitulo(dato.fecha, dato.tipo);
  handleDistancia(dato.distancia);

  if (dato.ritmo) {
    handleRitmo(dato.ritmo);
  } else {
    handleRitmo(dato.ritmo_km);
  }

  handleObjetivos(dato.objetivo);
  handleNotas(dato.notas);

  setupReportModal(dato);
});

function handleTitulo(fecha, tipo) {
  const fechaSpan = document.querySelector("#fecha");
  fechaSpan.textContent = fecha;

  const subtituloH2 = document.querySelector("#subtitulo");
  subtituloH2.textContent = tipo;
}

function handleDistancia(distancia) {
  const distanciaSpan = document.querySelector("#distancia");
  distanciaSpan.textContent = distancia;
}

function handleRitmo(infoRitmo) {
  if (Array.isArray(infoRitmo)) {
    const ritmoList = document.querySelector("#ritmo-list");
    infoRitmo.forEach((item) => {
      const itemLi = document.createElement("li");
      itemLi.innerHTML = `<span>Km${item.km} ➜ </span>${item.ritmo} min/km`;
      ritmoList.appendChild(itemLi);
    });
  } else {
    const ritmoUnicoP = document.querySelector("#ritmo-unico");
    ritmoUnicoP.textContent = infoRitmo;
  }
}

function handleObjetivos(objetivos) {
  const objetivoList = document.querySelector("#objetivo-list");
  objetivos.forEach((objetivo) => {
    const li = document.createElement("li");
    li.innerText = objetivo;

    objetivoList.appendChild(li);
  });
}

function handleNotas(notas) {
  const notasP = document.querySelector("#nota-desc");
  notasP.innerText = notas;
}
