//-----------------------------------------------------
//Bucle de la música de fondo de la página de Portada--
//-----------------------------------------------------

const tema_audio = new Audio("../audios/tema_principal.mp3")
if (localStorage.getItem("sonido") == "on") {
    tema_audio.play()
}
/*Si acaba, vuelve a empezar. Lo he tenido que poner en un if aparte, 
  por que me daba error, en cambio en la página ajustes no me dió este error, cositas*/
if (localStorage.getItem("sonido") == "on") {
    tema_audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}