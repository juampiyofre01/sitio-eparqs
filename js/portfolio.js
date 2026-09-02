/*
 * ============================================================================
 *  PORTFOLIO — genera las tarjetas de obras a partir de DATOS_EPARQ,
 *  maneja las categorías (tabs) y el modal con la ficha ampliada.
 *  Este archivo se ejecuta solo; no necesita configuración.
 * ============================================================================
 */

(function () {
  "use strict";

  // Las 3 categorías del portfolio público. El campo "tipo" de cada
  // proyecto (editable desde herramientas/editor.html) ya trae directo una
  // de estas 3 claves. Si un proyecto trajera un valor no reconocido, cae
  // automáticamente en "Otros" (ver categoriaDe) en vez de desaparecer.
  const CATEGORIAS_OBRAS = [
    { clave: "logistico-industrial", etiqueta: "Logístico / Industrial" },
    { clave: "residencial-oficinas", etiqueta: "Residencial / Oficinas" },
    { clave: "otros", etiqueta: "Otros" },
  ];

  let categoriaActiva = CATEGORIAS_OBRAS[0].clave;

  const contenedorPortfolio = document.querySelector("[data-portfolio-grilla]");
  const contenedorTabs = document.querySelector("[data-portfolio-tabs]");
  const modal = document.querySelector("[data-modal]");

  if (!contenedorPortfolio) return; // por si este script se carga en otra página sin portfolio

  /**
   * Formatea un número con separador de miles al estilo argentino (punto).
   * Ej: 43000 -> "43.000"
   */
  function formatearM2(numero) {
    return numero.toLocaleString("es-AR");
  }

  // A qué categoría del portfolio pertenece un proyecto, según su "tipo".
  function categoriaDe(proyecto) {
    const esValida = CATEGORIAS_OBRAS.some((cat) => cat.clave === proyecto.tipo);
    return esValida ? proyecto.tipo : "otros";
  }

  // DATOS_EPARQ.proyectos ya trae el campo "tipo" en cada proyecto;
  // acá solo le sumamos un id único para identificar la tarjeta en el DOM.
  const TODOS_LOS_PROYECTOS = DATOS_EPARQ.proyectos.map((proyecto, indice) => ({
    ...proyecto,
    idUnico: "proyecto-" + indice,
  }));

  /**
   * Crea el bloque HTML (nodo) de una tarjeta de obra: la foto ocupa todo
   * el espacio disponible y los datos van superpuestos abajo, sobre un
   * degradado oscuro — así cada obra se ve como una pieza de portfolio,
   * no como una card de catálogo con recuadro blanco.
   */
  function crearTarjeta(proyecto) {
    const tarjeta = document.createElement("button");
    tarjeta.type = "button";
    tarjeta.className = "tarjeta-obra";
    tarjeta.setAttribute("data-id-proyecto", proyecto.idUnico);
    tarjeta.setAttribute("aria-label", "Ver ficha de la obra: " + proyecto.obra);

    const m2Texto = proyecto.m2 ? formatearM2(proyecto.m2) + " m²" : proyecto.nota_m2 || "";

    tarjeta.innerHTML = `
      <div class="tarjeta-obra__imagen-wrap">
        <img src="${proyecto.imagen}" alt="${proyecto.obra} — ${proyecto.cliente}" loading="lazy" />
        <div class="placeholder-imagen" style="display:none;">
          <span>${proyecto.obra}</span>
        </div>
        ${proyecto.leed ? `<span class="tarjeta-obra__leed"><img src="img/leed-gold-usgbc.jpg" alt="" onerror="this.remove()" />${proyecto.leed}</span>` : ""}
        <div class="tarjeta-obra__overlay">
          <span class="tarjeta-obra__cliente">${proyecto.cliente}</span>
          <h4 class="tarjeta-obra__titulo">${proyecto.obra}</h4>
          <div class="tarjeta-obra__meta">
            <span>${proyecto.ubicacion}</span>
            <span>${m2Texto}</span>
          </div>
        </div>
      </div>
    `;

    // Si la foto todavía no existe en /img/proyectos/, mostramos el placeholder.
    activarFallbackDeImagen(tarjeta.querySelector("img"));

    tarjeta.addEventListener("click", function () {
      abrirModal(proyecto);
    });

    return tarjeta;
  }

  /**
   * Engancha el evento "error" de una imagen para que, si el archivo no
   * existe (foto todavía no cargada por el usuario), se oculte la imagen
   * rota y aparezca el placeholder gris con el nombre de la obra.
   */
  function activarFallbackDeImagen(img) {
    img.addEventListener("error", function () {
      const contenedor = img.parentElement; // guardamos la referencia ANTES de quitar el img
      img.remove();
      const placeholder = contenedor.querySelector(".placeholder-imagen");
      if (placeholder) placeholder.style.display = "flex";
    });
  }

  /**
   * Vuelve a dibujar la grilla del portfolio con los proyectos de la
   * categoría activa (sin agrupar por estado de obra: eso ya no se muestra).
   */
  function renderizarPortfolio() {
    const proyectosFiltrados = TODOS_LOS_PROYECTOS.filter((p) => categoriaDe(p) === categoriaActiva);
    contenedorPortfolio.innerHTML = "";

    if (proyectosFiltrados.length === 0) {
      contenedorPortfolio.innerHTML = `<p class="portfolio__vacio">No hay obras cargadas en esta categoría todavía.</p>`;
      return;
    }

    proyectosFiltrados.forEach((proyecto) => {
      contenedorPortfolio.appendChild(crearTarjeta(proyecto));
    });
  }

  /**
   * Arma la barra de las 3 categorías, una sola vez al cargar.
   */
  function inicializarTabs() {
    if (!contenedorTabs) return;
    contenedorTabs.innerHTML = "";
    CATEGORIAS_OBRAS.forEach((categoria) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "portfolio__tab" + (categoria.clave === categoriaActiva ? " activo" : "");
      btn.textContent = categoria.etiqueta;
      btn.addEventListener("click", function () {
        if (categoria.clave === categoriaActiva) return;
        categoriaActiva = categoria.clave;
        contenedorTabs.querySelectorAll(".portfolio__tab").forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");
        renderizarPortfolio();
      });
      contenedorTabs.appendChild(btn);
    });
  }

  /* ------------------------------------------------------------------
     MODAL / FICHA AMPLIADA DE LA OBRA
     ------------------------------------------------------------------ */

  function abrirModal(proyecto) {
    if (!modal) return;

    const imagenes = proyecto.imagenes && proyecto.imagenes.length ? proyecto.imagenes : [proyecto.imagen];
    const m2Texto = proyecto.m2 ? formatearM2(proyecto.m2) + " m²" : proyecto.nota_m2 || "—";

    modal.querySelector("[data-modal-cliente]").textContent = proyecto.cliente;
    modal.querySelector("[data-modal-titulo]").textContent = proyecto.obra;
    modal.querySelector("[data-modal-ubicacion]").textContent = proyecto.ubicacion;
    modal.querySelector("[data-modal-m2]").textContent = m2Texto;
    modal.querySelector("[data-modal-rol]").textContent = proyecto.rol;
    modal.querySelector("[data-modal-anio]").textContent = proyecto.anio;
    modal.querySelector("[data-modal-categoria]").textContent = proyecto.categoria;

    const filaLeed = modal.querySelector("[data-modal-fila-leed]");
    if (proyecto.leed) {
      filaLeed.style.display = "";
      modal.querySelector("[data-modal-leed]").innerHTML =
        `<img src="img/leed-gold-usgbc.jpg" alt="" class="leed-icono" onerror="this.remove()" />${proyecto.leed}`;
    } else {
      filaLeed.style.display = "none";
    }

    mostrarImagenPrincipal(imagenes[0], proyecto.obra);
    renderizarMiniaturas(imagenes, proyecto.obra);

    modal.classList.add("abierto");
    document.body.classList.add("modal-abierto");
    modal.querySelector(".modal__cerrar").focus();
  }

  function mostrarImagenPrincipal(rutaImagen, nombreObra) {
    const wrap = modal.querySelector("[data-modal-imagen-wrap]");
    wrap.innerHTML = `
      <img src="${rutaImagen}" alt="${nombreObra}" />
      <div class="placeholder-imagen" style="display:none;"><span>${nombreObra}</span></div>
    `;
    activarFallbackDeImagen(wrap.querySelector("img"));
  }

  function renderizarMiniaturas(imagenes, nombreObra) {
    const contenedorMini = modal.querySelector("[data-modal-miniaturas]");
    if (imagenes.length <= 1) {
      contenedorMini.innerHTML = "";
      contenedorMini.style.display = "none";
      return;
    }
    contenedorMini.style.display = "flex";
    contenedorMini.innerHTML = "";
    imagenes.forEach((ruta, indice) => {
      const img = document.createElement("img");
      img.src = ruta;
      img.alt = nombreObra + " — foto " + (indice + 1);
      if (indice === 0) img.classList.add("activa");
      img.addEventListener("click", function () {
        mostrarImagenPrincipal(ruta, nombreObra);
        contenedorMini.querySelectorAll("img").forEach((i) => i.classList.remove("activa"));
        img.classList.add("activa");
      });
      // Si una miniatura no existe todavía, no la mostramos (evita ícono roto)
      img.addEventListener("error", function () {
        img.remove();
      });
      contenedorMini.appendChild(img);
    });
  }

  function cerrarModal() {
    if (!modal) return;
    modal.classList.remove("abierto");
    document.body.classList.remove("modal-abierto");
  }

  if (modal) {
    modal.querySelector(".modal__cerrar").addEventListener("click", cerrarModal);
    // Cerrar al hacer clic afuera de la caja del modal
    modal.addEventListener("click", function (evento) {
      if (evento.target === modal) cerrarModal();
    });
    // Cerrar con la tecla Escape
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && modal.classList.contains("abierto")) cerrarModal();
    });
  }

  // Inicialización
  inicializarTabs();
  renderizarPortfolio();
})();
