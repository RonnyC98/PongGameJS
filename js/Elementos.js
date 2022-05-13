//---------------------------
//CREAMOS EL CANVAS CON JS---
//---------------------------

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1300;
canvas.height = 900;
document.body.appendChild(canvas);

//-----------------------------------------------------------------
//PONEMOS BG IMAGE PARA CANVAS Y PELOTA (ACORDE AL TEMA ELEGIDO)---
//-----------------------------------------------------------------

/*Preparamos para asiganarle una imagen de fondo al canvas, por si 
  acaso ponemos que repita por si se quiere usar un patrón de textura*/
var canvasBgImagen = new Image(), bgPatron;
canvasBgImagen.onload = function () {
  this.loaded = true;
  bgPatron = ctx.createPattern(canvasBgImagen, 'repeat');
};

//Un fondo para la pelota, recomendable .png de 48px
var pelotaBgImagen = new Image();
pelotaBgImagen.loaded = false; // custom flag
pelotaBgImagen.onload = function () {
  this.loaded = true;
};

/*Cogemos el tema guardado en LS y según el elegido, ponemos las imágenes
  para el fondo y la pelota*/
var temaCampo = localStorage.getItem("tema")
switch (temaCampo) {
  case "futbol":
    canvasBgImagen.src = "assets/campofutbol.png";
    pelotaBgImagen.src = "assets/futbol.png";
    break;
  case "baloncesto":
    canvasBgImagen.src = "assets/campobaloncesto.png";
    pelotaBgImagen.src = "assets/baloncesto.png";
    break;
  case "tenis":
    canvasBgImagen.src = "assets/campotenis.png";
    pelotaBgImagen.src = "assets/tenis.png";
    break;
  default:
    canvasBgImagen.src = "assets/sand.png";
    pelotaBgImagen.src = "assets/ball.png";
    break;
}

//----------------------------------------------------------
//CREAMOS LOS OBJETOS PARA EL JUEGO: 2 PALETAS Y 1 PELOTA---
//----------------------------------------------------------

/*Cogemos la dificultad guardada en LS y según la elegida, guardamos en 
  variables la VELOCIDAD DE LA PELOTA, TAMAÑO Y RUTAS DE IMÁGENES PARA LAS PALETAS
  (TIENEN UN TAMAÑO QUE CAMBIA SEGÚN LA DIFICULTAD)*/
switch (localStorage.getItem("dificultad")) {
  case "facil":
    var velocidad_ajustes = 500
    var rutaImgPaletaAzul = "assets/paddleBlue_facil.png"
    var rutaImgPaletaRoja = "assets/paddleRed_facil.png"
    var altura_paletas = 200
    break;
  case "normal":
    var velocidad_ajustes = 750
    var rutaImgPaletaAzul = "assets/paddleBlue_normal.png"
    var rutaImgPaletaRoja = "assets/paddleRed_normal.png"
    var altura_paletas = 150
    break;
  case "dificil":
    var velocidad_ajustes = 1000
    var rutaImgPaletaAzul = "assets/paddleBlue_dificil.png"
    var rutaImgPaletaRoja = "assets/paddleRed_dificil.png"
    var altura_paletas = 96
    break;
}

//Creamos los objetos: 2 Paletas y 1 Pelota
var p1 = new Paleta(altura_paletas)
var p2 = new Paleta(altura_paletas)
var pelota = new Pelota(velocidad_ajustes)

//Creamos variables para la posición de las paletas 1 y 2
var xPosicionP1 = 20
var yPosicionP1 = canvas.height / 2 - p1.height / 2
var xPosicionP2 = canvas.width - p2.width - 20
var yPosicionP2 = canvas.height / 2 - p2.height / 2

//CON AYUDA DE LA LIBRERÍA DE VECTORES
/*Restablece los puntos a su posición inicial para Paletas 1 y 2
  Los puntos se establecen en este orden: topLeft, topRight, bottomRight, bottomLeft*/
p1.resetPoints = function () {
  this.points = [
    new Vector2(xPosicionP1, yPosicionP1),
    new Vector2(xPosicionP1 + p1.width, yPosicionP1),
    new Vector2(xPosicionP1 + p1.width, yPosicionP1 + p1.height),
    new Vector2(xPosicionP1, yPosicionP1 + p1.height)
  ];
};
p2.resetPoints = function () {
  this.points = [
    new Vector2(xPosicionP2, yPosicionP2),
    new Vector2(xPosicionP2 + p2.width, yPosicionP2),
    new Vector2(xPosicionP2 + p2.width, yPosicionP2 + p2.height),
    new Vector2(xPosicionP2, yPosicionP2 + p2.height)
  ];
};

//Ponemos la img correspondiente a la paleta, P1: azul
p1.bgImage.loaded = false;
p1.bgImage.onload = function () {
  this.loaded = true;
}
p1.bgImage.src = rutaImgPaletaAzul

//Ponemos la img correspondiente a la paleta, P1: rojo
p2.bgImage.loaded = false;
p2.bgImage.onload = function () {
  this.loaded = true;
}
p2.bgImage.src = rutaImgPaletaRoja

//----------------------------------------------
//FUNCIÓN PARA RESETEAR LOS OBJETOS DEL JUEGO---
//----------------------------------------------

function reset() {

  //Cambiamos variable a falso, ahora hay que esperar que se pulse espacio para comenzar
  juego_comenzado = false;

  /*Variables para posición y velocidad de las paletas*/
  //Centramos verticalmente
  var xPosicion = (canvas.width - pelota.tamano) / 2
  var yPosicion = (canvas.height - pelota.tamano) / 2
  //Ponemos aleatoriamente si empieza yendo a izquiera o derecha (negativo)
  var xVelocidad = Math.random() > 0.5 ? pelota.speed : -pelota.speed
  //Ponemos aleatoriamente si empieza yendo a arriba o abajo (negativo)
  var yVelocidad = Math.random() > 0.5 ? pelota.speed : -pelota.speed

  //USAMOS LA LIBRERÍA, Ponemos la PELOTA con las posiciones de partida nueva, centrado
  pelota.pos = new Vector2(xPosicion, yPosicion);
  pelota.velocity = new Vector2(xVelocidad, yVelocidad);

  //USAMOS LA LIBRERÍA, Ponemos la PALETAS con las posiciones de partida nueva, centrado
  p1.pos.set(xPosicionP1, yPosicionP1);
  p2.pos.set(xPosicionP2, yPosicionP2);

  //USAMOS LAS FUNCIONES DE LA LIBRERIA QUE PUSIMOS EN LA CLASE
  /*Establecemos los puntos de paletas para GESTIONAR EL CONTACTO PELOTA-PALETA
    Los puntos se establecen en este orden: topLeft, topRight, bottomRight, bottomLeft*/
  p1.resetPoints();
  p1.updatePivot();
  p2.resetPoints();
  p2.updatePivot();
  
  //Reseteamos la dirección de paletas 1 y 2
  p1.direction.set(0, 1);
  p2.direction.set(-0, 1);
  
}
