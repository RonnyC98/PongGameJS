//Creamos, si no existen, datos de ajustes por defecto
function crearDatosAjustesLS() {
    if (localStorage.getItem('tema') === null) {
        localStorage.setItem('tema', 'defecto')
    }
    if (localStorage.getItem('dificultad') === null) {
        localStorage.setItem('dificultad', 'normal')
    }
    if (localStorage.getItem('sonido') === null) {
        localStorage.setItem('sonido', 'off')
    }
    if (localStorage.getItem('puntosPartida') === null) {
        localStorage.setItem('puntosPartida', '5')
    }
}