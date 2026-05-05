const publicaciones = [
  {
    titulo: "Acompañar en movimiento: aprendizajes que transforman la mirada sobre migración",
    fecha: "16 abril 2026",
    resumen: "En esta nueva edición de “El Canto del Tordo”, se propone una reflexión que trasciende la descripción de acciones para situarse en el terreno del aprendizaje institucional y la comprensión crítica de la movilidad humana.",
    imagen: "canto.jpeg",
    pdf: "pdf/ElCantoDelTordo-Edicion-2.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "SJM Bolivia impulsa espacios de hospitalidad e integración",
    fecha: "10 abril 2026",
    resumen: "Resumen de acciones institucionales orientadas al acompañamiento, acogida y fortalecimiento comunitario.",
    imagen: "img/notas/nota2.jpg",
    pdf: "pdf/notas/nota2.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "Encuentro intercultural fortalece redes de apoyo a población migrante",
    fecha: "03 abril 2026",
    resumen: "Actividad orientada al diálogo, la convivencia y la construcción de vínculos entre comunidades.",
    imagen: "img/notas/nota3.jpg",
    pdf: "pdf/notas/nota3.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "Jornada informativa sobre derechos y regularización migratoria",
    fecha: "28 marzo 2026",
    resumen: "Espacio de orientación para resolver dudas frecuentes y acercar información útil a población en movilidad.",
    imagen: "img/notas/nota4.jpg",
    pdf: "pdf/notas/nota4.pdf",
    categoria: "Nota informativa"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const notaPrincipal = document.getElementById("notaPrincipal");
  const notasSecundarias = document.getElementById("notasSecundarias");
  const archivoGrid = document.getElementById("archivoGrid");

  const modal = document.getElementById("pdfViewerModal");
  const frame = document.getElementById("pdfFrame");
  const title = document.getElementById("pdfViewerTitle");
  const downloadBtn = document.getElementById("pdfDownloadBtn");
  const closeBtn = document.getElementById("pdfCloseBtn");

  let pdfAbierto = false;
  let bloqueoHistorial = false;

  function textoSeguro(texto = "") {
    return String(texto).trim();
  }

  function crearImagen(src, alt, clase = "") {
    return `
      <img 
        src="${src}" 
        alt="${textoSeguro(alt)}" 
        class="${clase}" 
        loading="lazy"
      >
    `;
  }

  function crearLinkPDF(nota, contenido) {
    return `
      <a 
        href="${nota.pdf}" 
        data-pdf="${nota.pdf}" 
        data-title="${textoSeguro(nota.titulo)}"
        aria-label="Abrir publicación: ${textoSeguro(nota.titulo)}"
      >
        ${contenido}
      </a>
    `;
  }

  function renderPublicaciones() {
    if (!publicaciones.length || !notaPrincipal || !notasSecundarias || !archivoGrid) return;

    const ultima = publicaciones[0];
    const anteriores = publicaciones.slice(1);

    notaPrincipal.innerHTML = crearLinkPDF(ultima, `
      <div class="nota-principal-media">
        ${crearImagen(ultima.imagen, ultima.titulo, "nota-principal-img")}
      </div>

      <div class="nota-principal-body">
        <span class="nota-fecha">
          <i class="fa-regular fa-calendar"></i>
          ${ultima.fecha}
        </span>

        <h2>${ultima.titulo}</h2>
        <p>${ultima.resumen}</p>

        <span class="nota-link">
          Leer publicación
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    `);

    notasSecundarias.innerHTML = anteriores.map((nota, index) => `
      <article class="nota-side" style="--delay:${index * 0.08}s">
        ${crearLinkPDF(nota, `
          <div class="nota-side-img">
            ${crearImagen(nota.imagen, nota.titulo)}
          </div>

          <div class="nota-side-content">
            <span class="nota-fecha">
              <i class="fa-regular fa-calendar"></i>
              ${nota.fecha}
            </span>

            <h3>${nota.titulo}</h3>
            <p>${nota.resumen}</p>

            <span class="mini-link">
              Ver nota <i class="fa-solid fa-angle-right"></i>
            </span>
          </div>
        `)}
      </article>
    `).join("");

    archivoGrid.innerHTML = publicaciones.map((nota, index) => `
      <article class="archivo-card" style="--delay:${index * 0.07}s">
        ${crearLinkPDF(nota, `
          <div class="archivo-img-wrap">
            ${crearImagen(nota.imagen, nota.titulo)}
          </div>

          <div class="archivo-card-body">
            <span class="nota-fecha">
              <i class="fa-regular fa-calendar"></i>
              ${nota.fecha}
            </span>

            <h3>${nota.titulo}</h3>
            <p>${nota.resumen}</p>

            <span class="nota-link">
              Abrir PDF <i class="fa-solid fa-file-pdf"></i>
            </span>
          </div>
        `)}
      </article>
    `).join("");
  }

  function abrirPDF(pdfUrl, pdfTitulo) {
    if (!modal || !frame || !title || !downloadBtn) return;

    title.textContent = "El Canto del Tordo";
    frame.src = pdfUrl;
    downloadBtn.href = pdfUrl;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("pdf-open");

    pdfAbierto = true;
    bloqueoHistorial = true;

    history.pushState({ visorPDF: true }, "", window.location.href);

    setTimeout(() => {
      bloqueoHistorial = false;
    }, 150);
  }

  function cerrarPDF(desdeHistorial = false) {
    if (!modal || !frame || !pdfAbierto) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pdf-open");

    setTimeout(() => {
      frame.src = "";
    }, 200);

    pdfAbierto = false;

    if (!desdeHistorial && history.state?.visorPDF) {
      history.back();
    }
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-pdf]");
    if (!link) return;

    e.preventDefault();

    const pdfUrl = link.dataset.pdf;
    const pdfTitulo = link.dataset.title || "Publicación";

    abrirPDF(pdfUrl, pdfTitulo);
  });

  closeBtn?.addEventListener("click", () => {
    cerrarPDF(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pdfAbierto) {
      cerrarPDF(false);
    }
  });

  window.addEventListener("popstate", () => {
    if (bloqueoHistorial) return;

    if (pdfAbierto) {
      cerrarPDF(true);
    }
  });

  renderPublicaciones();
});