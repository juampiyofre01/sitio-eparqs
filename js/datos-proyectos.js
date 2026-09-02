/*
 * ============================================================================
 *  CONTENIDO DEL SITIO — TODO LO EDITABLE EN UN SOLO LUGAR
 * ============================================================================
 *  Este archivo es la ÚNICA fuente de contenido del sitio: los textos de
 *  cada sección (hero, "El estudio", servicios, títulos), los datos del
 *  estudio, los 3 socios y los 51 proyectos. index.html es solo el
 *  "molde" (estructura y estilos); portfolio.js y main.js leen esta
 *  constante y arman el contenido automáticamente al cargar la página.
 *
 *  ¿QUÉ QUIERO CAMBIAR?                    ¿DÓNDE LO EDITO ACÁ ABAJO?
 *  -----------------------------------------------------------------
 *  Frase de portada (hero)                  contenido.hero
 *  Texto de "El estudio" y los 4 datos       contenido.estudio
 *  Los 4 servicios (título + texto)          contenido.servicios
 *  Bajada de la sección "Obras"              contenido.obras
 *  Título de la sección "Equipo"             contenido.equipo
 *  Título de la sección "Contacto"           contenido.contacto
 *  Dirección, teléfono, mail, nombre         estudio (más abajo)
 *  Los 3 socios                              socios (más abajo)
 *  Los proyectos del portfolio               proyectos (más abajo) — o con herramientas/editor.html
 *
 *  IMPORTANTE al editar texto: todo va entre comillas dobles " ". Si el
 *  texto necesita llevar una comilla, usá la comilla simple ' (no la
 *  doble), porque una comilla doble suelta corta el texto y rompe el
 *  archivo. Por lo demás, es escribir como en cualquier procesador de
 *  texto: cambiás lo que está entre comillas y dejás las comas y llaves
 *  { } tal cual están.
 *
 *  ¿Por qué un archivo .js y no un .json "puro"?
 *  Porque así el sitio funciona abriendo index.html con doble clic, sin
 *  necesidad de un servidor local (un fetch() a un .json local falla por
 *  CORS en la mayoría de los navegadores si no hay servidor de por medio).
 *  La estructura es igual a un JSON, solo que empieza con "const DATOS_EPARQ ="
 *  y termina con ";".
 *
 *  CÓMO AGREGAR / EDITAR UN PROYECTO
 *  Copiá un bloque { ... } dentro del arreglo "proyectos" (más abajo) y
 *  completá los campos. También podés usar herramientas/editor.html, que
 *  arma este bloque por vos con menús desplegables (ver ese archivo).
 *
 *    cliente   → nombre del cliente
 *    obra      → nombre de la obra
 *    ubicacion → ciudad/localidad, provincia
 *    m2        → superficie en m² (número, sin puntos ni comas). Si no aplica
 *                (ej. un predio medido en hectáreas), poné null y usá "nota_m2"
 *    nota_m2   → (opcional) aclaración cuando m2 no alcanza para describirlo
 *    rol       → rol de EPARQS en la obra
 *    anio      → año o rango de años (texto, ej. "2023-2025")
 *    tipo      → "logistico-industrial" | "residencial-oficinas" | "otros"
 *                (define en qué de las 3 categorías del portfolio aparece
 *                la obra — son las mismas 3 que se ven como tabs en la web)
 *    categoria → "En ejecución" | "Últimos concluidos" | "Terminados"
 *                (define en qué grupo del portfolio aparece la obra — para
 *                cambiar el estado de un proyecto, cambiá SOLO este campo)
 *    leed      → (opcional) texto de la certificación, ej. "LEED Gold".
 *                Si el proyecto no tiene, se omite el campo directamente.
 *    imagen    → ruta a la foto de portada de la obra, dentro de su carpeta
 *                en img/proyectos/. Mientras no haya ninguna foto, se
 *                muestra automáticamente un placeholder prolijo con el
 *                nombre de la obra (ver /img/proyectos/LEEME.txt)
 *    imagenes  → (opcional) arreglo con más fotos para la ficha ampliada
 *                (lightbox). Se arma solo — ver más abajo "FOTOS DE LAS OBRAS"
 *
 *  FOTOS DE LAS OBRAS
 *  Cada obra tiene su propia carpeta en img/proyectos/, nombrada
 *  "<año>-<obra>" (ej. img/proyectos/2025-ocasa-centro-distribucion-pilar/).
 *  Para agregar o sacar fotos de una obra, metés o borrás archivos DENTRO
 *  de esa carpeta (cualquier nombre sirve) y después corrés
 *  "Actualizar fotos.bat" (en la carpeta principal del sitio) — actualiza
 *  solo los campos "imagen" e "imagenes" de acá abajo. No hace falta tocar
 *  este archivo a mano para las fotos.
 * ============================================================================
 */

