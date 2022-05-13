//--------------
//-FUNCIÓN MAIN-
//--------------

//Bucle principal de nuestro juego
function main() {
  var now = Date.now();
  var delta = now - then;

  //Actualizamos y renderizamos
  actualizar(delta / 1000);
  renderizar();

  then = now;

  //Llamamos de nuevo a main()
  requestAnimationFrame(main);
}

//Arrancamos el juego
requestAnimationFrame(main)
var then = Date.now();
reset();
main();
