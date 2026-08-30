/*
 * ============================================================================
 *  ACTUALIZAR FOTOS — conecta automáticamente las fotos de cada carpeta en
 *  img/proyectos/<año>-<obra>/ con esa obra en js/datos-proyectos.js.
 *
 *  Cómo se usa: cada obra tiene su propia carpeta en img/proyectos/. Metés
 *  o sacás las fotos que quieras DENTRO de esa carpeta (cualquier nombre de
 *  archivo sirve, no hace falta seguir una convención) y después corrés
 *  este script haciendo doble clic en "Actualizar fotos.bat" (un nivel
 *  arriba, en la carpeta principal del sitio).
 *
 *  Qué hace: por cada obra, mira qué archivos de imagen hay ADENTRO de su
 *  carpeta ahora mismo, los ordena alfabéticamente, y actualiza los campos
 *  "imagen" (la primera foto, se usa de portada) e "imagenes" (todas, se
 *  usan en la galería de la ficha ampliada) en datos-proyectos.js. La
 *  carpeta de cada obra NO cambia de nombre — solo se actualiza qué fotos
 *  tiene adentro. Se puede correr las veces que quieras.
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");

const carpetaSitio = path.join(__dirname, "..");
const rutaDatos = path.join(carpetaSitio, "js", "datos-proyectos.js");
const carpetaProyectos = path.join(carpetaSitio, "img", "proyectos");
const EXTENSIONES = ["jpg", "jpeg", "png", "webp"];

function main() {
  const contenidoOriginal = fs.readFileSync(rutaDatos, "utf8");
  const lineas = contenidoOriginal.split("\n");

  // Reconoce la línea de un proyecto por su campo "imagen", que apunta
  // adentro de una carpeta: imagen: "img/proyectos/<carpeta>/<archivo>"
  const patronLinea = /^(.*?)imagen:\s*"img\/proyectos\/([^"/]+)\/[^"]*"(?:,\s*imagenes:\s*\[[^\]]*\])?(\s*},?\s*)$/i;

  let obrasConFoto = 0;
  let lineasActualizadas = 0;
  const carpetasSinFotos = [];

  const lineasNuevas = lineas.map((linea) => {
    const match = linea.match(patronLinea);
    if (!match) return linea;

    const [, prefijo, carpeta, sufijo] = match;
    const archivos = listarFotosDeCarpeta(carpeta);

    if (archivos.length === 0) {
      carpetasSinFotos.push(carpeta);
      return linea; // no tocamos el campo: el sitio va a mostrar el placeholder
    }

    obrasConFoto++;
    const rutaPrincipal = `img/proyectos/${carpeta}/${archivos[0]}`;
    let nuevaLinea = `${prefijo}imagen: "${rutaPrincipal}"`;

    if (archivos.length > 1) {
      const listaRutas = archivos.map((a) => `"img/proyectos/${carpeta}/${a}"`).join(", ");
      nuevaLinea += `, imagenes: [${listaRutas}]`;
    }

    nuevaLinea += sufijo;

    if (nuevaLinea !== linea) lineasActualizadas++;
    return nuevaLinea;
  });

  fs.writeFileSync(rutaDatos, lineasNuevas.join("\n"), "utf8");

  console.log("");
  console.log("Listo.");
  console.log(`Obras con al menos una foto: ${obrasConFoto}`);
  console.log(`Líneas actualizadas en datos-proyectos.js: ${lineasActualizadas}`);
  if (carpetasSinFotos.length) {
    console.log(`Carpetas todavía sin fotos (${carpetasSinFotos.length}):`);
    carpetasSinFotos.forEach((c) => console.log("  - img/proyectos/" + c));
  }
  console.log("");
}

/**
 * Lista los archivos de imagen dentro de la carpeta de una obra,
 * ordenados alfabéticamente (así "1.jpg" va antes que "2.jpg", etc.).
 */
function listarFotosDeCarpeta(nombreCarpeta) {
  const rutaCarpeta = path.join(carpetaProyectos, nombreCarpeta);
  if (!fs.existsSync(rutaCarpeta)) return [];
  return fs
    .readdirSync(rutaCarpeta)
    .filter((nombre) => EXTENSIONES.some((ext) => nombre.toLowerCase().endsWith("." + ext)))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
}

main();