const DATOS_EPARQ = {

  // Datos generales del estudio, usados en el header, footer y sección "Contacto"
  // ===== INICIO: estudio (no toques esta línea) =====
  estudio: {
    nombre: "Escarrá Pradier & Asociados",
    abreviatura: "EPARQS",
    desde: 1996,
    direccion: "Maure 1687, piso 8B (C1426), Ciudad Autónoma de Buenos Aires",
    direccionParaMapa: "Maure 1687, Buenos Aires, Argentina",
    telefono: "+54 9 11 4528-0619",
    telefonoHref: "+541145280619",
    email: "mariano@webmigone.com.ar",
    servicios: [
      "Proyecto",
      "Dirección de obra",
      "Gerenciamiento",
      "Interiorismo",
    ],
    descripcion: "Estudio de arquitectura establecido desde 1996, dedicado al diseño arquitectónico, la ingeniería y el interiorismo para clientes locales e internacionales. Nuestra obra abarca edificios industriales, centros logísticos, oficinas corporativas y desarrollos residenciales y náuticos. Somos miembros de Sustainable Development Advisors (SDA) y contamos con una extensa trayectoria en edificios certificados LEED por el USGBC.",
  },
  // ===== FIN: estudio =====

  // ---------------------------------------------------------------------
  // CONTENIDO DE CADA SECCIÓN — textos e imágenes de encabezado.
  // Este es el lugar más probable donde vas a querer hacer cambios
  // después de mostrarle el sitio a alguien más. Más simple todavía:
  // herramientas/editor.html también tiene un formulario para todo esto,
  // con "Guardar cambios" para no tener que editar este archivo a mano.
  // ---------------------------------------------------------------------
  // ===== INICIO: contenido (no toques esta línea) =====
  contenido: {
    hero: {
      bajada: "Desde 1996 proyectamos y dirigimos obras industriales, logísticas y corporativas con visión integral, compromiso y excelencia técnica.",
      cta: "Conocé nuestro estudio",
      tamanioTitulo: "chico",
    },
    estudio: {
      eyebrow: "El estudio",
      titulo: "Más de 30 años de trayectoria en obra industrial y corporativa",
      parrafos: [
        "Somos un estudio de arquitectura con sede en Buenos Aires, establecido desde 1996. Proyectamos y dirigimos edificios industriales, centros logísticos, oficinas corporativas y desarrollos residenciales y náuticos para clientes locales e internacionales.",
        "Nuestro trabajo integra el diseño arquitectónico, la ingeniería y el interiorismo bajo un mismo equipo, lo que nos permite acompañar cada obra desde el anteproyecto hasta su puesta en marcha.",
        "Somos miembros de Sustainable Development Advisors (SDA) y contamos con una extensa trayectoria en edificios certificados LEED por el USGBC, reflejo de un compromiso sostenido con la sustentabilidad en cada proyecto.",
      ],
      datosDestacados: [
        {
          titulo: "Fundado en",
          valor: "1996",
        },
        {
          titulo: "Experiencia",
          valor: "+1.000.000 m²",
          nota: "Proyectados",
        },
        {
          titulo: "Membresía",
          valor: "SDA",
          nota: "Sustainable Development Advisors",
        },
        {
          titulo: "Certificación",
          valor: "LEED Gold",
          nota: "+300.000 m²",
        },
      ],
    },
    servicios: {
      eyebrow: "Servicios",
      titulo: "Cuatro áreas, un mismo equipo",
      bajada: "Acompañamos la obra en las etapas que el cliente necesite, de forma integral o independiente.",
      items: [
        {
          numero: "01",
          titulo: "Proyecto",
          descripcion: "Desarrollo del proyecto arquitectónico y de ingeniería, desde el anteproyecto hasta la documentación ejecutiva necesaria para construir.",
        },
        {
          numero: "02",
          titulo: "Dirección de obra",
          descripcion: "Supervisión técnica en el sitio para asegurar que la obra se ejecute conforme al proyecto, en tiempo, calidad y presupuesto.",
        },
        {
          numero: "03",
          titulo: "Gerenciamiento",
          descripcion: "Coordinación integral de proveedores, contratistas y cronograma, representando los intereses del cliente durante toda la obra.",
        },
        {
          numero: "04",
          titulo: "Interiorismo",
          descripcion: "Diseño de espacios interiores corporativos y residenciales, con foco en funcionalidad, estética y experiencia de uso.",
        },
      ],
    },
    obras: {
      eyebrow: "Portfolio",
      titulo: "Obras",
      bajada: "Una selección de proyectos en ejecución y concluidos, para clientes como Mercedes-Benz, Quilmes, DOW, CCU, Unilever, Garbarino, MSU Agro y Grupo Simpa, entre otros.",
    },
    equipo: {
      eyebrow: "Equipo",
      titulo: "Socios",
    },
    contacto: {
      eyebrow: "Contacto",
      titulo: "Hablemos de tu proyecto",
      emailsConsulta: [
        "escarrad@gmail.com",
        "mariano@webmigone.com.ar",
      ],
      contactosDirectos: [
        {
          nombre: "Diego Escarrá",
          titulo: "Arq.",
          telefono: "+54 9 11 4425-8211",
          telefonoHref: "+5491144258211",
          email: "escarrad@gmail.com",
        },
        {
          nombre: "Mariano Migone",
          titulo: "Ing.",
          telefono: "+54 9 11 4528-0619",
          telefonoHref: "+5491145280619",
          email: "mariano@webmigone.com.ar",
        },
      ],
    },
  },
  // ===== FIN: contenido =====

  // Los tres socios del estudio — sección "Equipo". La foto de cada uno
  // se cambia reemplazando el archivo en img/equipo/ (ver LEEME ahí).
  // ===== INICIO: socios (no toques esta línea) =====
  socios: [
    {
      nombre: "Diego Escarrá",
      titulo: "Arquitecto — UBA, 1980",
      rol: "Diseño de edificios de distinta escala; apasionado por la sustentabilidad, el paisajismo y el medio ambiente.",
      foto: "img/equipo/diego-escarra.jpg",
    },
    {
      nombre: "Marlene Pradier",
      titulo: "Arquitecta — UBA, 1984",
      rol: "Lidera el equipo de interiorismo; experiencia en diseño arquitectónico, funcionalidad y estética.",
      foto: "img/equipo/marlene-pradier.jpg",
    },
    {
      nombre: "Mariano Migone",
      titulo: "Ingeniero Civil — UCA, 1986",
      rol: "Lidera los proyectos desde lo estructural; especialista en análisis de propuestas y proveedores.",
      foto: "img/equipo/mariano-migone.jpg",
    },
  ],
  // ===== FIN: socios =====

  // Resto del equipo (además de los 3 socios gerentes de arriba), agrupado
  // por nivel — se muestra como lista simple, sin foto, debajo de las
  // tarjetas de los socios. Para agregar/sacar categorías enteras hay que
  // editar esto a mano; para agregar/sacar personas DENTRO de una
  // categoría que ya existe, se puede usar herramientas/editor.html.
  // ===== INICIO: equipoAmpliado (no toques esta línea) =====
  equipoAmpliado: [
    {
      categoria: "Asociados Senior",
      personas: [
        {
          nombre: "Bernardo García Hervás",
          titulo: "Arq. — UBA, 1985",
        },
        {
          nombre: "Pablo Medina",
          titulo: "Arq. — UBA, 2003",
        },
      ],
    },
    {
      categoria: "Semi Senior",
      personas: [
        {
          nombre: "Constanza Migone",
          titulo: "Arq. — UBA, 2016",
        },
      ],
    },
    {
      categoria: "Juniors",
      personas: [
        {
          nombre: "Sofía Gelly y Obes",
          titulo: "Arq. — UBA, 2024",
        },
        {
          nombre: "Juan Pablo Yofre",
          titulo: "Ing. Civil — UBA, 2025",
        },
        {
          nombre: "Felipe Bonadeo",
          titulo: "Ing. Civil — UBA, 2026",
        },
        {
          nombre: "Hernán Schumacher",
          titulo: "Arq. — Belgrano, 2026",
        },
        {
          nombre: "Agustín Paz Naón",
          titulo: "Ingeniería Civil — UBA",
        },
      ],
    },
  ],
  // ===== FIN: equipoAmpliado =====

  // ---------------------------------------------------------------------
  // PROYECTOS — un solo arreglo con los 51 proyectos. El campo "categoria"
  // define en qué grupo del portfolio aparece cada uno. Para cambiar el
  // estado de una obra (por ejemplo, cuando se termina), CAMBIÁ SOLO ESE
  // CAMPO — no hace falta mover el bloque de ningún lado.
  //
  //   categoria → "En ejecución" | "Últimos concluidos" | "Terminados"
  //               (tiene que ser EXACTAMENTE uno de estos 3 textos)
  //
  // Más simple: usá herramientas/editor.html (doble clic, funciona en
  // Chrome/Edge). Ahí editás todo con menús desplegables, incluidas las
  // fotos, y el botón "Guardar cambios" actualiza este archivo solo — no
  // hace falta copiar y pegar nada. Si igual preferís editar a mano,
  // reemplazá TODO lo que está entre estas dos marcas (inclusive).
  // ---------------------------------------------------------------------
  // ===== INICIO: proyectos (no toques esta línea) =====
  proyectos: [
    { cliente: "OCASA", obra: "Centro de distribución", ubicacion: "Pilar, Buenos Aires", m2: 41000, rol: "Proyecto y dirección ejecutiva", anio: "2025", tipo: "logistico-industrial", categoria: "En ejecución", imagen: "img/proyectos/2025-ocasa-centro-distribucion-pilar/1.jpg", imagenes: ["img/proyectos/2025-ocasa-centro-distribucion-pilar/1.jpg", "img/proyectos/2025-ocasa-centro-distribucion-pilar/2.jpg", "img/proyectos/2025-ocasa-centro-distribucion-pilar/3.jpg"] },
    { cliente: "Mercedes-Benz Camiones y Buses", obra: "Nueva planta de producción de camiones y buses — Warehouse", ubicacion: "RN 9 Colectora Sur, Zárate, Buenos Aires", m2: 43000, nota_m2: "43.000 m² cubiertos + 45.000 m² de pavimentos", rol: "Proyecto y dirección de obra", anio: "2023-2025", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2023-mercedes-benz-camiones-buses-zarate/1.jpg", imagenes: ["img/proyectos/2023-mercedes-benz-camiones-buses-zarate/1.jpg", "img/proyectos/2023-mercedes-benz-camiones-buses-zarate/2.jpg", "img/proyectos/2023-mercedes-benz-camiones-buses-zarate/3.jpg", "img/proyectos/2023-mercedes-benz-camiones-buses-zarate/4.jpg", "img/proyectos/2023-mercedes-benz-camiones-buses-zarate/5.jpg"] },
    { cliente: "Yazaki Group", obra: "Expansión centro de autopartes", ubicacion: "Loma Verde / Escobar, Buenos Aires", m2: 6000, rol: "Proyecto y dirección ejecutiva", anio: "2025", tipo: "logistico-industrial", categoria: "En ejecución", imagen: "img/proyectos/2025-yazaki-expansion-autopartes/1.jpg" },
    { cliente: "Grupo Corven", obra: "Nueva planta automotriz (KD) — Etapa 1", ubicacion: "Otamendi, Campana, Buenos Aires", m2: 43000, rol: "Proyecto y dirección ejecutiva", anio: "2026", tipo: "logistico-industrial", categoria: "En ejecución", imagen: "img/proyectos/2026-corven-planta-automotriz-otamendi/1.jpg", imagenes: ["img/proyectos/2026-corven-planta-automotriz-otamendi/1.jpg", "img/proyectos/2026-corven-planta-automotriz-otamendi/2.jpg", "img/proyectos/2026-corven-planta-automotriz-otamendi/3.jpg"] },
    { cliente: "Galletitas Trío", obra: "Nueva planta de producción de galletitas", ubicacion: "Polo Industrial Ezeiza, Buenos Aires", m2: 21000, rol: "Proyecto y dirección ejecutiva", anio: "2026", tipo: "logistico-industrial", categoria: "En ejecución", imagen: "img/proyectos/2026-corven-galletitas-trio-ezeiza/Render aereo 1.png", imagenes: ["img/proyectos/2026-corven-galletitas-trio-ezeiza/Render aereo 1.png", "img/proyectos/2026-corven-galletitas-trio-ezeiza/Render aereo 2.png", "img/proyectos/2026-corven-galletitas-trio-ezeiza/Render docks.png", "img/proyectos/2026-corven-galletitas-trio-ezeiza/Render peatonal.png"] },
    { cliente: "El Yacht", obra: "Residencia privada y cochera", ubicacion: "Barrio El Yacht, Nordelta, Buenos Aires", m2: 580, rol: "Proyecto", anio: "2025", tipo: "otros", categoria: "Terminados", imagen: "img/proyectos/2025-el-yacht-residencia-nordelta/1.jpg", imagenes: ["img/proyectos/2025-el-yacht-residencia-nordelta/1.jpg", "img/proyectos/2025-el-yacht-residencia-nordelta/3.jpg", "img/proyectos/2025-el-yacht-residencia-nordelta/4.jpg"] },
    { cliente: "MSU Agro S.A.", obra: "Planta de acopio y producción de maní", ubicacion: "Rufino, Santa Fe", m2: 63000, rol: "Revisión de proyecto y dirección de obra", anio: "2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-msu-agro-planta-mani-rufino/1.jpg", imagenes: ["img/proyectos/2024-msu-agro-planta-mani-rufino/1.jpg", "img/proyectos/2024-msu-agro-planta-mani-rufino/2.jpg", "img/proyectos/2024-msu-agro-planta-mani-rufino/3.jpg"] },
    { cliente: "MSU Agro S.A.", obra: "Planta de clasificación de semillas", ubicacion: "Villa Cañás, Santa Fe", m2: 12000, rol: "Proyecto", anio: "2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-msu-agro-clasificacion-semillas-villa-canas/1.jpg", imagenes: ["img/proyectos/2024-msu-agro-clasificacion-semillas-villa-canas/1.jpg", "img/proyectos/2024-msu-agro-clasificacion-semillas-villa-canas/2.jpg", "img/proyectos/2024-msu-agro-clasificacion-semillas-villa-canas/3.jpg"] },
    { cliente: "PBB Polisur S.A. (DOW Chemical)", obra: "Centro logístico — Naves 1 y 2", ubicacion: "Parque Industrial Escobar, Buenos Aires", m2: 62000, rol: "Anteproyecto y supervisión técnica / Owner representative", anio: "2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-pbb-polisur-centro-logistico-naves-1-2/1.jpg", imagenes: ["img/proyectos/2024-pbb-polisur-centro-logistico-naves-1-2/1.jpg", "img/proyectos/2024-pbb-polisur-centro-logistico-naves-1-2/3.jpg"] },
    { cliente: "PBB Polisur S.A. (DOW Chemical)", obra: "Centro logístico", ubicacion: "Parque Industrial Pilar, Buenos Aires", m2: 51000, rol: "Anteproyecto y supervisión técnica / Owner representative", anio: "2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-pbb-polisur-centro-logistico-pilar/1.jpg", imagenes: ["img/proyectos/2024-pbb-polisur-centro-logistico-pilar/1.jpg", "img/proyectos/2024-pbb-polisur-centro-logistico-pilar/3.jpg"] },
    { cliente: "PBB Polisur S.A. (DOW Chemical)", obra: "Nuevas oficinas corporativas — Interiorismo", ubicacion: "Bouchard 710, Puerto Madero, Buenos Aires", m2: 1800, rol: "Proyecto y supervisión de obra", anio: "2024", tipo: "residencial-oficinas", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-pbb-polisur-oficinas-puerto-madero/1.jpg", imagenes: ["img/proyectos/2024-pbb-polisur-oficinas-puerto-madero/1.jpg", "img/proyectos/2024-pbb-polisur-oficinas-puerto-madero/2.jpg", "img/proyectos/2024-pbb-polisur-oficinas-puerto-madero/3.jpg"] },
    { cliente: "Plaza Logística S.A.", obra: "Ampliación centro de distribución — Naves 5 y 6", ubicacion: "Pacheco, Buenos Aires", m2: 50500, rol: "Proyecto y dirección ejecutiva", anio: "2023-2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2023-plaza-logistica-ampliacion-naves-5-6/1.jpg", imagenes: ["img/proyectos/2023-plaza-logistica-ampliacion-naves-5-6/1.jpg", "img/proyectos/2023-plaza-logistica-ampliacion-naves-5-6/2.jpg", "img/proyectos/2023-plaza-logistica-ampliacion-naves-5-6/3.jpg"] },
    { cliente: "Surfrigo", obra: "Ampliación cámara frigorífica y antecámara de acopio", ubicacion: "Ezeiza, Buenos Aires", m2: 15000, rol: "Proyecto y supervisión técnica", anio: "2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-surfrigo-ampliacion-camara-frigorifica/1.jpg" },
    { cliente: "Surfrigo", obra: "Nuevo centro de distribución y cámara frigorífica", ubicacion: "Rosario, Santa Fe", m2: 28000, rol: "Anteproyecto", anio: "2024", tipo: "logistico-industrial", categoria: "Últimos concluidos", imagen: "img/proyectos/2024-surfrigo-centro-distribucion-rosario/1.jpg" },
    { cliente: "Pradecon Racing", obra: "Salón recreativo — Interiorismo", ubicacion: "Belén de Escobar, Buenos Aires", m2: 400, rol: "Proyecto ejecutivo", anio: "2023-2024", tipo: "otros", categoria: "Últimos concluidos", imagen: "img/proyectos/2023-pradecon-racing-salon-recreativo/1.jpg", imagenes: ["img/proyectos/2023-pradecon-racing-salon-recreativo/1.jpg", "img/proyectos/2023-pradecon-racing-salon-recreativo/3.jpg", "img/proyectos/2023-pradecon-racing-salon-recreativo/4.jpg", "img/proyectos/2023-pradecon-racing-salon-recreativo/5.jpg"] },
    { cliente: "Grupo Govan", obra: "Edificio corporativo", ubicacion: "Parque Industrial Escobar, Buenos Aires", m2: 12200, rol: "Proyecto", anio: "2023", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2023-grupo-govan-edificio-corporativo/1.jpg", imagenes: ["img/proyectos/2023-grupo-govan-edificio-corporativo/1.jpg", "img/proyectos/2023-grupo-govan-edificio-corporativo/2.jpg", "img/proyectos/2023-grupo-govan-edificio-corporativo/3.jpg"] },
    { cliente: "Vanges S.A. para CCU", obra: "Nuevo centro logístico para CCU", ubicacion: "Benavídez, Buenos Aires", m2: 17300, rol: "Proyecto y dirección ejecutiva", anio: "2023", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2023-vanges-ccu-centro-logistico/1.jpg", imagenes: ["img/proyectos/2023-vanges-ccu-centro-logistico/1.jpg", "img/proyectos/2023-vanges-ccu-centro-logistico/2.jpg", "img/proyectos/2023-vanges-ccu-centro-logistico/3.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Lumina San Isidro", ubicacion: "Martínez, Buenos Aires", m2: 84500, rol: "Proyecto y dirección ejecutiva", anio: "2018-2023", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2018-simpa-lumina-san-isidro/1.jpg", imagenes: ["img/proyectos/2018-simpa-lumina-san-isidro/1.jpg", "img/proyectos/2018-simpa-lumina-san-isidro/2.jpg", "img/proyectos/2018-simpa-lumina-san-isidro/3.jpg"] },
    { cliente: "MSU Agro S.A.", obra: "Nuevo centro de clasificación y acopio de semillas", ubicacion: "Pampa del Infierno, Chaco", m2: 17200, rol: "Proyecto", anio: "2022", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2022-msu-agro-clasificacion-acopio-chaco/1.jpg", imagenes: ["img/proyectos/2022-msu-agro-clasificacion-acopio-chaco/1.jpg", "img/proyectos/2022-msu-agro-clasificacion-acopio-chaco/2.jpg", "img/proyectos/2022-msu-agro-clasificacion-acopio-chaco/3.jpg"] },
    { cliente: "Grupo J. N. Royo S.A.", obra: "Centro logístico integral — Etapa 2", ubicacion: "Pacheco, Malvinas Argentinas, Buenos Aires", m2: 27500, rol: "Proyecto y dirección ejecutiva", anio: "2022", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2022-royo-centro-logistico-etapa-2/1.jpg", imagenes: ["img/proyectos/2022-royo-centro-logistico-etapa-2/1.jpg", "img/proyectos/2022-royo-centro-logistico-etapa-2/2.jpg"] },
    { cliente: "Grupo Simpa", obra: "Nuevo centro logístico Lumina Pilar", ubicacion: "Parque Industrial Pilar, Buenos Aires", m2: 32200, rol: "Proyecto y dirección ejecutiva", anio: "2018-2021", tipo: "logistico-industrial", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2018-simpa-lumina-pilar/1.jpg", imagenes: ["img/proyectos/2018-simpa-lumina-pilar/1.jpg", "img/proyectos/2018-simpa-lumina-pilar/2.jpg", "img/proyectos/2018-simpa-lumina-pilar/3.jpg"] },
    { cliente: "Garbarino S.A.", obra: "Master plan y proyecto ejecutivo — Etapas 1 y 2", ubicacion: "La Tablada, Buenos Aires", m2: 18400, rol: "Proyecto y dirección ejecutiva", anio: "2016-2019", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2016-garbarino-master-plan-la-tablada/1.jpg", imagenes: ["img/proyectos/2016-garbarino-master-plan-la-tablada/1.jpg", "img/proyectos/2016-garbarino-master-plan-la-tablada/2.jpg"] },
    { cliente: "Cervecería y Maltería Quilmes", obra: "Ampliación del centro de distribución Mercado Central", ubicacion: "Mercado Central, Buenos Aires", m2: 8500, rol: "Proyecto y supervisión de obra", anio: "2018", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2018-quilmes-ampliacion-mercado-central/1.jpg", imagenes: ["img/proyectos/2018-quilmes-ampliacion-mercado-central/1.jpg", "img/proyectos/2018-quilmes-ampliacion-mercado-central/2.jpg", "img/proyectos/2018-quilmes-ampliacion-mercado-central/3.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Lumina Olivos Office", ubicacion: "Vicente López, Buenos Aires", m2: 24500, rol: "Proyecto y dirección ejecutiva", anio: "2017", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2017-simpa-lumina-olivos-office/1.jpg", imagenes: ["img/proyectos/2017-simpa-lumina-olivos-office/1.jpg", "img/proyectos/2017-simpa-lumina-olivos-office/2.jpg", "img/proyectos/2017-simpa-lumina-olivos-office/3.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Florida Office Center", ubicacion: "Vicente López, Buenos Aires", m2: 50000, rol: "Proyecto y dirección ejecutiva", anio: "2017", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2017-simpa-florida-office-center/1.jpg", imagenes: ["img/proyectos/2017-simpa-florida-office-center/1.jpg", "img/proyectos/2017-simpa-florida-office-center/2.jpg", "img/proyectos/2017-simpa-florida-office-center/3.jpg"] },
    { cliente: "Cervecería y Maltería Quilmes", obra: "Centro operativo, ampliación de depósitos y edificios anexos", ubicacion: "Acheral, Tucumán", m2: 18000, rol: "Proyecto y supervisión de obra", anio: "2016", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2016-quilmes-centro-operativo-acheral/1.jpg", imagenes: ["img/proyectos/2016-quilmes-centro-operativo-acheral/1.jpg", "img/proyectos/2016-quilmes-centro-operativo-acheral/2.jpg", "img/proyectos/2016-quilmes-centro-operativo-acheral/4.jpg"] },
    { cliente: "Mitre Construcciones (Grupo Marby S.A.)", obra: "Centro de operaciones para empresa Ashira", ubicacion: "Barracas, CABA", m2: 13800, rol: "Proyecto y dirección ejecutiva", anio: "2016", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2016-mitre-ashira-barracas/1.jpg", imagenes: ["img/proyectos/2016-mitre-ashira-barracas/1.jpg", "img/proyectos/2016-mitre-ashira-barracas/2.jpg", "img/proyectos/2016-mitre-ashira-barracas/3.jpg"] },
    { cliente: "IPS S.A.I.C.F.I.", obra: "Ampliación del centro de distribución", ubicacion: "Loma Hermosa, Buenos Aires", m2: 4500, rol: "Proyecto y dirección ejecutiva", anio: "2016", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2016-ips-ampliacion-centro-distribucion/1.jpg", imagenes: ["img/proyectos/2016-ips-ampliacion-centro-distribucion/1.jpg", "img/proyectos/2016-ips-ampliacion-centro-distribucion/2.jpg", "img/proyectos/2016-ips-ampliacion-centro-distribucion/3.jpg"] },
    { cliente: "Cervecería y Maltería Quilmes", obra: "Ampliación y refuncionalización de la planta operativa", ubicacion: "Godoy Cruz, Mendoza", m2: 35000, rol: "Proyecto y supervisión de obra", anio: "2015", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2015-quilmes-planta-operativa-godoy-cruz/1.jpg", imagenes: ["img/proyectos/2015-quilmes-planta-operativa-godoy-cruz/1.jpg", "img/proyectos/2015-quilmes-planta-operativa-godoy-cruz/2.jpg", "img/proyectos/2015-quilmes-planta-operativa-godoy-cruz/3.jpg"] },
    { cliente: "Fideicomiso Prima Office", obra: "Proyecto mixto de oficinas y estudios", ubicacion: "Ayres del Pilar, Pilar, Buenos Aires", m2: 9000, rol: "Proyecto y supervisión de obra", anio: "2015", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2015-fideicomiso-prima-office/1.jpg" },
    { cliente: "Grupo J. N. Royo S.A.", obra: "Centro logístico integral — Etapa 1", ubicacion: "Pacheco, Malvinas Argentinas, Buenos Aires", m2: 27900, rol: "Proyecto y dirección ejecutiva", anio: "2015", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2015-royo-centro-logistico-etapa-1/1.jpg" },
    { cliente: "Cervecería y Maltería Quilmes", obra: "Nuevo centro de distribución central y oficinas corporativas", ubicacion: "Mercado Central, Buenos Aires", m2: 35000, rol: "Proyecto y supervisión de obra", anio: "2013", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2013-quilmes-centro-distribucion-oficinas/1.jpg", imagenes: ["img/proyectos/2013-quilmes-centro-distribucion-oficinas/1.jpg", "img/proyectos/2013-quilmes-centro-distribucion-oficinas/2.jpg", "img/proyectos/2013-quilmes-centro-distribucion-oficinas/3.jpg"] },
    { cliente: "Marinas H — Villas Náuticas", obra: "Barrio privado náutico", ubicacion: "Rincón de Milberg, Tigre, Buenos Aires", m2: 35000, rol: "Gerenciamiento de proyecto", anio: "2014-2020", tipo: "otros", categoria: "Terminados", imagen: "img/proyectos/2014-marinas-h-villas-nauticas/1.jpg", imagenes: ["img/proyectos/2014-marinas-h-villas-nauticas/1.jpg", "img/proyectos/2014-marinas-h-villas-nauticas/3.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Lumina Thames Office", ubicacion: "San Isidro, Buenos Aires", m2: 32000, rol: "Proyecto y dirección ejecutiva", anio: "2012", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2012-simpa-lumina-thames-office/1.jpg", imagenes: ["img/proyectos/2012-simpa-lumina-thames-office/1.jpg", "img/proyectos/2012-simpa-lumina-thames-office/2.jpg"] },
    { cliente: "Unilever S.A.", obra: "Centro operativo Montevideo", ubicacion: "Montevideo, Uruguay", m2: 18900, rol: "Proyecto", anio: "2012", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2012-unilever-centro-operativo-montevideo/1.jpg", imagenes: ["img/proyectos/2012-unilever-centro-operativo-montevideo/1.jpg", "img/proyectos/2012-unilever-centro-operativo-montevideo/2.jpg", "img/proyectos/2012-unilever-centro-operativo-montevideo/4.jpg"] },
    { cliente: "Marine Park", obra: "Guardería náutica", ubicacion: "Rincón de Milberg, Tigre, Buenos Aires", m2: 7200, rol: "Proyecto y dirección ejecutiva", anio: "2012", tipo: "otros", categoria: "Terminados", imagen: "img/proyectos/2012-marine-park-guarderia-nautica/1.jpg", imagenes: ["img/proyectos/2012-marine-park-guarderia-nautica/1.jpg", "img/proyectos/2012-marine-park-guarderia-nautica/2.jpg", "img/proyectos/2012-marine-park-guarderia-nautica/3.jpg", "img/proyectos/2012-marine-park-guarderia-nautica/4.jpg"] },
    { cliente: "Greending Ugarte", obra: "Complejo de oficinas corporativas", ubicacion: "Vicente López, Buenos Aires", m2: 8300, rol: "Proyecto y dirección ejecutiva", anio: "2011", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2011-greending-ugarte-oficinas/1.jpg", imagenes: ["img/proyectos/2011-greending-ugarte-oficinas/1.jpg", "img/proyectos/2011-greending-ugarte-oficinas/2.jpg", "img/proyectos/2011-greending-ugarte-oficinas/3.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Lumina Panamericana", ubicacion: "Vicente López, Buenos Aires", m2: 39000, rol: "Proyecto y dirección ejecutiva", anio: "2011", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2011-simpa-lumina-panamericana/1.jpg", imagenes: ["img/proyectos/2011-simpa-lumina-panamericana/1.jpg", "img/proyectos/2011-simpa-lumina-panamericana/2.jpg"] },
    { cliente: "Colony Park", obra: "Barrio náutico", ubicacion: "Delta del Tigre, Buenos Aires", m2: null, nota_m2: "130 hectáreas", rol: "Proyecto y dirección ejecutiva", anio: "2011", tipo: "otros", categoria: "Terminados", imagen: "img/proyectos/2011-colony-park-barrio-nautico/1.jpg", imagenes: ["img/proyectos/2011-colony-park-barrio-nautico/1.jpg", "img/proyectos/2011-colony-park-barrio-nautico/2.jpg", "img/proyectos/2011-colony-park-barrio-nautico/3.jpg", "img/proyectos/2011-colony-park-barrio-nautico/4.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Lumina Puerto de Olivos", ubicacion: "Olivos, Buenos Aires", m2: 17600, rol: "Co-proyecto y dirección ejecutiva", anio: "2009", tipo: "residencial-oficinas", categoria: "Terminados", leed: "LEED Gold", imagen: "img/proyectos/2009-simpa-lumina-puerto-olivos/1.jpg", imagenes: ["img/proyectos/2009-simpa-lumina-puerto-olivos/1.jpg", "img/proyectos/2009-simpa-lumina-puerto-olivos/2.jpg", "img/proyectos/2009-simpa-lumina-puerto-olivos/3.jpg", "img/proyectos/2009-simpa-lumina-puerto-olivos/4.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Lumina Thames 333", ubicacion: "San Isidro, Buenos Aires", m2: 2400, rol: "Proyecto y dirección ejecutiva", anio: "2007", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2007-simpa-lumina-thames-333/1.jpg", imagenes: ["img/proyectos/2007-simpa-lumina-thames-333/1.jpg", "img/proyectos/2007-simpa-lumina-thames-333/2.jpg", "img/proyectos/2007-simpa-lumina-thames-333/3.jpg"] },
    { cliente: "Grupo Simpa", obra: "Nuevo centro de distribución", ubicacion: "Parque Industrial Garín, Buenos Aires", m2: 12600, rol: "Proyecto y dirección ejecutiva", anio: "2007", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2007-simpa-centro-distribucion-garin/1.jpg", imagenes: ["img/proyectos/2007-simpa-centro-distribucion-garin/1.jpg", "img/proyectos/2007-simpa-centro-distribucion-garin/2.jpg", "img/proyectos/2007-simpa-centro-distribucion-garin/3.jpg"] },
    { cliente: "Videolar", obra: "Warehouse y acopio de materiales plásticos — Unidad I Manaos", ubicacion: "Manaus, Brasil", m2: 64000, rol: "Proyecto", anio: "2006", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2006-videolar-warehouse-manaos/1.jpg", imagenes: ["img/proyectos/2006-videolar-warehouse-manaos/1.jpg", "img/proyectos/2006-videolar-warehouse-manaos/2.jpg", "img/proyectos/2006-videolar-warehouse-manaos/3.jpg"] },
    { cliente: "Torres Atlántico", obra: "Edificio de oficinas corporativas", ubicacion: "Luanda, Angola", m2: 142000, rol: "Project & Construction management", anio: "2005", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2005-torres-atlantico-luanda/1.jpg", imagenes: ["img/proyectos/2005-torres-atlantico-luanda/1.jpg", "img/proyectos/2005-torres-atlantico-luanda/2.jpg", "img/proyectos/2005-torres-atlantico-luanda/3.jpg", "img/proyectos/2005-torres-atlantico-luanda/4.jpg"] },
    { cliente: "Grupo Simpa", obra: "Nuevo centro de distribución", ubicacion: "Parque Industrial Munro, Buenos Aires", m2: 5600, rol: "Proyecto y dirección ejecutiva", anio: "2005", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2005-simpa-centro-distribucion-munro/1.jpg" },
    { cliente: "Videolar", obra: "Videolar Multimedios de Argentina S.A.", ubicacion: "Olivos, Buenos Aires", m2: 12200, rol: "Proyecto", anio: "2004", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/2004-videolar-multimedios-olivos/1.jpg", imagenes: ["img/proyectos/2004-videolar-multimedios-olivos/1.jpg", "img/proyectos/2004-videolar-multimedios-olivos/2.jpg", "img/proyectos/2004-videolar-multimedios-olivos/4.jpg"] },
    { cliente: "Clark Construction International USA", obra: "Diveo Data Center — Brasil HQ", ubicacion: "Alphaville, São Paulo, Brasil", m2: 12500, rol: "Dirección ejecutiva", anio: "2002", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2002-clark-diveo-data-center-brasil/1.jpg", imagenes: ["img/proyectos/2002-clark-diveo-data-center-brasil/1.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/2.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/3.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/4.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/5.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/6.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/7.jpg", "img/proyectos/2002-clark-diveo-data-center-brasil/8.jpg"] },
    { cliente: "Grupo Simpa", obra: "Complejo de oficinas Libertador Park", ubicacion: "Olivos, Buenos Aires", m2: 11200, rol: "Proyecto y dirección ejecutiva", anio: "2001", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2001-simpa-libertador-park/1.jpg", imagenes: ["img/proyectos/2001-simpa-libertador-park/1.jpg", "img/proyectos/2001-simpa-libertador-park/2.jpg", "img/proyectos/2001-simpa-libertador-park/3.jpg"] },
    { cliente: "Clark Construction International USA", obra: "Diveo Data Center", ubicacion: "San Telmo, CABA", m2: 3500, rol: "Dirección ejecutiva", anio: "2001", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2001-clark-diveo-data-center-san-telmo/1.jpg" },
    { cliente: "Clark Construction International USA", obra: "Diveo Data Center", ubicacion: "Huixquilucan, Estado de México", m2: 4500, rol: "Dirección ejecutiva", anio: "2001", tipo: "residencial-oficinas", categoria: "Terminados", imagen: "img/proyectos/2001-clark-diveo-data-center-mexico/1.jpg", imagenes: ["img/proyectos/2001-clark-diveo-data-center-mexico/1.jpg", "img/proyectos/2001-clark-diveo-data-center-mexico/2.jpg", "img/proyectos/2001-clark-diveo-data-center-mexico/3.jpg"] },
    { cliente: "Videolar", obra: "Planta industrial", ubicacion: "Río Grande, Tierra del Fuego", m2: 7500, rol: "Proyecto y dirección ejecutiva", anio: "1999", tipo: "logistico-industrial", categoria: "Terminados", imagen: "img/proyectos/1999-videolar-planta-industrial-tdf/1.jpg" },
  ],
  // ===== FIN: proyectos =====
};
