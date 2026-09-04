/*
 * ============================================================================
 *  MAIN — arma el contenido de texto de cada sección (leyendo
 *  DATOS_EPARQ.contenido en js/datos-proyectos.js) y maneja el
 *  comportamiento general del sitio: menú mobile, header que cambia de
 *  fondo al scrollear, año del footer, equipo, datos de contacto/footer
 *  y el envío del formulario de contacto por mailto.
 * ============================================================================
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     CONTENIDO DE LAS SECCIONES — hero, "El estudio", servicios y los
     encabezados (eyebrow + título) de obras/equipo/contacto. Todo el
     texto sale de DATOS_EPARQ.contenido, así que para cambiarlo alcanza
     con editar js/datos-proyectos.js — nunca hace falta tocar este archivo.
     ------------------------------------------------------------------ */
  if (typeof DATOS_EPARQ !== "undefined") {
    const c = DATOS_EPARQ.contenido;
    const estudioInfo = DATOS_EPARQ.estudio;

    function setTexto(selector, texto) {
      const el = document.querySelector(selector);
      if (el) el.textContent = texto;
    }

    function escaparHtml(texto) {
      const div = document.createElement("div");
      div.textContent = texto;
      return div.innerHTML;
    }

    // Convierte *una palabra* entre asteriscos en <em>una palabra</em>,
    // que se muestra en la tipografía serif itálica de acento (ver CSS).
    // El resto del texto se escapa igual, así no hay riesgo de HTML roto.
    function conAcentoItalica(texto) {
      return escaparHtml(texto).replace(/\*(.+?)\*/g, "<em>$1</em>");
    }

    // --- Hero ---
    // Si "titulo" queda vacío (a propósito, para no mostrar título), el
    // <h1> se oculta del todo — nunca se muestra un texto de reemplazo.
    const elHeroTitulo = document.querySelector("[data-hero-titulo]");
    if (elHeroTitulo) {
      if (c.hero.titulo) {
        elHeroTitulo.style.display = "";
        elHeroTitulo.innerHTML = conAcentoItalica(c.hero.titulo);
        elHeroTitulo.classList.remove("hero__titulo--chico", "hero__titulo--grande");
        if (c.hero.tamanioTitulo === "chico") elHeroTitulo.classList.add("hero__titulo--chico");
        if (c.hero.tamanioTitulo === "grande") elHeroTitulo.classList.add("hero__titulo--grande");
      } else {
        elHeroTitulo.style.display = "none";
      }
    }
    setTexto("[data-hero-bajada]", c.hero.bajada);
    const listaServiciosHero = document.querySelector("[data-hero-servicios]");
    if (listaServiciosHero) {
      listaServiciosHero.innerHTML = estudioInfo.servicios.map((s) => `<li>${s}</li>`).join("");
    }
    const botonCta = document.querySelector("[data-hero-cta]");
    if (botonCta) {
      if (c.hero.cta) {
        setTexto("[data-hero-cta-texto]", c.hero.cta);
      } else {
        botonCta.style.display = "none";
      }
    }

    // --- El estudio ---
    setTexto("[data-estudio-eyebrow]", c.estudio.eyebrow);
    setTexto("[data-estudio-titulo]", c.estudio.titulo);
    const parrafosEstudio = document.querySelector("[data-estudio-parrafos]");
    if (parrafosEstudio) {
      parrafosEstudio.innerHTML = c.estudio.parrafos.map((p) => `<p>${p}</p>`).join("");
    }
    const datosEstudio = document.querySelector("[data-estudio-datos]");
    if (datosEstudio) {
      datosEstudio.innerHTML = c.estudio.datosDestacados
        .map(
          (d) => `
        <div class="estudio__dato">
          <dt>${d.titulo}</dt>
          <dd>${d.valor}${d.nota ? ` <small>${d.nota}</small>` : ""}</dd>
        </div>`
        )
        .join("");
    }

    // --- Servicios ---
    setTexto("[data-servicios-eyebrow]", c.servicios.eyebrow);
    setTexto("[data-servicios-titulo]", c.servicios.titulo);
    setTexto("[data-servicios-bajada]", c.servicios.bajada);
    const grillaServicios = document.querySelector("[data-servicios-grilla]");
    if (grillaServicios) {
      grillaServicios.innerHTML = c.servicios.items
        .map(
          (item) => `
        <article class="servicio">
          <span class="servicio__numero">${item.numero}</span>
          <h3>${item.titulo}</h3>
          <p>${item.descripcion}</p>
        </article>`
        )
        .join("");
    }

    // --- Encabezados de Obras / Equipo / Contacto ---
    setTexto("[data-obras-eyebrow]", c.obras.eyebrow);
    setTexto("[data-obras-titulo]", c.obras.titulo);
    setTexto("[data-obras-bajada]", c.obras.bajada);
    setTexto("[data-equipo-eyebrow]", c.equipo.eyebrow);
    setTexto("[data-equipo-titulo]", c.equipo.titulo);
    setTexto("[data-contacto-eyebrow]", c.contacto.eyebrow);
    setTexto("[data-contacto-titulo]", c.contacto.titulo);

    // --- Datos de contacto (dirección / teléfono / mail) + mapa ---
    // Solo la dirección acá — el teléfono/mail general quedó reemplazado
    // por las tarjetas de "contactosDirectos" (Diego, Mariano) de abajo,
    // para no duplicar datos. El footer sí sigue mostrando los 3 datos.
    const listaContacto = document.querySelector("[data-contacto-datos]");
    if (listaContacto) {
      listaContacto.innerHTML = `
        <div><dt>Dirección</dt><dd>${estudioInfo.direccion}</dd></div>
      `;
    }
    const mapaIframe = document.querySelector("[data-contacto-mapa]");
    if (mapaIframe) {
      mapaIframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(estudioInfo.direccionParaMapa) + "&output=embed";
    }

    // --- Contactos directos (además de los datos generales de arriba) ---
    const contenedorDirectos = document.querySelector("[data-contacto-directos]");
    if (contenedorDirectos && c.contacto.contactosDirectos && c.contacto.contactosDirectos.length) {
      contenedorDirectos.innerHTML = c.contacto.contactosDirectos
        .map(
          (persona) => `
        <div class="contacto__directo">
          <p class="contacto__directo-nombre">${persona.titulo ? persona.titulo + " " : ""}${persona.nombre}</p>
          <p class="contacto__directo-dato"><a href="tel:${persona.telefonoHref}">${persona.telefono}</a></p>
          <p class="contacto__directo-dato"><a href="mailto:${persona.email}">${persona.email}</a></p>
        </div>`
        )
        .join("");
    }

    // --- Footer (mismos datos de contacto, ya que no cambian entre secciones) ---
    setTexto("[data-footer-nombre]", estudioInfo.nombre);
    setTexto("[data-footer-nombre-copy]", estudioInfo.nombre);
    const listaFooter = document.querySelector("[data-footer-datos]");
    if (listaFooter) {
      listaFooter.innerHTML = `
        <li>${estudioInfo.direccion}</li>
        <li><a href="tel:${estudioInfo.telefonoHref}">${estudioInfo.telefono}</a></li>
        <li><a href="mailto:${estudioInfo.email}">${estudioInfo.email}</a></li>
      `;
    }
  }

  /* ------------------------------------------------------------------
     MENÚ MOBILE (hamburguesa)
     ------------------------------------------------------------------ */
  const botonMenu = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (botonMenu && nav) {
    botonMenu.addEventListener("click", function () {
      const abierto = nav.classList.toggle("nav--abierto");
      botonMenu.classList.toggle("activo", abierto);
      botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
      document.body.classList.toggle("menu-abierto", abierto);
    });

    // Cerrar el menú mobile al hacer clic en cualquier link de navegación
    nav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("nav--abierto");
        botonMenu.classList.remove("activo");
        botonMenu.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-abierto");
      });
    });
  }

  /* ------------------------------------------------------------------
     HEADER: pasa a tener fondo blanco una vez que se scrollea
     un poco (arranca "transparente" sobre la foto del hero)
     ------------------------------------------------------------------ */
  const header = document.querySelector("[data-header]");
  if (header) {
    function actualizarHeader() {
      header.classList.toggle("header--con-fondo", window.scrollY > 40);
    }
    actualizarHeader();
    window.addEventListener("scroll", actualizarHeader, { passive: true });
  }

  /* ------------------------------------------------------------------
     AÑO DINÁMICO EN EL FOOTER
     ------------------------------------------------------------------ */
  const spanAnio = document.querySelector("[data-anio-actual]");
  if (spanAnio) spanAnio.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     EQUIPO — genera las 3 tarjetas de socios desde DATOS_EPARQ.socios
     ------------------------------------------------------------------ */
  const contenedorEquipo = document.querySelector("[data-equipo-grilla]");
  if (contenedorEquipo && typeof DATOS_EPARQ !== "undefined") {
    DATOS_EPARQ.socios.forEach((socio) => {
      const iniciales = socio.nombre
        .split(" ")
        .map((palabra) => palabra[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      const tarjeta = document.createElement("article");
      tarjeta.className = "persona";
      tarjeta.innerHTML = `
        <div class="persona__foto-wrap">
          <img src="${socio.foto}" alt="Foto de ${socio.nombre}" loading="lazy" />
          <div class="persona__foto-placeholder" style="display:none;">
            <span>${iniciales}</span>
          </div>
        </div>
        <h3 class="persona__nombre">${socio.nombre}</h3>
        <p class="persona__titulo">${socio.titulo}</p>
        <p class="persona__rol">${socio.rol}</p>
      `;

      // Si la foto del socio todavía no existe, mostramos el placeholder con sus iniciales
      const img = tarjeta.querySelector("img");
      img.addEventListener("error", function () {
        img.remove();
        tarjeta.querySelector(".persona__foto-placeholder").style.display = "flex";
      });

      contenedorEquipo.appendChild(tarjeta);
    });
  }

  /* ------------------------------------------------------------------
     RESTO DEL EQUIPO — lista agrupada por categoría (Asociados Senior,
     Semi Senior, Juniors...), desde DATOS_EPARQ.equipoAmpliado
     ------------------------------------------------------------------ */
  const contenedorEquipoAmpliado = document.querySelector("[data-equipo-ampliado]");
  if (contenedorEquipoAmpliado && typeof DATOS_EPARQ !== "undefined" && DATOS_EPARQ.equipoAmpliado) {
    contenedorEquipoAmpliado.innerHTML = DATOS_EPARQ.equipoAmpliado
      .map(
        (grupo) => `
      <div class="equipo__categoria">
        <h4 class="equipo__categoria-titulo">${grupo.categoria}</h4>
        <ul class="equipo__categoria-lista">
          ${grupo.personas.map((p) => `<li><strong>${p.nombre}</strong><span>${p.titulo}</span></li>`).join("")}
        </ul>
      </div>`
      )
      .join("");
  }

  /* ------------------------------------------------------------------
     FORMULARIO DE CONTACTO (vía Web3Forms, sin backend propio ni cuenta)
     La clave de Web3Forms vive en contenido.contacto.formularioClave
     (datos-proyectos.js, o desde herramientas/editor.html). Ver README.md,
     sección 6, para conseguir esa clave (no hace falta crear cuenta, solo
     tu mail — te la mandan por correo).
     ------------------------------------------------------------------ */
  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
  const formulario = document.querySelector("[data-formulario-contacto]");
  if (formulario) {
    const clave = DATOS_EPARQ.contenido.contacto.formularioClave;
    const elEstado = formulario.querySelector("[data-formulario-estado]");
    const botonEnviar = formulario.querySelector('button[type="submit"]');

    formulario.addEventListener("submit", async function (evento) {
      evento.preventDefault();

      if (!clave) {
        mostrarEstado("El formulario todavía no está conectado. Mientras tanto, escribinos directo a " + DATOS_EPARQ.estudio.email + ".", "error");
        return;
      }

      const textoOriginal = botonEnviar.textContent;
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";
      mostrarEstado("", "");

      // Armamos el cuerpo en JSON (formato que pide Web3Forms) a partir
      // de los campos del formulario, sumando la clave y un asunto fijo.
      const datosFormulario = new FormData(formulario);
      const payload = { access_key: clave, subject: "Consulta desde la web" };
      datosFormulario.forEach((valor, campo) => { payload[campo] = valor; });

      try {
        const respuesta = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const resultado = await respuesta.json();

        if (!respuesta.ok || !resultado.success) throw new Error(resultado.message || "Web3Forms respondió con error");

        formulario.reset();
        mostrarEstado("¡Gracias! Tu consulta fue enviada, te vamos a responder a la brevedad.", "ok");
      } catch (error) {
        mostrarEstado("No pudimos enviar el mensaje. Escribinos directo a " + DATOS_EPARQ.estudio.email + ".", "error");
      } finally {
        botonEnviar.disabled = false;
        botonEnviar.textContent = textoOriginal;
      }
    });

    function mostrarEstado(texto, tipo) {
      if (!elEstado) return;
      elEstado.textContent = texto;
      elEstado.className = "formulario__estado" + (tipo ? " formulario__estado--" + tipo : "");
    }
  }
})();
