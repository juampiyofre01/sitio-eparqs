# Sitio web de EPARQS (Escarrá Pradier & Asociados)

Sitio estático (HTML + CSS + JavaScript vanilla) para el estudio de arquitectura EPARQS. No usa frameworks, no tiene "build step" y no depende de ningún backend: se puede previsualizar abriendo un archivo y se publica arrastrando la carpeta a cualquier hosting estático.

Esta guía asume que es tu primera web — está pensada para que puedas mantenerla vos mismo sin saber programar en profundidad.

---

## 1. Estructura de carpetas

```
sitio-web/
├── index.html                    → el "molde": estructura y estilos. Rara vez hay que tocarlo
├── css/
│   └── estilos.css               → todos los estilos. Los colores y la tipografía
│                                    se definen como variables arriba de todo
├── js/
│   ├── datos-proyectos.js        → TODO el contenido editable: textos de cada
│   │                                sección, datos del estudio, socios y los
│   │                                51 proyectos. Este es el archivo que más
│   │                                vas a abrir.
│   ├── portfolio.js              → arma las tarjetas de obras, filtros y ficha ampliada
│   └── main.js                    → arma el resto del contenido (hero, textos de
│                                     sección, equipo, contacto) y el comportamiento
│                                     del sitio (menú mobile, header, formulario)
├── img/
│   ├── hero/                     → foto de portada de la home
│   ├── proyectos/                → una carpeta por obra ("<año>-<obra>/"),
│   │                                cada una con sus fotos + listado-de-fotos.txt
│   ├── equipo/                    → fotos de los 3 socios
│   ├── logo-hero.png               → logo sobre la foto de portada (LEEME-logo.txt al lado)
│   ├── logo-header.png             → logo con el header ya blanco (al scrollear)
│   └── favicon.svg                → ícono de la pestaña del navegador
├── herramientas/
│   ├── actualizar-fotos.js        → script que conecta las fotos de cada carpeta
│   │                                 de img/proyectos con su obra (lo corre
│   │                                 "Actualizar fotos.bat")
│   └── editor.html                → editor visual de los proyectos (categoría,
│                                      tipo, texto) — arma el código para pegar
│                                      en datos-proyectos.js
├── Actualizar fotos.bat           → doble clic para correr actualizar-fotos.js
└── README.md                      → este archivo
```

No hay carpeta de "distribución" ni proceso de compilación: lo que ves en estas carpetas es exactamente lo que se sube al hosting (el único archivo que NO tenés que subir al hosting es "Actualizar fotos.bat" y la carpeta "herramientas/" — son solo para uso local, mientras editás el sitio).

---

## 2. Cómo previsualizar el sitio localmente

**Opción más simple:** hacé doble clic en `index.html`. Se abre en tu navegador y funciona completo (navegación, filtros, formulario), sin necesidad de instalar nada ni de tener conexión a internet (salvo para ver la tipografía de Google Fonts y el mapa).

Esto funciona porque los datos de los proyectos están embebidos en `js/datos-proyectos.js` en vez de cargarse con `fetch()` desde un `.json` — si hubiéramos usado `fetch()`, abrir el archivo por doble clic fallaría por una restricción de seguridad del navegador (CORS) al leer archivos locales.

**Opción alternativa (no obligatoria):** si en algún momento agregás algo que sí necesite un servidor, podés levantar uno rápido desde esta carpeta con Python (`python -m http.server 8000`) o con la extensión "Live Server" de VS Code, y entrar a `http://localhost:8000`.

---

## 3. Cómo agregar las fotos reales (reemplazar los placeholders)

Mientras no haya una foto en la ruta esperada, el sitio muestra automáticamente un panel gris prolijo con el nombre de la obra (o las iniciales, en el caso del equipo). No hace falta borrar ni tocar código para que aparezca el placeholder — es automático.

### Fotos de las obras (el caso con más volumen: 51 proyectos)

Cada obra tiene su **propia carpeta** en `img/proyectos/`, nombrada `<año>-<nombre de la obra>` (ej. `img/proyectos/2025-ocasa-centro-distribucion-pilar/`). La lista completa de qué carpeta le corresponde a cada obra está en [`img/proyectos/listado-de-fotos.txt`](img/proyectos/listado-de-fotos.txt).

