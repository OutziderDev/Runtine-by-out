// Modal "reporte de entrenamiento": formulario + vista previa + copiar objeto.
// Para desactivarlo: comenta el import y la llamada setupReportModal() en src/js/infodetail.js

const styles = new CSSStyleSheet();
styles.replaceSync(`
  .report-btn {
    flex-shrink: 0;
    padding: 0.45rem 0.95rem;
    border: 1px solid rgb(255 255 255 / 0.16);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.05);
    color: var(--color-primario);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .report-btn:hover {
    border-color: var(--color-warning);
    background: rgb(255 255 255 / 0.09);
    transform: translateY(-1px);
  }

  .report-dialog {
    margin: auto;
    width: min(1000px, 95vw);
    max-height: 90vh;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 1.2rem;
    background:
      linear-gradient(180deg, rgb(255 255 255 / 0.05), transparent 30%),
      var(--color-fondo);
    color: var(--color-primario);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.55);
    overflow: hidden;
  }
  .report-dialog::backdrop {
    background: rgb(0 0 0 / 0.75);
    backdrop-filter: blur(4px);
  }

  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1.5rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.09);
  }
  .report-header h2 {
    margin: 0;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-warning);
  }
  .report-header .report-sub {
    margin: 0.15rem 0 0;
    font-size: 0.9rem;
    color: var(--color-primario);
  }
  .report-close {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.05);
    color: var(--color-primario);
    font-size: 1rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .report-close:hover {
    border-color: var(--color-warning);
    color: var(--color-warning);
  }

  .report-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    padding: 1.5rem;
    max-height: calc(90vh - 5rem);
    overflow: auto;
  }

  .report-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .report-form h3 {
    margin: 0.6rem 0 0;
    padding-top: 0.7rem;
    border-top: 1px solid rgb(255 255 255 / 0.08);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-warning);
  }
  .report-form label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
  .report-form input,
  .report-form textarea {
    padding: 0.55rem 0.75rem;
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 0.6rem;
    background: rgb(255 255 255 / 0.04);
    color: var(--color-primario);
    font-size: 0.95rem;
    letter-spacing: 0;
    text-transform: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .report-form input::placeholder,
  .report-form textarea::placeholder {
    color: var(--color-muted);
    opacity: 0.55;
  }
  .report-form input:focus,
  .report-form textarea:focus {
    outline: none;
    border-color: var(--color-warning);
    background: rgb(255 255 255 / 0.06);
  }
  .report-form textarea {
    resize: vertical;
    min-height: 5rem;
    line-height: 1.45;
  }

  .km-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
  }
  .km-row span {
    width: 3.2rem;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
  .km-row input {
    flex: 1;
    min-width: 0;
  }
  .km-add {
    align-self: flex-start;
    padding: 0.35rem 0.85rem;
    border: 1px dashed rgb(255 255 255 / 0.18);
    border-radius: 999px;
    background: none;
    color: var(--color-primario);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .km-add:hover {
    border-color: var(--color-warning);
    color: var(--color-warning);
  }

  .report-preview {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-width: 0;
  }
  .report-preview pre {
    flex: 1;
    margin: 0;
    padding: 1.1rem;
    border: 1px solid rgb(255 255 255 / 0.09);
    border-radius: 0.8rem;
    background: rgb(0 0 0 / 0.3);
    font-size: 0.78rem;
    line-height: 1.5;
    overflow: auto;
    white-space: pre;
  }
  .report-copy {
    align-self: flex-end;
    padding: 0.3rem 0.85rem;
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 999px;
    background: none;
    color: var(--color-muted);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .report-copy:hover {
    border-color: var(--color-success);
    color: var(--color-success);
  }

  @media (width < 768px) {
    .report-grid {
      grid-template-columns: 1fr;
    }
  }
`);

