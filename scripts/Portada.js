const tema_audio = new Audio("../audios/tema_principal.mp3")
if (localStorage.getItem("sonido") == "on") {
    tema_audio.play()
}

if (localStorage.getItem("sonido") == "on") {
    tema_audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}