1. Entrá a la carpeta de la obra que quieras editar.
2. **Agregar una foto:** copiala ahí adentro. Cualquier nombre de archivo sirve (`1.jpg`, `foto-tapa.jpg`, `IMG_2044.jpg`, da igual).
3. **Sacar una foto que no te gusta:** borrá ese archivo directamente de la carpeta.
4. La primera foto en orden alfabético es la que se usa como portada de la tarjeta. Si querés controlar el orden, nombrá los archivos `1.jpg`, `2.jpg`, `3.jpg`, etc.
5. Cuando termines, hacé doble clic en **`Actualizar fotos.bat`** (en la carpeta principal del sitio). El script revisa todas las carpetas y actualiza `js/datos-proyectos.js` solo — conecta la portada de cada obra y arma la galería si hay varias fotos. Podés correrlo las veces que quieras, cada vez que cambies fotos.

   *¿No te genera confianza correr el script vos mismo? Armá las carpetas con las fotos que quieras en cada una, y pasame la carpeta completa — yo hago la conexión por vos.*

Formatos que sirven: `.jpg`, `.jpeg`, `.png`, `.webp`. Proporción sugerida: horizontal, 4:3 (por ejemplo 1200x900 px). Peso sugerido: menos de 400 KB por foto, para que el sitio cargue rápido con 51 proyectos.

### Foto de portada (home)
- Carpeta: `img/hero/`
- Nombre exacto: `portada.jpg`
- Proporción sugerida: horizontal, 16:9 (por ejemplo 1920x1080 px)

### Fotos del equipo
- Carpeta: `img/equipo/`
- Nombres exactos: `mariano-migone.jpg`, `diego-escarra.jpg`, `marlene-pradier.jpg`
- Proporción sugerida: vertical, 3:4 (por ejemplo 900x1200 px)

### Logo del header
- Carpeta: `img/`, dos archivos: `logo-hero.png` (sobre la foto de portada) y `logo-header.png` (header con fondo blanco) — ver `img/LEEME-logo.txt` para el detalle
- Instrucciones para reemplazarlo si conseguís una versión mejor: [`img/LEEME-logo.txt`](img/LEEME-logo.txt)

