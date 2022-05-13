//---------------------------------------
//GESTIONANDO CONTROLES DEL TECLADO------
//---------------------------------------

/*Declarando un objecto de esta forma podemos usarlo para asociar un nombre 
  con un valor y así hacer un seguimiento de las teclas que se están pulsando 
  y soltando. Iremos añadiendo y quitando la clave de la tecla pulsada*/
var teclasPulsadasAct = {};

//Ángulo de inclinación de la paleta al moverse
var ANGULO_INCLINACION = 5;

//Listener de pulsar tecla
addEventListener("keydown", function (e) {

  //Si se pulsa w/W, JUGADOR 1
  if (e.key == "W" || e.key == "w") {
    //Se ejecuta solo la primera vez
    if (!teclasPulsadasAct[87]) {
      p1.angle = ANGULO_INCLINACION;
      p1.rotatePoints(p1.angle);
    }
  }
  //Si se pulsa s/S, JUGADOR 1
  if (e.key == "S" || e.key == "s") {
    if (!teclasPulsadasAct[83]) {
      p1.angle = -ANGULO_INCLINACION;
      p1.rotatePoints(p1.angle);
    }
  }
  //Si se pulsa "FLECHA ARRIBA", JUGADOR 2
  if (e.key == "ArrowUp") {
    if (!teclasPulsadasAct[38]) {
      p2.angle = ANGULO_INCLINACION;
      p2.rotatePoints(p2.angle);
    }
  }
  //Si se pulsa "FLECHA ABAJO", JUGADOR 2
  if (e.key == "ArrowDown") {
    if (!teclasPulsadasAct[40]) {
      p2.angle = -ANGULO_INCLINACION;
      p2.rotatePoints(p2.angle);
    }
  }

  /*Tras las tareas, según la tecla pulsada, la añadimos al objeto que 
    gestiona las teclas pulsadas, ponemos como nombre la clave y lo 
    ponemos a true... SALE QUE ESTÁ EN DESHUSO, PERO NO HE ENCONTADO
    OTRO MÉTODO QUE DEVUELVA LA TECLA EN FORMATO CÓDIGO*/
  teclasPulsadasAct[e.keyCode] = true;

}, false);

//Listener de soltar tecla
addEventListener("keyup", function (e) {

  //Si se suelta w/W, JUGADOR 1
  if (e.key == "W" || e.key == "w") {
    p1.angle = 0;
    p1.realignPoints();
  }
  //Si se suelta s/S, JUGADOR 1
  if (e.key == "S" || e.key == "s") {
    p1.angle = 0;
    p1.realignPoints();
  }
  //Si se suelta "FLECHA ARRIBA", JUGADOR 2
  if (e.key == "ArrowUp") {
    p2.angle = 0;
    p2.realignPoints();
  }
  //Si se suelta "FLECHA ABAJO", JUGADOR 2
  if (e.key == "ArrowDown") {
    p2.angle = 0;
    p2.realignPoints();
  }

  /*Tras ser soltada la tecla y haber hecho las tareas, la borramos de las teclas
    actualmente pulsadas por su nombre (código)*/
  delete teclasPulsadasAct[e.keyCode];

}, false);
