//--------------------------------------------------
//FUNCIÓN PARA RENDERIZAR/DIBUJAR ELEMENTOS EN EL CANVAS--
//--------------------------------------------------

function renderizar() {

  //Dibujamos la imagen de fondo o patron
  ctx.fillStyle = bgPatron;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Dibujamos la pelota en su posición
  if (pelotaBgImagen.loaded) {
    ctx.drawImage(pelotaBgImagen, pelota.x, pelota.y);
  }

  //Dibujamos las paletas 1 y 2 (ver método en la clase Paleta.js)
  p1.render();
  p2.render();

  //Vamos a crear un efecto de color gradiente para el texto
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "blue");
  gradient.addColorStop("1.0", "red");

  //Ponemos la fuente, tamaño y alineación
  ctx.fillStyle = gradient; ctx.font = "80px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  //Dibujamos el marcador del jugador 1 que controla la paleta 1
  ctx.fillText(p1.score, 32, 32);

  //Dibujamos el marcador del jugador 2 que controla la paleta 2
  ctx.fillText(p2.score, canvas.width - 22 - 80, 32);

  //Ponemos otras opciones del texto para un anuncio cuando el juego no ha comenzado
  ctx.font = "60px Helvetica";
  ctx.width = "100%";
  
  //Ponemos el estilo de color gradiente a los textos
  ctx.fillStyle = gradient;

  //Si el juego aún no ha comenzado, muestro un texto indicando la tecla a pulsar para comenzar
  if (!juego_comenzado) {
    ctx.fillText("Presiona ESPACIO para empezar", 200, canvas.height / 2);
  }
}
