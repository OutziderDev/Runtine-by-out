import estilos from "../HeroSection/HeroSection.css" with { type: "css" };

class HeroSection extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(estilos);
    this.shadowRoot.innerHTML = /*html */ `
      <section class="hero">
        <h1>📅Plan final para Carrera🎯</h1>
        <p> Mantenimiento </p>
      </section>
    `;
  }
}

customElements.define("hero-section", HeroSection);
