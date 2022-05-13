//------------------------------------------------
//FUNCIÓN PARA ACTUALIZAR LOS OBJETOS DEL JUEGO---
//------------------------------------------------


var finalizada_partida = false
/*Le pasamos un modificador que es el tiempo transcurrido entre un cuado 
  y otro, nos ayuda para calcular que tan rápido debe moverse la pelota*/
function actualizar(modificador) {

  //-------------------------------------------------
  //ACTUALIZANDO PALETAS SEGÚN LAS TECLAS PULSADAS---
  //-------------------------------------------------

  //El juego comienza al pulsar la tecla ESPACIO
  if (!finalizada_partida) {
    if (32 in teclasPulsadasAct) {
      juego_comenzado = true;
    }
  }
  //Devolvemos si el juego ha comenzado
  if (!juego_comenzado) {
    return false;
  }

  //Si se ha pulsado la tecla 'w' la Paleta 1 del J1 SUBE
  if (87 in teclasPulsadasAct) {
    if (p1.y > 0) {
      //Actualizamos la posición
      var movimientoEjeY = p1.speed * modificador;
      p1.y -= movimientoEjeY;
      //Actualizamos los puntos que comprueban el contacto con la pelota
      p1.updatePivot();
      p1.updatePoints(movimientoEjeY * -1);
      //Vuelve a y = 0, no puede salir de ese límite, LIMITE SUPERIOR
      if (p1.y <= 0) {
        p1.y = 0;
      }
    }
  }

  //Si se ha pulsado la tecla 's' la Paleta 1 del J1 BAJA
  if (83 in teclasPulsadasAct) { // P1 holding down (key: s)
    if (p1.y + p1.height < canvas.height) {
      //Actualizamos posición y puntoss
      var movimientoEjeY = p1.speed * modificador;
      p1.y += movimientoEjeY;
      p1.updatePivot();
      p1.updatePoints(movimientoEjeY);
      //Vuelve a la posicion Y máxima, no puede salir de ese límite, LIMITE INFERIOR
      if (p1.y + p1.height > canvas.height) {
        p1.y = canvas.height - p1.height;
      }
    }
  }

  /*REPETIMOS LO MISMO PARA LA PALETA 2*/
  //Si se ha pulsado la tecla 'FLECHA ARRIBA' la Paleta 2 del J2 SUBE
  if (38 in teclasPulsadasAct) {
    if (p2.y > 0) {
      //Actualizamos posición y puntos
      var movimientoEjeY = p2.speed * modificador;
      p2.y -= movimientoEjeY;
      p2.updatePivot();
      p2.updatePoints(movimientoEjeY * -1);
      //Vuelve a y = 0, no puede salir de ese límite, LIMITE SUPERIOR
      if (p2.y <= 0) {
        p2.y = 0;
      }
    }
  }

  //Si se ha pulsado la tecla 'FLECHA ABAJO' la Paleta 2 del J2 BAJA
  if (40 in teclasPulsadasAct) { // P2 holding down
    if (p2.y + p2.height < canvas.height) {
      //Actualizamos posición y puntos
      var movimientoEjeY = p2.speed * modificador;
      p2.y += movimientoEjeY;
      p2.updatePivot();
      p2.updatePoints(movimientoEjeY);
      //Vuelve a la posicion Y máxima, no puede salir de ese límite, LIMITE INFERIOR
      if (p2.y + p2.height > canvas.height) {
        p2.y = canvas.height - p2.height;
      }
    }
  }

  //-------------------------------------------
  //COMPROBANDO SI SE HA MARCADO ALGÚN PUNTO---
  //-------------------------------------------

  /*Si la pelota toca o es menor que el límite de la IZQUIERDA, MARCA EL JUGADOR 2*/
  if (pelota.x <= 0) {

    //Ver Función en Elementos.js
    gestSonido("pong")

    //Incrementamos su puntuación
    p2.score++;

    //SI LLEGÓ AL LOS PUNTOS NECESARIOS PARA GANAR. EL JUGADOR 2 GANA
    if (p2.score == parseInt(localStorage.getItem("puntosPartida"))) {
      //Gestionamos cuadros, promesa... VER FUNCIÓN EN actualizar.js
      aplicar_victoria("2", "rojo")
      tema_audio.pause()
      gestSonido("victoria")
    }
    //Reseteamos posiciones de elementos para sacar y comenzar una nueva partida
    /*VER FUNCIÓN EN ARCHIVO .js*/
    reset();
  }

  /*Si la pelota toca o es mayor que el límite de la DERECHA, MARCA EL JUGADOR 1 (IDEM)*/
  if (pelota.x >= canvas.width - pelota.tamano) {

    //Ver Función en Elementos.js
    gestSonido("pong")

    //Incrementamos su puntuación
    p1.score++;

    //SI LLEGÓ AL LOS PUNTOS NECESARIOS PARA GANAR. EL JUGADOR 1 GANA
    if (p1.score == parseInt(localStorage.getItem("puntosPartida"))) {
      //Gestionamos cuadros, promesa... VER FUNCIÓN EN actualizar.js
      aplicar_victoria("1", "azul")
      tema_audio.pause()
      gestSonido("victoria")
    }
    //Reseteamos posiciones de elementos para sacar y comenzar una nueva partida
    /*VER FUNCIÓN EN ARCHIVO .js*/
    reset();
  }

  //------------------------------------------------------------
  //COMPROBANDO SI LA PELOTA HA COLISIONADO CON ALGUNA PALETA---
  //------------------------------------------------------------

  /*Usaremos la detección de colisión AABB (cuadros delimitadores alineados con el eje) 
    para comprobar si pelota y paleta chocan*/

  //Si la pelota toca la paleta 1 (REPETIREMOS ESTO PARA LA PALETA 2)
  if (pelota.x <= (p1.x + p1.width)
    && p1.x <= (pelota.x + pelota.tamano)
    && pelota.y <= (p1.y + p1.height)
    && p1.y <= (pelota.y + pelota.tamano)) {

    //Ver Función en Elementos.js
    gestSonido("pic")

    /*VAMOS A HACER USO DE LA LIBRERÍA DE VECTORES Y LA FUNCIONES QUE HEMOS IDO
      CREANDO CON ELLA PARA CALCULAR UNA REFLEXIÓN DE LA PELOTA ALGO MÁS REALISTA*/

    /*Se necesita calcular correctamente la "pared" (en nuestro caso, paleta)
    para calcular la reflexión a dar*/
    //Obtengo los puntos a y b, puntos de la paleta 1
    var a = p1.points[1].clone()
    var b = p1.points[2].clone()
    //Obtengo el vector de dirección para la paleta 1
    p1.direction = b.subSelf(a).normalize();
    //Finalmente reflejamos la pelota, pasándoles el vector de dirección de la paleta
    pelota.deflect(p1.direction)

    //Incrementamos por si se ha salido de los límites
    pelota.x = p1.x + p1.width + 1;
  }

  //Si la pelota toca la paleta 2. (REPETIMOS LO MISMO, PERO CON PALETA 2. VER ARRIBA COMENTARIOS)
  if (pelota.x <= (p2.x + p2.width)
    && p2.x <= (pelota.x + pelota.tamano)
    && pelota.y <= (p2.y + p2.height)
    && p2.y <= (pelota.y + pelota.tamano)) {

    //Ver Función en Elementos.js
    gestSonido("pic")

    var a = p2.points[0].clone()
    var b = p2.points[3].clone()
    p2.direction = b.subSelf(a).normalize();
    pelota.deflect(p2.direction);

    pelota.x = p2.x - pelota.tamano - 1;
  }

  //---------------------------------------------------------------------------
  //COMPROBANDO SI LA PELOTA HA COLISIONADO CON LA PARTE SUPERIOR O INFERIOR---
  //---------------------------------------------------------------------------

  //Si la pelota toca o es menor que el límite SUPERIOR (REBOTE PARTE DE ARRIBA)
  if (pelota.y <= 0) {
    //Ver Función en Elementos.js
    gestSonido("poc")
    //Calculamos una relexión "normal" con una pared estática
    pelota.deflect(new Vector2(1, 0));
    //Por si se sale del límite
    pelota.y = 0.1;
  }

  //Si la pelota toca o es mayor que el límite INFERIOR (REBOTE PARTE DE ABAJO)
  if (pelota.y + pelota.tamano >= canvas.height) {
    //Ver Función en Elementos.js
    gestSonido("poc")
    //Calculamos una relexión "normal" con una pared estática
    pelota.deflect(new Vector2(1, 0));
    //Por si se sale del límite
    pelota.y = canvas.height - pelota.tamano - 1;
  }

  //-------------------------
  //MOVIMIENTO DE LA PELOTA--
  //-------------------------

  pelota.x += pelota.velocity.x * modificador;
  pelota.y += pelota.velocity.y * modificador;

}