**Tip general:** comprimí las fotos antes de guardarlas (herramientas como [Squoosh](https://squoosh.app) o el propio exportador de tu editor). Con 51 proyectos, el peso de las imágenes es lo que más va a influir en la velocidad del sitio.

---

## 4. Cómo editar textos (probablemente la sección que más vas a usar)

**Todo el texto del sitio vive en un solo archivo: `js/datos-proyectos.js`.** No hace falta tocar `index.html` para cambiar una palabra — de hecho, para la gran mayoría de los pedidos de cambio ("cambiá esta frase", "sacá este párrafo", "el teléfono es otro"), lo único que vas a abrir es ese archivo.

Abrilo con cualquier editor de texto (Bloc de notas alcanza, aunque un editor tipo [VS Code](https://code.visualstudio.com/) o [Notepad++](https://notepad-plus-plus.org/) resalta el código y hace todo más cómodo). Arriba de todo tiene una tabla que dice "¿QUÉ QUIERO CAMBIAR? → ¿DÓNDE LO EDITO?" a modo de índice. En resumen:

| Quiero cambiar... | Bloque en `datos-proyectos.js` |
|---|---|
| La frase de portada (hero) | `contenido.hero` |
| El texto de "El estudio" y los 4 datos destacados | `contenido.estudio` |
| Los 4 servicios (título y texto de cada uno) | `contenido.servicios` |
| La bajada de la sección "Obras" | `contenido.obras` |
| Los títulos de "Equipo" y "Contacto" | `contenido.equipo` / `contenido.contacto` |
| Dirección, teléfono, mail, nombre del estudio | `estudio` (se usa en el header, el mapa, "Contacto" y el pie de página — **cambiarlo ahí actualiza los 4 lugares a la vez**, no hace falta repetirlo) |
| Los 3 socios | `socios` |
| Los proyectos del portfolio | `proyectos` (ver sección 5) — o con el editor visual |

Para cambiar un texto: buscá la frase actual (Ctrl+F en tu editor) y reemplazala, manteniendo las comillas dobles `" "` alrededor. Por ejemplo, para cambiar la bajada del hero:

```js
hero: {
  titulo: "Escarrá Pradier & Asociados",
  bajada: "ACÁ VA EL TEXTO NUEVO, ENTRE COMILLAS",
},
```

**Ojo con las comillas:** si el texto nuevo necesita llevar una comilla (por ejemplo para una cita), usá la comilla simple `'` — una comilla doble `"` suelta corta el texto ahí mismo y rompe el archivo (el sitio deja de funcionar hasta corregirlo).

- **Colores y tipografía:** todo está centralizado arriba de `css/estilos.css`, en el bloque `:root { ... }`. Por ejemplo, para cambiar el color de acento:
  ```css
  --color-acento: #6b5d4f;
  ```
  Cambiá el valor hexadecimal y se actualiza en todo el sitio (badges LEED, hover de links, filtro activo, etc.).

---

## 5. Cómo editar o agregar proyectos del portfolio

Todo el portfolio se genera automáticamente desde **un solo arreglo**: `proyectos`, dentro de `js/datos-proyectos.js`. Los 51 proyectos están ahí, uno atrás de otro (ya no separados en tres listas distintas). No hay que tocar el HTML ni el CSS para agregar, editar o quitar una obra.

Hay dos formas de editarlo: con el editor visual (recomendado, sobre todo si vas a usarlo poco seguido), o a mano en el archivo de texto.

### Opción A: editor visual (`herramientas/editor.html`) — la más simple

Hacé doble clic en `herramientas/editor.html` para abrirlo en el navegador (andá con Chrome o Edge — es lo único que hace falta). Vas a ver una tabla con los 51 proyectos: la **categoría** y el **tipo** son menús desplegables, el resto son campos de texto editables directo en la tabla.

- **Cambiar cualquier dato de una obra** (categoría, texto, año, etc.): lo editás directo en su fila.
- **Agregar una obra nueva, con fotos, en un solo paso**: apretá **"+ Agregar proyecto"** (se agrega una fila vacía abajo de todo), completá sus datos, y en la columna **"Fotos"** de esa misma fila elegí las fotos que quieras para esa obra. No hace falta crear ninguna carpeta a mano — se crea sola al guardar.
- **Agregar más fotos a una obra que ya existe**: en la columna "Fotos" de su fila, elegí las fotos nuevas que querés sumar.
- **Sacar una obra**: botón "Eliminar" en su fila (no borra sus fotos, solo la saca de la lista).

Cuando termines, apretá **"Guardar cambios"**. La primera vez que lo hagas, el navegador te va a pedir elegir una carpeta — elegí **`sitio-web`** (la carpeta principal del sitio) y confirmá el permiso cuando te lo pida (es el navegador pidiendo permiso para escribir ahí, normal y seguro). Con eso, el editor:

1. Copia las fotos nuevas que hayas elegido a la carpeta de cada obra (creándola si es una obra nueva).
2. Actualiza `js/datos-proyectos.js` con todos los cambios — categorías, textos, y qué fotos tiene cada obra.

Todo en un solo clic, sin copiar y pegar nada. Después, para ver el resultado, abrí (o recargá) `index.html`. *Si el sitio ya está publicado en un hosting, acordate de volver a subir la carpeta `sitio-web` para que el cambio se vea ahí también.*

*¿Tu navegador no es Chrome ni Edge?* El editor se da cuenta solo y muestra la alternativa manual: un botón "Generar código" que arma el texto para copiar y pegar vos mismo en `datos-proyectos.js` (sección "Opción manual", más abajo del todo en el editor) — en ese caso, para una obra nueva sí tenés que crear su carpeta de fotos a mano, como se explica en la sección 3.

### Opción B: editar el texto directamente

Cada proyecto es un bloque en una sola línea, así:

```js
{ cliente: "OCASA", obra: "Centro de distribución", ubicacion: "Pilar, Buenos Aires", m2: 41000, rol: "Proyecto y dirección ejecutiva", anio: "2025", tipo: "logistico", categoria: "En ejecución", imagen: "img/proyectos/2025-ocasa-centro-distribucion-pilar/1.jpg" },
```

**Para cambiar el estado de una obra** (por ejemplo, cuando se termina): buscá esa obra y cambiá SOLO el valor de `categoria`, a uno de estos tres textos exactos:
```
"En ejecución"   |   "Últimos concluidos"   |   "Terminados"
```
Nada más hace falta tocar — no hay que mover el bloque de ningún lado, como pasaba antes.

Para **agregar una obra nueva**: copiá un bloque entero (con las llaves `{ }`), pegalo dentro del arreglo `proyectos`, y completá los datos. No te olvides de la coma `,` al final de cada bloque (menos el último de la lista). También te conviene crear su carpeta de fotos — ver sección 3.

Campos disponibles:

| Campo      | Qué es | Obligatorio |
|------------|--------|:---:|
| `cliente`  | Nombre del cliente | Sí |
| `obra`     | Nombre de la obra | Sí |
| `ubicacion`| Ciudad/localidad, provincia | Sí |
| `m2`       | Superficie en m² (número, sin puntos) | Sí (o `null` si no aplica) |
| `nota_m2`  | Aclaración cuando `m2` no alcanza (ej. "130 hectáreas") | No |
| `rol`      | Rol de EPARQS en la obra | Sí |
| `anio`     | Año o rango (texto, ej. `"2023-2025"`) | Sí |
| `tipo`     | `"industrial"`, `"logistico"`, `"oficinas"` o `"residencial-nautico"` — se usa en el filtro por tipo | Sí |
| `categoria`| `"En ejecución"`, `"Últimos concluidos"` o `"Terminados"` — en qué grupo del portfolio aparece | Sí |
| `leed`     | Texto de la certificación, ej. `"LEED Gold"` | No (omitir si no aplica) |
| `imagen`   | Ruta a la foto de portada (la arma sola `Actualizar fotos.bat`) | Sí |
| `imagenes` | Lista de rutas para la galería (la arma sola `Actualizar fotos.bat`) | No |

Para **quitar una obra**, borrá el bloque completo (de la `{` a la `}`, incluyendo la coma).

Si en algún momento el estudio suma un quinto servicio central, se agrega de la misma forma en `contenido.servicios.items` (ver sección 4) — no hace falta tocar `index.html`.

---

## 6. El formulario de contacto (Web3Forms)

El formulario de la sección "Contacto" envía las consultas directo a una bandeja de mail usando [Web3Forms](https://web3forms.com), un servicio gratuito (hasta 250 mensajes por mes) que **no pide crear ninguna cuenta** — es solo un mail y una clave. El código ya está armado — solo falta conectar la clave:

1. Entrá a [web3forms.com](https://web3forms.com), poné el mail donde querés recibir las consultas y creá la clave ("Access Key"). Te la mandan a ese mail — no hay usuario ni contraseña que crear.
2. Pegá esa clave en `contenido.contacto.formularioClave`, en `js/datos-proyectos.js` (o desde `herramientas/editor.html`, campo "Clave del formulario de contacto").

Listo — no hay ningún panel al que volver a entrar. Los mensajes llegan directo a esa casilla, como cualquier mail.

Mientras `formularioClave` esté vacío, el botón "Enviar consulta" le avisa al visitante que el formulario todavía no está conectado, en vez de fallar en silencio.

**Si en algún momento quieren que las consultas lleguen a más de un mail** (por ejemplo Diego y Mariano juntos), lo más simple es configurar una regla de reenvío automático en esa casilla — no hace falta tocar el sitio ni Web3Forms para eso.

---

## 7. Cómo publicar el sitio (hosting estático)

El sitio es 100% estático, así que sirve cualquier hosting que permita subir archivos. Algunas opciones simples y gratuitas:

### Netlify (recomendado por lo simple)
1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastrá la carpeta `sitio-web` completa a la página.
3. En segundos te da una URL pública (después podés conectarle un dominio propio, ej. `eparquitectos.com.ar`, desde el panel de Netlify).

### Vercel
1. Creá una cuenta en [vercel.com](https://vercel.com).
2. Subí la carpeta `sitio-web` (arrastrando o desde su CLI).
3. Igual que Netlify, después podés conectar un dominio propio.

### GitHub Pages
1. Subí el contenido de `sitio-web` a un repositorio de GitHub.
2. En la configuración del repositorio, activá "GitHub Pages" apuntando a la rama principal.
3. GitHub te da una URL tipo `usuario.github.io/nombre-repo`.

En cualquiera de los tres casos: **subí el contenido de la carpeta `sitio-web`**, no la carpeta "PAGINA WEB EPARQS" completa (esa carpeta de más arriba tiene el PDF y el PPTX de antecedentes, que son material de referencia y no tienen que quedar públicos).

### Dominio propio
Una vez que el sitio esté publicado en cualquiera de estos servicios, se puede conectar un dominio propio (ej. `eparquitectos.com.ar`) desde el panel del hosting elegido, apuntando los DNS del dominio según las instrucciones que te dé el proveedor.

---

## 8. Resumen rápido de tareas comunes

| Quiero... | Dónde lo hago |
|---|---|
| Cambiar cualquier texto (hero, estudio, servicios, títulos) | `js/datos-proyectos.js` → bloque `contenido` |
| Cambiar dirección, teléfono, mail o el nombre del estudio | `js/datos-proyectos.js` → bloque `estudio` (se actualiza en todo el sitio a la vez) |
| Cambiar un color o la tipografía | `css/estilos.css`, bloque `:root` al principio |
| Cambiar la categoría de una obra (en ejecución/terminada/etc.) | `herramientas/editor.html` → cambiar el desplegable → "Guardar cambios" |
| Agregar una obra nueva (con fotos, en un solo paso) | `herramientas/editor.html` → "+ Agregar proyecto", completar y elegir sus fotos → "Guardar cambios" |
| Editar/quitar una obra existente | `herramientas/editor.html` → editar la fila o "Eliminar" → "Guardar cambios" |
| Poner más fotos a una obra que ya existe | `herramientas/editor.html`, columna "Fotos" de su fila → "Guardar cambios" (o copiarlas a mano en su carpeta y correr `Actualizar fotos.bat`) |
| Poner la foto de portada, de un socio, o el logo | Copiar el archivo en la carpeta `img/...` correspondiente, con el nombre exacto (ver sección 3) |
| Conectar el formulario a un servicio real | Ver sección 6 de este README |
| Publicar el sitio | Arrastrar la carpeta `sitio-web` a Netlify Drop (ver sección 7) |
