//--------------
//CLASE PELOTA--
//--------------

class Pelota {
  //En el constructor le pasamos la velocidad, según la dificultad seleccionada en ajustes
  constructor(vel_dificultad) {
    this.tamano = 48,
      this.speed = vel_dificultad,

      /*PARA DARLE UN REFLEJO AL GOLPEAR MÁS ADECUADO, USAREMOS UNA BIBLIOTECA EXTERNA DE VECTORES,
        LA FÓRMULA ES:
        * R = 2*(V dot N)*N - V
        * V: vector de velocidad
        * N: un vector normalizado de una superficie plana (paleta o pared)
        * R: el vector de velocidad reflejado
        */

      /*Normalizar: coger un vector de cualquier longitud y manteniendo la misma
        dirección, cambiar su longitud a 1*/

      //Le pasamos un Vector normalizado unitario (dirección de una paleta)
      this.deflect = function (N) {
        var dot = this.velocity.dot(N);
        var v1 = N.multiplyScalar(2 * dot);
        this.velocity = v1.subSelf(this.velocity);
      };

    /*El  método estático Object.defineProperty() define una nueva propiedad 
      sobre un objeto o modifica una ya existente, y devuelve el objeto modificado.
      NOS PERMITE AÑADIR Y MODIFICAR DE FORMA PRECISA LAS PROPIEDADES*/

    //Definiendo propiedad x
    Object.defineProperty(this, 'x', {
      get: function () {
        return this.pos.x;
      },
      set: function (value) {
        this.pos.x = value;
      }
    });

    //Definiendo propiedad y
    Object.defineProperty(this, 'y', {
      get: function () {
        return this.pos.y;
      },
      set: function (value) {
        this.pos.y = value;
      }
    });

    return this;
  }
}