function buildKmRows(container, initialKms, prefillMap, addLabel, onChange) {
  let last = 0;

  const addRow = (km) => {
    const row = document.createElement("div");
    row.className = "km-row";
    row.dataset.km = km;

    const label = document.createElement("span");
    label.textContent = `Km ${km}`;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "km-val";
    if (prefillMap && prefillMap[km] !== undefined) input.value = prefillMap[km];
    input.addEventListener("input", onChange);

    row.append(label, input);
    container.append(row);
  };

  initialKms.forEach((km) => {
    addRow(km);
    last = km;
  });

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "km-add";
  addBtn.textContent = addLabel;
  addBtn.addEventListener("click", () => {
    const next = last === 0 ? 1 : Number.isInteger(last) ? last + 1 : last + 0.5;
    last = next;
    addRow(next);
    onChange();
  });
  container.after(addBtn);
}

function readKmGroup(container) {
  const obj = {};
  container.querySelectorAll(".km-row").forEach((row) => {
    const value = row.querySelector(".km-val").value.trim();
    if (value) obj[row.dataset.km] = value;
  });
  return obj;
}

export function setupReportModal(dato) {
  document.adoptedStyleSheets.push(styles);

  const numberOrEmpty = (raw) => {
    const value = parseFloat(raw);
    return Number.isNaN(value) ? "" : value;
  };

  const distancia = parseFloat(dato.distancia.replace(",", "."));
  let initialKms = [];
  const prefillMap = {};
  if (Array.isArray(dato.ritmo_km)) {
    initialKms = dato.ritmo_km.map((item) => item.km);
    dato.ritmo_km.forEach((item) => {
      prefillMap[item.km] = item.ritmo;
    });
  } else if (!Number.isNaN(distancia) && distancia > 0) {
    initialKms = Array.from({ length: Math.ceil(distancia) }, (_, i) => i + 1);
  }

  const dialog = document.createElement("dialog");
  dialog.className = "report-dialog";
  dialog.innerHTML = `
    <header class="report-header">
      <div>
        <h2>📊 Reporte de entrenamiento</h2>
        <p class="report-sub">${dato.fecha} · ${dato.tipo}</p>
      </div>
      <button type="button" class="report-close" aria-label="Cerrar">✕</button>
    </header>
    <div class="report-grid">
      <form class="report-form">
        <label>Fecha
          <input id="f-fecha" value="${dato.fecha}" />
        </label>
        <label>Tipo
          <input id="f-tipo" value="${dato.tipo}" />
        </label>
        <label>Distancia (km)
          <input id="f-distancia" type="number" step="0.01" min="0" value="${numberOrEmpty(distancia)}" />
        </label>
        <label>Duración
          <input id="f-duracion" placeholder="00:36:25" />
        </label>
        <label>Calorías (kcal)
          <input id="f-calorias" type="number" min="0" />
        </label>
        <label>Ritmo medio
          <input id="f-ritmo" placeholder="7:13 min/km" value="${dato.ritmo && dato.ritmo !== "0" ? dato.ritmo : ""}" />
        </label>

        <h3>Velocidad</h3>
        <label>Media (km/h)
          <input id="f-vel-media" type="number" step="0.1" min="0" />
        </label>
        <label>Máxima (km/h)
          <input id="f-vel-max" type="number" step="0.1" min="0" />
        </label>

        <h3>Desniveles</h3>
        <label>Positivo
          <input id="f-desn-pos" placeholder="11m" />
        </label>
        <label>Máximo
          <input id="f-desn-max" placeholder="20m" />
        </label>

        <label>Hidratación perdida (ml)
          <input id="f-hidra" type="number" min="0" />
        </label>

        <h3>Condiciones meteorológicas</h3>
        <label>Temperatura
          <input id="f-temp" placeholder="25°C" />
        </label>
        <label>Vientos
          <input id="f-vientos" placeholder="21 km/h" />
        </label>
        <label>Humedad
          <input id="f-humedad" placeholder="83%" />
        </label>

        <h3>Desglose por km</h3>
        <div class="km-rows"></div>

        <label>Formato
          <input id="f-formato" placeholder="continuo sin intervalos" />
        </label>
        <label>Sensaciones
          <textarea id="f-sensaciones" placeholder="Respiración, dolor, fatiga..."></textarea>
        </label>

        <h3>Strava</h3>
        <label>Duración
          <input id="f-strava-duracion" placeholder="34:57" />
        </label>
        <label>Ritmo medio
          <input id="f-strava-ritmo" placeholder="6:59" />
        </label>
        <label>Kms
          <div class="km-strava-rows"></div>
        </label>
      </form>

      <div class="report-preview">
        <button type="button" class="report-copy">📋 Copiar objeto</button>
        <pre id="report-preview"></pre>
      </div>
    </div>
  `;

  const button = Object.assign(document.createElement("button"), {
    className: "report-btn",
    textContent: "📊 Rellenar datos",
  });
  button.addEventListener("click", () => dialog.showModal());
  document.querySelector(".info-header").append(button);

  document.body.append(dialog);

  dialog.querySelector(".report-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const form = dialog.querySelector(".report-form");
  form.addEventListener("submit", (event) => event.preventDefault());

  const preview = dialog.querySelector("#report-preview");
  const copyBtn = dialog.querySelector(".report-copy");

  function buildObject() {
    const value = (id) => dialog.querySelector(id).value.trim();
    const number = (id) => {
      const parsed = parseFloat(dialog.querySelector(id).value);
      return Number.isNaN(parsed) ? null : parsed;
    };

    const obj = {};

    if (value("#f-fecha")) obj.fecha = value("#f-fecha");
    if (value("#f-tipo")) obj.tipo = value("#f-tipo");

    const distanciaKm = number("#f-distancia");
    if (distanciaKm !== null) obj.distancia_km = distanciaKm;

    if (value("#f-duracion")) obj.duracion = value("#f-duracion");
    const calorias = number("#f-calorias");
    if (calorias !== null) obj.calorias_kcal = calorias;
    if (value("#f-ritmo")) obj.ritmo_medio = value("#f-ritmo");

    const velocidad = {};
    const velMedia = number("#f-vel-media");
    const velMax = number("#f-vel-max");
    if (velMedia !== null) velocidad.media_kmh = velMedia;
    if (velMax !== null) velocidad.maxima_kmh = velMax;
    if (Object.keys(velocidad).length) obj.velocidad = velocidad;

    const desniveles = {};
    if (value("#f-desn-pos")) desniveles.positivo = value("#f-desn-pos");
    if (value("#f-desn-max")) desniveles.max = value("#f-desn-max");
    if (Object.keys(desniveles).length) obj.desniveles = desniveles;

    const hidratacion = number("#f-hidra");
    if (hidratacion !== null) obj.hidratacion_perdida_ml = hidratacion;

    const condiciones = {};
    if (value("#f-temp")) condiciones.temperatura = value("#f-temp");
    if (value("#f-vientos")) condiciones.vientos = value("#f-vientos");
    if (value("#f-humedad")) condiciones.humedad = value("#f-humedad");
    if (Object.keys(condiciones).length) obj.condiciones_meteorologicas = condiciones;

    const desglose = readKmGroup(dialog.querySelector(".km-rows"));
    if (Object.keys(desglose).length) obj.desglose_km = desglose;

    if (value("#f-formato")) obj.formato = value("#f-formato");
    if (value("#f-sensaciones")) obj.sensaciones = value("#f-sensaciones");

    const strava = {};
    if (value("#f-strava-duracion")) strava.duracion = value("#f-strava-duracion");
    if (value("#f-strava-ritmo")) strava.ritmo_medio = value("#f-strava-ritmo");
    const stravaKms = readKmGroup(dialog.querySelector(".km-strava-rows"));
    if (Object.keys(stravaKms).length) strava.kms = stravaKms;
    if (Object.keys(strava).length) obj.kms_strava = strava;

    return obj;
  }

  function render() {
    preview.textContent = JSON.stringify(buildObject(), null, 2);
  }

  buildKmRows(dialog.querySelector(".km-rows"), initialKms, prefillMap, "＋ agregar km", render);
  buildKmRows(dialog.querySelector(".km-strava-rows"), [], null, "＋ agregar km", render);

  form.addEventListener("input", render);
  render();

  copyBtn.addEventListener("click", async () => {
    const json = JSON.stringify(buildObject(), null, 2);
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = json;
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    copyBtn.textContent = "✅ ¡Copiado!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copiar objeto";
    }, 1500);
  });
}
