// Interruptor "día realizado" para las cards del calendario.
// Para desactivarlo: comenta el import y la llamada en src/js/index.js
// y el bloque de estilos ".done-toggle" en src/css/index.css.

const STORAGE_KEY = "runtina:done-days"

function loadDoneDays() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveDoneDays(doneDays) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doneDays))
}

export function addDoneToggles() {
  const doneDays = loadDoneDays()

  document.querySelectorAll(".calendar .day-card").forEach((card) => {
    const id = card.querySelector("h2").textContent

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = Boolean(doneDays[id])
    checkbox.addEventListener("change", () => {
      doneDays[id] = checkbox.checked
      saveDoneDays(doneDays)
    })

    const slider = document.createElement("span")
    slider.className = "done-slider"

    const toggle = document.createElement("label")
    toggle.className = "done-toggle"
    toggle.title = "Marcar el día como realizado"
    toggle.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      checkbox.checked = !checkbox.checked
      checkbox.dispatchEvent(new Event("change"))
    })

    toggle.append(checkbox, slider)
    card.append(toggle)
  })
}
