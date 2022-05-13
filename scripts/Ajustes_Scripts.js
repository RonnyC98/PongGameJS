//-------------------------
//FUNCIONES QUE USAREMOS---
//-------------------------

const ajustes_audio = new Audio("../audios/ajustes.mp3")
if (localStorage.getItem("sonido") == "on") {
    ajustes_audio.play()
    ajustes_audio.addEventListener('ended', function () {
        this.currentTime = 0
        this.play()
    }, false)
}

//Función que quita el estilo de seleccionado a un elemento que pasamos
function quitarSeleccion(element) {
    element.style.border = "1px solid white";
    element.style.boxShadow = ""
    element.style.backgroundColor = "#000000"
}

//Función que pone el estilo de seleccionado a un elemento que pasamos
function ponerSeleccion(element) {
    element.style.border = "1px solid white";
    element.style.boxShadow = "0 0 10px 0 white inset, 0 0 5px 4px white";
    element.style.backgroundColor = "#111111"
}

//Función a la que le pasamos el id de un input radio y el id de un label
function marcarRadioLabelAjuste(id_radio, id_label) {
    //Marcamos el radio como seleccionado
    document.getElementById(id_radio).checked = true;
    //Ponemos estilos de seleccionado al label
    var aux = document.getElementById(id_label)
    aux.style.border = "1px solid white";
    aux.style.boxShadow = "0 0 10px 0 white inset, 0 0 5px 4px white";
    aux.style.backgroundColor = "#111111"
}

/*Función para marcar los ajustes por grupos de modo que solo pueda haber
  una selección por grupo, le pasamos un array con los nombre de grupos*/
/*SE PUEDE VER ALGO REBUSCADO, PERO ES LO QUE SE ME OCURRIÓ EN ESE MOMENTO*/
function gestionarGruposAjustes(grupos) {
    //Recorremos los nombres de grupos
    for (let i = 0; i < grupos.length; i++) {
        /*Cogemos todos los elementos que tienen de nombre de clase el nombre
          de ese grupo y recorremos*/
        var boxes = document.querySelectorAll(grupos[i]);
        boxes.forEach(box => {
            //Creamos listeners (De click) para esos elementos del grupo
            box.addEventListener("click", function () {
                //Al detectar un click, cogemos los elementos del grupo clickado y los recorremos
                var boxes2 = document.querySelectorAll(grupos[i]);
                boxes2.forEach(box2 => {
                    //Le quitamos cualquier estilo de selección anterior
                    quitarSeleccion(box2)
                });
                /*Después de haber quitado todos, marcamos como seleccionado al que
                  se ha hecho click*/
                ponerSeleccion(box)
            })
        });
    }
}

//-----------------------------------------------------------------------
//MARCAMOS COMO SELECCIONADOS LOS AJUSTES ACTUALES AL CARGAR LA PÁGINA---
//-----------------------------------------------------------------------

//Recuperando y marcando Ajustes Tema
var pelotaAct = localStorage.getItem("tema")
switch (pelotaAct) {
    case "futbol":
        marcarRadioLabelAjuste("radio_tema_futbol", "t_futbol")
        break;
    case "baloncesto":
        marcarRadioLabelAjuste("radio_tema_baloncesto", "t_baloncesto")
        break;
    case "tenis":
        marcarRadioLabelAjuste("radio_tema_tenis", "t_tenis")
        break;
    default:
        marcarRadioLabelAjuste("radio_tema_defecto", "t_defecto")
        break;
}

//Recuperando y marcando Ajustes Puntos Partida
var puntosPAct = localStorage.getItem("puntosPartida")
var radioPuntosNombre = "radio_puntos_" + puntosPAct
var labelPuntosNombre = "pp_" + puntosPAct
marcarRadioLabelAjuste(radioPuntosNombre, labelPuntosNombre)

//Recuperando y marcando Ajustes DIFUCULTAD
var dificultadAct = localStorage.getItem("dificultad")
switch (dificultadAct) {
    case "facil":
        marcarRadioLabelAjuste("radio_dificultad_facil", "d_facil")
        break;
    case "normal":
        marcarRadioLabelAjuste("radio_dificultad_normal", "d_normal")
        break;
    case "dificil":
        marcarRadioLabelAjuste("radio_dificultad_dificil", "d_dificil")
        break;
}

//Recuperando y marcando Ajustes SONIDO
var sonidoAct = localStorage.getItem("sonido")
switch (sonidoAct) {
    case "on":
        marcarRadioLabelAjuste("radio_sonido_activado", "s_activado")
        break;
    case "off":
        marcarRadioLabelAjuste("radio_sonido_desactivado", "s_desactivado")
        break;
}

//-------------------------------------------------------------------------------------------------------
//GESTIONANDO EFECTO DE SELECCIÓN, ESTILOS, UNA SELECCIÓN POR GRUPO (Ver función grupo_ajustes())--------
//-------------------------------------------------------------------------------------------------------

const grupos_ajustes = [".grupo_tema", ".grupo_puntos", ".grupo_dificultad", ".grupo_sonido"]
gestionarGruposAjustes(grupos_ajustes)

//--------------------------------------------------------------------------------------
//GUARDANDO AJUSTES, AL DARLE AL BOTÓN DE GUARDAR, CAMBIAMOS LO DATOS DE LOCALSTORAGE---
//--------------------------------------------------------------------------------------

document.getElementById("guardar").onclick = function () {

    //Guardando Ajustes Tema
    var tema = document.querySelector('input[name="tema"]:checked').value
    switch (tema) {
        case "futbol":
            localStorage.setItem('tema', tema)
            break;
        case "baloncesto":
            localStorage.setItem('tema', tema)
            break;
        case "tenis":
            localStorage.setItem('tema', tema)
            break;
        default:
            localStorage.setItem('tema', tema)
            break;
    }
    localStorage.setItem('tema', tema)

    //Guardando Ajustes Puntos Partida
    var puntosPP = document.querySelector('input[name="puntos"]:checked').value
    localStorage.setItem("puntosPartida", puntosPP)

    //Guardando Ajustes Dificultad
    var dificultad = document.querySelector('input[name="dificultad"]:checked').value
    localStorage.setItem('dificultad', dificultad)

    //Guardando Ajustes Sonido
    var sonido = document.querySelector('input[name="sonido"]:checked').value
    localStorage.setItem('sonido', sonido)

    //Con todo guardado, redirigimos a la portada
    location.href = "Ronny_Collaguazo_Pilatuña_Práctica4.html";
};

//--------------------------------
//AL DARLE AL BOTÓN DE CANCELAR---
//--------------------------------

//Redirigimos a la portada, sin guardar
document.getElementById("cancelar").onclick = function () {
    location.href = "Ronny_Collaguazo_Pilatuña_Práctica4.html";
};

//--------------------------------
//AL PULSAR LA TECLA ESC---
//--------------------------------

//Redirigimos a la portada, sin guardar
document.onkeydown = function keyPress (e) {
    if(e.key === "Escape") {
        location.href = "Ronny_Collaguazo_Pilatuña_Práctica4.html";
    }
}
