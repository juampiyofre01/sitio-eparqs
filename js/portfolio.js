/*
 * ============================================================================
 *  PORTFOLIO — genera las tarjetas de obras a partir de DATOS_EPARQ,
 *  maneja los filtros (categoría + tipo) y el modal con la ficha ampliada.
 *  Este archivo se ejecuta solo; no necesita configuración.
 * ============================================================================
 */

(function () {
  "use strict";

  // Orden fijo en el que se muestran las categorías en el portfolio,
  // sin importar el orden en que estén los proyectos en datos-proyectos.js
  const ORDEN_CATEGORIAS = ["En ejecución", "Últimos concluidos", "Terminados"];

  const NOMBRES_TIPO = {
    industrial: "Industrial",
    logistico: "Logístico",
    oficinas: "Oficinas",
    "residencial-nautico": "Residencial / Náutico",
  };

  // Estado actual de los filtros. "todas"/"todos" significa sin filtrar.
  const estadoFiltros = {
    categoria: "todas",
    tipo: "todos",
  };

  const contenedorPortfolio = document.querySelector("[data-portfolio-grilla]");
  const contenedorFiltrosCategoria = document.querySelector("[data-filtros-categoria]");
  const contenedorFiltrosTipo = document.querySelector("[data-filtros-tipo]");
  const modal = document.querySelector("[data-modal]");

  if (!contenedorPortfolio) return; // por si este script se carga en otra página sin portfolio

  /**
   * Formatea un número con separador de miles al estilo argentino (punto).
   * Ej: 43000 -> "43.000"
   */
  function formatearM2(numero) {
    return numero.toLocaleString("es-AR");
  }

  // DATOS_EPARQ.proyectos ya trae el campo "categoria" en cada proyecto;
  // acá solo le sumamos un id único para identificar la tarjeta en el DOM.
  const TODOS_LOS_PROYECTOS = DATOS_EPARQ.proyectos.map((proyecto, indice) => ({
    ...proyecto,
    idUnico: "proyecto-" + indice,
  }));

  /**
   * Crea el bloque HTML (nodo) de una tarjeta de obra.
   * Incluye el manejo de la imagen con fallback a placeholder.
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
        ${proyecto.leed ? `<span class="tarjeta-obra__leed">${proyecto.leed}</span>` : ""}
      </div>
      <div class="tarjeta-obra__cuerpo">
        <span class="tarjeta-obra__cliente">${proyecto.cliente}</span>
        <h4 class="tarjeta-obra__titulo">${proyecto.obra}</h4>
        <p class="tarjeta-obra__ubicacion">${proyecto.ubicacion}</p>
        <div class="tarjeta-obra__meta">
          <span>${m2Texto}</span>
          <strong>${proyecto.anio}</strong>
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
   * Filtra TODOS_LOS_PROYECTOS según el estado actual de los filtros.
   */
  function filtrarProyectos() {
    return TODOS_LOS_PROYECTOS.filter((proyecto) => {
      const pasaCategoria = estadoFiltros.categoria === "todas" || proyecto.categoria === estadoFiltros.categoria;
      const pasaTipo = estadoFiltros.tipo === "todos" || proyecto.tipo === estadoFiltros.tipo;
      return pasaCategoria && pasaTipo;
    });
  }

  /**
   * Vuelve a dibujar toda la grilla del portfolio agrupada por categoría,
   * respetando el orden de ORDEN_CATEGORIAS.
   */
  function renderizarPortfolio() {
    const proyectosFiltrados = filtrarProyectos();
    contenedorPortfolio.innerHTML = "";

    let huboResultados = false;

    ORDEN_CATEGORIAS.forEach((categoria) => {
      const proyectosDeCategoria = proyectosFiltrados.filter((p) => p.categoria === categoria);
      if (proyectosDeCategoria.length === 0) return;

      huboResultados = true;

      const bloqueCategoria = document.createElement("div");
      bloqueCategoria.className = "portfolio__categoria";
      bloqueCategoria.innerHTML = `
        <h3 class="portfolio__categoria-titulo">
          ${categoria}
          <span class="cantidad">(${proyectosDeCategoria.length})</span>
        </h3>
        <div class="portfolio__grilla"></div>
      `;

      const grilla = bloqueCategoria.querySelector(".portfolio__grilla");
      proyectosDeCategoria.forEach((proyecto) => {
        grilla.appendChild(crearTarjeta(proyecto));
      });

      contenedorPortfolio.appendChild(bloqueCategoria);
    });

    if (!huboResultados) {
      contenedorPortfolio.innerHTML = `<p class="portfolio__vacio">No hay obras que coincidan con estos filtros.</p>`;
    }
  }

  /**
   * Arma los botones de filtro (categoría y tipo) una sola vez al cargar.
   */
  function inicializarFiltros() {
    // Filtro por categoría: "Todas" + las 3 categorías, en orden fijo
    const opcionesCategoria = [{ valor: "todas", etiqueta: "Todas" }].concat(
      ORDEN_CATEGORIAS.map((categoria) => ({ valor: categoria, etiqueta: categoria }))
    );
    renderizarBotonesFiltro(contenedorFiltrosCategoria, opcionesCategoria, "categoria");

    // Filtro por tipo: "Todos" + los tipos que realmente existen en los datos
    const tiposPresentes = Array.from(new Set(TODOS_LOS_PROYECTOS.map((p) => p.tipo)));
    const opcionesTipo = [{ valor: "todos", etiqueta: "Todos" }].concat(
      tiposPresentes.map((clave) => ({ valor: clave, etiqueta: NOMBRES_TIPO[clave] || clave }))
    );
    renderizarBotonesFiltro(contenedorFiltrosTipo, opcionesTipo, "tipo");
  }

  function renderizarBotonesFiltro(contenedor, opciones, tipoDeFiltro) {
    if (!contenedor) return;
    contenedor.innerHTML = "";
    opciones.forEach((opcion) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filtro-btn" + (opcion.valor === estadoFiltros[tipoDeFiltro] ? " activo" : "");
      btn.textContent = opcion.etiqueta;
      btn.addEventListener("click", function () {
        estadoFiltros[tipoDeFiltro] = opcion.valor;
        contenedor.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");
        renderizarPortfolio();
      });
      contenedor.appendChild(btn);
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
      modal.querySelector("[data-modal-leed]").textContent = proyecto.leed;
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
  inicializarFiltros();
  renderizarPortfolio();
})();
