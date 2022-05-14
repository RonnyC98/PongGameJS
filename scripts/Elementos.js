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
    canvasBgImagen.src = "assets/campofutbol.jpg";
    pelotaBgImagen.src = "assets/futbol.png";
    break;
  case "baloncesto":
    canvasBgImagen.src = "assets/campobaloncesto.jpg";
    pelotaBgImagen.src = "assets/baloncesto.png";
    break;
  case "tenis":
    canvasBgImagen.src = "assets/campotenis.jpg";
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

//-------------------------------------
//CONTADOR PARA USARLO EN LA PROMESA---
//-------------------------------------

//Tiempo inicial
tiempoSeg = 5;
function cuenta_atras() {
  tiempoSeg--;
  //Lo imprimimos
  document.getElementById("seconds").innerHTML = String(tiempoSeg);
  if (tiempoSeg > 0) {
    setTimeout(cuenta_atras, 1000);
  }
  //Si acaba (llega a 0)
  if (tiempoSeg == 0) {
    //Lo llevamos a la portada
    location.href = "Ronny_Collaguazo_Pilatuña_Práctica4.html"
  }
};

//----------
//PROMESA---
//----------

/*La idea de la promesa es que al acabar una partida entera, se espere 3 segundos
y compruebe algún click en algun sitio del documento. Si no detecta nada, se entiende
que abandonaron el teclado (se fueron por algún motivo), el juego acabará y volverá a la
pantalla de inicio automáticamente. Si pulsa en algún sitio se entiende que siguen, pero
están pensando lo que harán luego
 -Si se pulsa, se da como resuelto, si no se dará como error, por lo que mostraremos un contador 
  que al finalizar nos llevará a la portada, saliendo del juego*/
function myPromise() {
  return new Promise(function (myResolve, myReject) {

    var sePulso = false
    //Detectamos algún click en el documento
    document.onclick = function () {
      sePulso = true
      //Paramos la espera, no hace falta esperar más, está atento el jugador
      clearTimeout(myTim);
    };

    //Espero los 3 segundos
    var myTim = setTimeout(function () {
      sePulso = false
    }, 3000)

    //Trás 3 segundos devolvemos si fue correcto (se pulsó) o error (no se pulsó)
    setTimeout(function () {
      if (sePulso) {
        myResolve("Se pulsó");
      } else {
        myReject("No se pulsó");
      }
    }, 3000)

  })
}

//------------------------------------------------------------------------
//FUNCIÓN QUE GESTIONA LA VICTORIA (mostrar cuadros, promesa, contador)---
//------------------------------------------------------------------------
function aplicar_victoria(jugador, color) {

  //Bloqueamos la tecla espacio, para que acabe la partida por si acaso
  addEventListener("keydown", function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      finalizada_partida = true
    }
  })

  //Ocultamos el canvas del juego
  document.getElementsByTagName('canvas')[0].style.animation = "desvanece 1s forwards";
  //Ponemos el fondo del ganador, jugador 1 azul, jugador 2 rojo
  switch (color) {
    case "azul":
      document.body.style.animation = "fondo_azul_animacion 1s forwards"
      break;
    case "rojo":
      document.body.style.animation = "fondo_rojo_animacion 1s forwards"
      break;
  }
  //Mostramos el cuadro de victoria
  document.getElementById("container").style.animation = "aparece 1s forwards";
  document.getElementById("nombre_ganador").innerHTML = jugador

  /*USANDO LA PROMESA*/
  //TRATAREMOS SOLO EL ERROR (NO SE INTERRUMPIÓ LA APARICIÓN DEL CONTADOR PULSANDO EN ALGÚN SITIO)
  //POR LO QUE, MOSTRAREMOS EL CONTADOR
  myPromise().catch(function () {
    //Aumentamos, para que quepa el contador
    document.getElementById("container").style.height = "53em"
    //Hacemos que aparezca el contador, esta ocultado por defecto
    document.getElementById("contador").style.animation = "aparece2 1s forwards";
    //Hacemos funcionar el contador
    var timeout_contador = setTimeout(cuenta_atras, 1000);
    /*IMPORTANTE: ESTAREMOS DE NUEVO PENDIENTE A OTRO CLICK PARA PARAR EL CONTADOR CUANDO FUNCIONE
      SI SE HACE CLICK, PARAMOS EL CONTADOR, Y LO OCULTAMOS*/
    document.onclick = function () {
      clearTimeout(timeout_contador);
      //Paramos todos los Timeout
      var id = window.setTimeout(function () { }, 0);
      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      //Reducimos de nuevo y ocultamos el contador
      document.getElementById("container").style.height = "35em"
      document.getElementById("contador").style.animation = "desvanece 1s forwards"
    };
  })

}

//---------------------------------------------------
//BUCLE DE MÚSICA DE FONDO DEL LA PÁGINA DEL JUEGO---
//---------------------------------------------------
const tema_audio = new Audio("../audios/tema_principal.mp3")
if (localStorage.getItem("sonido") == "on") {
    tema_audio.play()
    tema_audio.addEventListener('ended', function () {
        this.currentTime = 0
        this.play()
    }, false)
}

//Otros sonido para usar luego, choce paleta, pared, victoria...
const pong_audio = new Audio("../audios/pong.mp3")
const pic_audio = new Audio("../audios/pic.mp3")
const poc_audio = new Audio("../audios/poc.mp3")
const victoria_audio = new Audio("../audios/victoria.mp3")

//Función para usar sonido
function gestSonido(sonido) {
  if (localStorage.getItem("sonido") == "on") {
    switch (sonido) {
      case "pic":
        pic_audio.play()
        break;
      case "poc":
        poc_audio.play()
        break;
      case "pong":
        pong_audio.play()
        break;
      case "victoria":
        victoria_audio.play()
        break;
    }
  }
}
